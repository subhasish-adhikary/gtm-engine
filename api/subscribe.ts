/**
 * POST /api/subscribe
 *
 * Server-side newsletter endpoint. The browser posts subscriber details here and
 * only this function talks to Kit (formerly ConvertKit). The Kit API key is read
 * from the server-side `KIT_API_KEY` environment variable and is never sent to,
 * or readable by, the client.
 *
 * Flow:
 *   website form -> POST /api/subscribe -> Kit API -> subscriber added to Kit
 *
 * Kit calls made by this handler:
 *   1. GET  /v4/subscribers?email_address=...        (duplicate pre-check, eventually consistent)
 *      source_page is validated as a site-relative pathname (see cleanPathname).
 *   2. POST /v4/subscribers                          (create/update subscriber + custom fields; 201 new, 200 existing)
 *   3. POST /v4/forms/{form_id}/subscribers          (add subscriber to the newsletter form)
 *   4. POST /v4/tags/{tag_id}/subscribers            (optional, only when KIT_TAG_ID is set)
 *
 * Environment:
 *   KIT_API_KEY  (required)  Kit v4 API key. Server-side only.
 *   KIT_FORM_ID  (optional)  Kit form id. Defaults to the site's "Newsletter site" form.
 *   KIT_TAG_ID   (optional)  Kit tag id applied to every subscriber.
 *
 * This file is intentionally dependency-free and self-contained so it does not
 * affect the client bundle or the project's `tsc --noEmit` surface.
 */

const KIT_API_BASE = 'https://api.kit.com/v4';
const DEFAULT_FORM_ID = '9947751';
const KIT_TIMEOUT_MS = 8000;

const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/** Practical email shape check. Deliberately conservative, not RFC-complete. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/** Custom field keys that already exist in the Kit account. */
const CUSTOM_FIELDS = ['source_page', 'lead_magnet', 'utm_source', 'utm_medium', 'utm_campaign'] as const;

type RateBucket = number[];

/**
 * Best-effort, per-instance rate limit. Serverless instances are ephemeral, so
 * this dampens bursts from a single client without pretending to be a global
 * limiter.
 */
const rateBuckets = new Map<string, RateBucket>();

type SubscriptionRequest = Record<string, unknown>;

interface KitResult {
  status: number;
  body: any;
}

/**
 * Node's `process` is read through an explicit global cast so this file stays
 * self-contained: it needs no @types/node and no ambient `declare` statements
 * (jiti's TypeScript transform rejects ambient method-signature declarations).
 */
function runtimeEnv(): Record<string, string | undefined> {
  const runtime = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process;
  return runtime?.env ?? {};
}

function readConfig() {
  const env = runtimeEnv();
  return {
    apiKey: env.KIT_API_KEY,
    formId: env.KIT_FORM_ID || DEFAULT_FORM_ID,
    tagId: env.KIT_TAG_ID,
  };
}

function clientIp(req: any): string {
  const forwarded = req?.headers?.['x-forwarded-for'];
  const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (typeof forwardedValue === 'string' && forwardedValue.length > 0) {
    const first = forwardedValue.split(',')[0].trim();
    if (first) return first;
  }
  const real = req?.headers?.['x-real-ip'];
  const realValue = Array.isArray(real) ? real[0] : real;
  if (typeof realValue === 'string' && realValue.trim()) return realValue.trim();
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateBuckets.get(ip) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  // Keep the map small on long-lived instances.
  if (rateBuckets.size > 500) {
    for (const [key, timestamps] of rateBuckets) {
      if (!timestamps.some((ts) => now - ts < RATE_LIMIT_WINDOW_MS)) rateBuckets.delete(key);
    }
  }
  return false;
}

/**
 * Validate a submitted page pathname.
 *
 * Accepts only a site-relative path (leading `/`), drops any query string or
 * fragment, collapses duplicate slashes and removes a trailing slash so the
 * stored value matches the site's canonical URLs. Anything else is rejected
 * rather than stored, so a bad value can never masquerade as attribution.
 */
