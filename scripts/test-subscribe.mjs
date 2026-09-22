#!/usr/bin/env node
/**
 * Verification harness for `POST /api/subscribe`.
 *
 * Default (offline) mode asserts the handler's guard rails with no network
 * access and no secret:
 *   node scripts/test-subscribe.mjs
 *
 * Live mode performs a real subscribe through the real handler and the real Kit
 * API (requires KIT_API_KEY in the environment):
 *   KIT_API_KEY=<key> node scripts/test-subscribe.mjs --live --email=someone@example.com
 *
 * Run it twice against the same address to demonstrate duplicate handling:
 *   ... --live --email=you@example.com --expect=new
 *   ... --live --email=you@example.com --expect=duplicate
 *
 * Notes learned from the live API:
 *   - POST /v4/subscribers answers 201 for a new subscriber and 200 for an
 *     address that already exists. That status is the authoritative duplicate
 *     signal.
 *   - GET /v4/subscribers?email_address=... is eventually consistent: a
 *     just-created subscriber may not be returned for a while, so this harness
 *     polls the read-back instead of asserting immediately.
 *
 * The API key is never printed.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createJiti } from 'jiti';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const handlerPath = path.resolve(__dirname, '../api/subscribe.ts');
const FORM_ID = '9947751';

const args = process.argv.slice(2);
const live = args.includes('--live');
const emailArg = args.find((a) => a.startsWith('--email='));
const email = emailArg ? emailArg.slice('--email='.length) : null;
const expectArg = args.find((a) => a.startsWith('--expect='));
const expect = expectArg ? expectArg.slice('--expect='.length) : null;

let failures = 0;

function check(name, passed, detail = '') {
  const label = passed ? 'PASS' : 'FAIL';
  if (!passed) failures += 1;
  console.log(`  [${label}] ${name}${detail ? ` — ${detail}` : ''}`);
}

function makeRequest({ method = 'POST', body, headers = {} } = {}) {
  return {
    method,
    body,
    headers: { 'x-forwarded-for': '203.0.113.7', 'content-type': 'application/json', ...headers },
  };
}

async function invoke(handler, request) {
  const res = {
    statusCode: 0,
    headers: {},
    payload: '',
    setHeader(key, value) {
      this.headers[String(key).toLowerCase()] = value;
      return this;
    },
    end(chunk) {
      this.payload = chunk ?? '';
      return this;
    },
  };
  await handler(request, res);
  let json = null;
  try {
    json = JSON.parse(res.payload);
  } catch {
    json = null;
  }
  return { res, json };
}

function kitHeaders() {
  return { 'X-Kit-Api-Key': process.env.KIT_API_KEY, Accept: 'application/json' };
}

/**
 * Locate the subscriber record.
 *
 * The form-membership list reflects a new signup immediately, while the
 * subscriber search endpoint is eventually consistent and can stay empty for a
 * while after creation, so the form list is tried first and the search is only
 * a fallback.
 */
async function findSubscriber(address, { attempts = 10, delayMs = 3000 } = {}) {
  const wanted = address.toLowerCase();
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const formResponse = await fetch(`https://api.kit.com/v4/forms/${FORM_ID}/subscribers`, { headers: kitHeaders() });
    const formBody = await formResponse.json().catch(() => null);
    const formList = Array.isArray(formBody?.subscribers) ? formBody.subscribers : [];
    const inForm = formList.find((entry) => String(entry.email_address).toLowerCase() === wanted);
    if (inForm) return { source: 'form-list', subscriber: inForm, attempts: attempt };

    const searchResponse = await fetch(`https://api.kit.com/v4/subscribers?email_address=${encodeURIComponent(address)}`, {
      headers: kitHeaders(),
    });
    const searchBody = await searchResponse.json().catch(() => null);
    const searchList = Array.isArray(searchBody?.subscribers) ? searchBody.subscribers : [];
    if (searchList.length > 0) return { source: 'search', subscriber: searchList[0], attempts: attempt };

    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return { source: 'none', subscriber: null, attempts };
}

const jiti = createJiti(import.meta.url);
const loaded = await jiti.import(handlerPath);
const handler = loaded?.default ?? loaded;

if (typeof handler !== 'function') {
  console.error('Could not load the /api/subscribe handler from api/subscribe.ts');
  process.exit(1);
}

console.log('api/subscribe — offline guard-rail checks');

const nonPost = await invoke(handler, makeRequest({ method: 'GET' }));
check('GET is rejected with 405', nonPost.res.statusCode === 405, `status=${nonPost.res.statusCode}`);
check('405 response advertises Allow: POST', nonPost.res.headers.allow === 'POST', `allow=${nonPost.res.headers.allow}`);

const malformed = await invoke(handler, makeRequest({ body: '{not-json' }));
check(
  'malformed JSON body returns 400 invalid_body',
  malformed.res.statusCode === 400 && malformed.json?.error === 'invalid_body',
  `status=${malformed.res.statusCode} error=${malformed.json?.error}`,
);