function cleanPathname(value: unknown): string | undefined {
  const raw = cleanText(value, 200);
  if (!raw) return undefined;
  if (!raw.startsWith('/')) return undefined;
  const withoutQueryOrHash = raw.split('?')[0].split('#')[0];
  if (/\s/.test(withoutQueryOrHash)) return undefined;
  const collapsed = withoutQueryOrHash.replace(/\/{2,}/g, '/');
  const normalised = collapsed.length > 1 ? collapsed.replace(/\/+$/, '') : '/';
  return normalised || '/';
}

/** Trim, strip control characters (blocks header injection), cap length. */
function cleanText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const stripped = value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim();
  if (!stripped) return undefined;
  return stripped.slice(0, maxLength);
}

function parseJsonBody(body: unknown): SubscriptionRequest | null {
  if (body === null || body === undefined || body === '') return null;
  if (typeof body === 'string') {
    try {
      const parsed = JSON.parse(body);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as SubscriptionRequest) : null;
    } catch {
      return null;
    }
  }
  if (typeof body === 'object') return body as SubscriptionRequest;
  return null;
}

function send(res: any, statusCode: number, payload: Record<string, unknown>, extraHeaders: Record<string, string> = {}) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  for (const [key, value] of Object.entries(extraHeaders)) res.setHeader(key, value);
  res.end(JSON.stringify(payload));
}

async function kitFetch(path: string, init: { method: string; body?: string }): Promise<KitResult> {
  const apiKey = readConfig().apiKey as string;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), KIT_TIMEOUT_MS);
  try {
    const response = await fetch(`${KIT_API_BASE}${path}`, {
      method: init.method,
      headers: {
        'X-Kit-Api-Key': apiKey,
        Accept: 'application/json',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: init.body,
      signal: controller.signal,
    });
    const text = await response.text();
    let parsed: any = null;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }
    }
    return { status: response.status, body: parsed };
  } finally {
    clearTimeout(timer);
  }
}

function looksLikeExistingSubscriber(result: KitResult): boolean {
  if (result.status < 400) return false;
  const raw = JSON.stringify(result.body ?? '').toLowerCase();
  return raw.includes('already') || raw.includes('exists');
}

/** Short, secret-free identifier for logs. */
function errorCodeOf(body: any): string {
  if (!body || typeof body !== 'object') return 'unknown';
  const candidate = body.error ?? body.message ?? body.errors;
  if (typeof candidate === 'string') return candidate.slice(0, 80);
  if (candidate && typeof candidate === 'object') return JSON.stringify(candidate).slice(0, 80);
  return 'unknown';
}

export default async function handler(req: any, res: any): Promise<void> {
  if (req?.method !== 'POST') {
    send(res, 405, { ok: false, error: 'method_not_allowed', message: 'Use POST to subscribe.' }, { Allow: 'POST' });
    return;
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    send(res, 429, { ok: false, error: 'rate_limited', message: 'Too many requests. Please try again shortly.' }, { 'Retry-After': '600' });
    return;
  }

  const body = parseJsonBody(req?.body);
  if (!body) {
    send(res, 400, { ok: false, error: 'invalid_body', message: 'Request body must be valid JSON.' });
    return;
  }

  const emailRaw = cleanText(body.email, 254);
  const email = emailRaw ? emailRaw.toLowerCase() : '';
  if (!email || !EMAIL_PATTERN.test(email)) {
    send(res, 400, { ok: false, error: 'invalid_email', message: 'Enter a valid email address.' });
    return;
  }

  const firstName = cleanText(body.firstName ?? body.first_name, 80);

  const attributes: Record<string, string> = {};

  // `source_page` must be the page pathname captured at submit time. The static
  // placement label is deliberately NOT accepted as a fallback: storing
  // "homepage" instead of "/" would hide real attribution bugs.
  const sourcePage = cleanPathname(body.sourcePage ?? body.source_page);

  const attributeInputs: Record<string, unknown> = {
    source_page: sourcePage,
    lead_magnet: body.leadMagnet ?? body.lead_magnet,
    utm_source: body.utmSource ?? body.utm_source,
    utm_medium: body.utmMedium ?? body.utm_medium,
    utm_campaign: body.utmCampaign ?? body.utm_campaign,
  };
  for (const key of CUSTOM_FIELDS) {
    const value = cleanText(attributeInputs[key], 200);
    if (value) attributes[key] = value;
  }

  const { apiKey, formId, tagId } = readConfig();
  if (!apiKey) {
    console.error('kit_subscribe status=500 error=not_configured');
    send(res, 500, { ok: false, error: 'not_configured', message: 'Newsletter signup is temporarily unavailable.' });
    return;
  }

  try {
    // 1. Duplicate pre-check — deterministic "already on the list" handling.
    let duplicate = false;
    try {
      const existing = await kitFetch(`/subscribers?email_address=${encodeURIComponent(email)}`, { method: 'GET' });
      if (existing.status < 400 && Array.isArray(existing.body?.subscribers)) {
        duplicate = existing.body.subscribers.length > 0;
      }
    } catch {
      // A failed pre-check must never block a legitimate signup.
      duplicate = false;
    }

    // 2. Create (or update) the subscriber with segmentation fields.
    const createPayload: Record<string, unknown> = { email_address: email };
    if (firstName) createPayload.first_name = firstName;
    if (Object.keys(attributes).length > 0) createPayload.fields = attributes;

    const created = await kitFetch('/subscribers', { method: 'POST', body: JSON.stringify(createPayload) });
    if (created.status >= 400 && !looksLikeExistingSubscriber(created)) {
      console.error(`kit_subscribe status=${created.status} duplicate=${duplicate} error=${errorCodeOf(created.body)}`);
      send(res, 502, { ok: false, error: 'upstream_error', message: 'Something went wrong on our end. Please try again in a moment.' });
      return;
    }
    // Kit answers 201 when a subscriber is created and 200 when the address
    // already existed. That status is the authoritative duplicate signal: the
    // subscriber search index above is eventually consistent and can miss an
    // address that was created seconds ago.
    if (created.status === 200 || (created.status >= 400 && looksLikeExistingSubscriber(created))) {
      duplicate = true;
    }

    // 3. Ensure membership of the newsletter form.
    const formResult = await kitFetch(`/forms/${encodeURIComponent(formId)}/subscribers`, {
      method: 'POST',
      body: JSON.stringify({ email_address: email }),
    });
    if (formResult.status >= 400) {
      console.error(`kit_subscribe status=${formResult.status} duplicate=${duplicate} error=form_${errorCodeOf(formResult.body)}`);
      send(res, 502, { ok: false, error: 'upstream_error', message: 'Something went wrong on our end. Please try again in a moment.' });
      return;
    }

    // 4. Optional tag applied to every subscriber.
    if (tagId) {
      const tagResult = await kitFetch(`/tags/${encodeURIComponent(tagId)}/subscribers`, {
        method: 'POST',
        body: JSON.stringify({ email_address: email }),
      });
      if (tagResult.status >= 400) {
        // Tagging is an enhancement, not a requirement: log and continue.
        console.error(`kit_subscribe status=${tagResult.status} duplicate=${duplicate} error=tag_${errorCodeOf(tagResult.body)}`);
      }
    }

    console.log(
      `kit_subscribe status=200 duplicate=${duplicate} form=${formId} fields=${Object.keys(attributes).length}` +
        ` source_page=${attributes.source_page ?? 'none'} lead_magnet=${attributes.lead_magnet ?? 'none'}`,
    );
    send(res, 200, { ok: true, duplicate });
  } catch (error: any) {
    const aborted = error?.name === 'AbortError';
    const reason = String(error?.message ?? error ?? '').slice(0, 160);
    console.error(`kit_subscribe status=502 error=${aborted ? 'timeout' : `exception:${reason}`}`);
    send(res, 502, { ok: false, error: 'upstream_error', message: 'Something went wrong on our end. Please try again in a moment.' });
  }
}