const badEmail = await invoke(handler, makeRequest({ body: JSON.stringify({ email: 'not-an-email' }) }));
check(
  'invalid email returns 400 invalid_email',
  badEmail.res.statusCode === 400 && badEmail.json?.error === 'invalid_email',
  `status=${badEmail.res.statusCode} error=${badEmail.json?.error}`,
);

const oversizedEmail = `${'a'.repeat(300)}@example.com`;
const longEmail = await invoke(handler, makeRequest({ body: JSON.stringify({ email: oversizedEmail }) }));
check('over-long email is rejected', longEmail.res.statusCode === 400, `status=${longEmail.res.statusCode}`);

const savedKey = process.env.KIT_API_KEY;
delete process.env.KIT_API_KEY;
const unconfigured = await invoke(handler, makeRequest({ body: JSON.stringify({ email: 'person@example.com' }) }));
if (savedKey !== undefined) process.env.KIT_API_KEY = savedKey;
check(
  'missing KIT_API_KEY returns 500 not_configured',
  unconfigured.res.statusCode === 500 && unconfigured.json?.error === 'not_configured',
  `status=${unconfigured.res.statusCode} error=${unconfigured.json?.error}`,
);
check(
  'error responses never echo credentials',
  !JSON.stringify(unconfigured.json ?? {}).includes('kit_'),
  'no key material in body',
);

if (!live) {
  console.log(`\noffline checks complete — ${failures === 0 ? 'PASS' : 'FAIL'} (${failures} failure(s))`);
  console.log('run with --live --email=<address> to exercise the real Kit API');
  process.exit(failures === 0 ? 0 : 1);
}

if (!email) {
  console.error('\n--live requires --email=<address>');
  process.exit(1);
}
if (!process.env.KIT_API_KEY) {
  console.error('\n--live requires KIT_API_KEY in the environment (server-side only).');
  process.exit(1);
}

console.log(`\napi/subscribe — live Kit checks for ${email}`);

const liveResult = await invoke(
  handler,
  makeRequest({
    body: JSON.stringify({
      email,
      firstName: 'AutoClaw Test',
      source: 'verification-harness',
      leadMagnet: 'kit-integration-check',
      utmSource: 'harness',
      utmMedium: 'cli',
      utmCampaign: 'verification',
    }),
  }),
);

console.log(`  handler response: status=${liveResult.res.statusCode} body=${JSON.stringify(liveResult.json)}`);
check('live subscribe returns 200 ok', liveResult.res.statusCode === 200 && liveResult.json?.ok === true, `status=${liveResult.res.statusCode}`);
check('live response reports duplicate state', typeof liveResult.json?.duplicate === 'boolean', `duplicate=${liveResult.json?.duplicate}`);
check('response is not cacheable', String(liveResult.res.headers['cache-control'] ?? '').includes('no-store'), `cache-control=${liveResult.res.headers['cache-control']}`);

if (expect === 'new' || expect === 'duplicate') {
  const expected = expect === 'duplicate';
  check(
    `duplicate flag matches --expect=${expect}`,
    liveResult.json?.duplicate === expected,
    `duplicate=${liveResult.json?.duplicate} expected=${expected}`,
  );
}

const found = await findSubscriber(email);
console.log(`  kit read-back: found=${found.subscriber ? 1 : 0} via ${found.source} (after ${found.attempts} attempt(s))`);

// The subscriber search endpoint returns a null `fields` projection, so the
// custom-field values must be read from the single-subscriber endpoint.
let detail = null;
if (found.subscriber) {
  const detailResponse = await fetch(`https://api.kit.com/v4/subscribers/${found.subscriber.id}`, { headers: kitHeaders() });
  const detailBody = await detailResponse.json().catch(() => null);
  detail = detailBody?.subscriber ?? null;
  console.log(`  kit subscriber: id=${found.subscriber.id} created_at=${found.subscriber.created_at}`);
  console.log(`  kit detail status=${detailResponse.status} fields=${JSON.stringify(detail?.fields ?? null)}`);
}
check('subscriber exists in Kit', Boolean(found.subscriber), `found=${found.subscriber ? 1 : 0}`);
check(
  'custom fields persisted (source_page / lead_magnet / utm_*)',
  Boolean(detail?.fields?.source_page && detail?.fields?.lead_magnet && detail?.fields?.utm_source),
  JSON.stringify(detail?.fields ?? null),
);

const formResponse = await fetch(`https://api.kit.com/v4/forms/${FORM_ID}/subscribers`, { headers: kitHeaders() });
const formBody = await formResponse.json().catch(() => null);
const inForm = Array.isArray(formBody?.subscribers)
  ? formBody.subscribers.some((s) => String(s.email_address).toLowerCase() === email.toLowerCase())
  : false;
check(`subscriber is a member of form ${FORM_ID}`, inForm, `form_status=${formResponse.status}`);

console.log(`\nlive checks complete — ${failures === 0 ? 'PASS' : 'FAIL'} (${failures} failure(s))`);
process.exit(failures === 0 ? 0 : 1);
