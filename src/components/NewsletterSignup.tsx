import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { track } from '@vercel/analytics';
import { newsletterConfig, type NewsletterVariant } from '../data/newsletter';
import { GENERIC_LEAD_MAGNET_ID, leadMagnets, type LeadMagnetId, type LeadMagnetResource } from '../data/leadMagnets';

/**
 * Reusable newsletter / lead-magnet signup.
 *
 * One component serves every lead magnet: the title, description, CTA, lead
 * magnet identifier and source page are all configuration, so no separate Kit
 * form or duplicated component is needed for a new magnet.
 *
 * The browser never sees a Kit credential: it POSTs subscriber details to the
 * server-side `/api/subscribe` endpoint, which talks to Kit.
 *
 * Design notes:
 * - `source_page` sent to Kit is the live page pathname read at the moment of
 *   submission — never `document.referrer`, never a stored first-touch page.
 * - Native React form (no Kit embed <script>), so it can be mounted on many
 *   pages without loading duplicate scripts.
 * - Prerender/hydration safe: nothing touches `window`, `document` or
 *   `sessionStorage` during module evaluation or render.
 * - Never redirects the visitor away from the page.
 * - A lead magnet with no real artifact shows no download link at all.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
const UTM_STORAGE_KEY = 'gtm-ne…tion';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;

type UtmKey = (typeof UTM_KEYS)[number];
type UtmParams = Partial<Record<UtmKey, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'error';

export interface NewsletterSignupProps {
  /**
   * Placement label, e.g. `homepage`, `article`, `footer`. Used for element ids
   * and analytics only — it is NOT what Kit stores as `source_page`; that is the
   * live pathname captured at submit time.
   */
  source?: string;
  /** Lead magnet identifier stored in the Kit `lead_magnet` custom field. */
  leadMagnet?: string;
  /** `section` = full block, `compact` = slim footer strip. */
  variant?: NewsletterVariant;
  /** Override whether the optional first-name field is shown. */
  showFirstName?: boolean;
  eyebrow?: string;
  heading?: string;
  description?: string;
  /** CTA label; defaults to the shared brief CTA. */
  cta?: string;
  /** A destination that genuinely exists, or null when nothing is downloadable. */
  resource?: LeadMagnetResource | null;
  /** Status line shown when there is no artifact to download yet. */
  availability?: string;
  /** One line of contextual positioning for this specific page. */
  contextNote?: string;
  /** Show the newsletter topic chips (generic brief placements only). */
  showTopics?: boolean;
  className?: string;
}

/**
 * The page the visitor is on at the moment they submit.
 *
 * Read from `window.location` inside the submit handler, so it reflects where the
 * form was actually submitted — not where the visitor first landed, and not the
 * HTTP Referer. Query string and fragment are dropped, duplicate slashes
 * collapsed, and a trailing slash removed (except for the root path) so the value
 * matches the site's canonical URLs.
 */
function currentPathname(): string {
  try {
    const raw = window.location.pathname || '/';
    const withoutQueryOrHash = raw.split('?')[0].split('#')[0];
    const collapsed = withoutQueryOrHash.replace(/\/{2,}/g, '/');
    const normalised = collapsed.length > 1 ? collapsed.replace(/\/+$/, '') : '/';
    return normalised || '/';
  } catch {
    return '/';
  }
}

function readStoredAttribution(): UtmParams {
  try {
    const raw = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const stored: UtmParams = {};
    for (const key of UTM_KEYS) {
      const value = parsed?.[key];
      if (typeof value === 'string' && value) stored[key] = value;
    }
    return stored;
  } catch {
    return {};
  }
}

/**
 * First-touch UTM capture: values present in the current URL win and are then
 * persisted for the session, so a signup after in-app navigation still carries
 * the original campaign attribution.
 */
function captureAttribution(): UtmParams {
  const stored = readStoredAttribution();
  const fromUrl: UtmParams = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value;
    }
  } catch {
    /* URL parsing is best effort only */
  }
  const merged: UtmParams = { ...stored, ...fromUrl };
  if (Object.keys(fromUrl).length > 0) {
    try {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(merged));
    } catch {
      /* storage may be unavailable (private mode / blocked cookies) */
    }
  }
  return merged;
}

/** Analytics calls are wrapped so tracking can never break signup. No PII, ever. */
function safeTrack(event: string, properties: Record<string, string | number | boolean>) {
  try {
    track(event, properties);
  } catch {
    /* analytics must never break signup */
  }
}

export function NewsletterSignup({
  source = 'site',
  leadMagnet = 'none',
  variant = 'section',
  showFirstName,
  eyebrow,
  heading,
  description,
  cta,
  resource = null,
  availability,
  contextNote,
  showTopics,
  className = '',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fieldError, setFieldError] = useState('');
  const viewTracked = useRef(false);

  const isCompact = variant === 'compact';
  const withFirstName = showFirstName ?? !isCompact;
  const isSubmitting = status === 'submitting';
  const isComplete = status === 'success' || status === 'duplicate';

  /** The generic brief is the fallback placement; specific magnets are the ones worth measuring. */
  const isSpecificLeadMagnet = Boolean(leadMagnet) && leadMagnet !== 'none' && leadMagnet !== GENERIC_LEAD_MAGNET_ID;

  /**
   * A magnet's downloadable resource is read from the registry unless a caller
   * passes one explicitly, so a placement that sets a canonical `leadMagnet`
   * always exposes the right download without repeating the URL.
   */
  const registryResource = leadMagnet && leadMagnet !== 'none'
    ? leadMagnets[leadMagnet as LeadMagnetId]?.resource ?? null
    : null;
  const activeResource = resource ?? registryResource;

  const resolvedHeading = heading ?? newsletterConfig.name;
  const resolvedDescription = description ?? newsletterConfig.description;
  const resolvedCta = cta ?? newsletterConfig.cta;
  const showTopicChips = showTopics ?? !isSpecificLeadMagnet;

  const emailId = `${source}-newsletter-email`;
  const firstNameId = `${source}-newsletter-first-name`;
  const statusId = `${source}-newsletter-status`;

  // Impression event for a specific lead magnet, fired once per mount.
  useEffect(() => {
    if (!isSpecificLeadMagnet || viewTracked.current) return;
    viewTracked.current = true;
    safeTrack('lead_magnet_view', { lead_magnet: leadMagnet, source });
  }, [isSpecificLeadMagnet, leadMagnet, source]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedEmail = email.trim();
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setFieldError(newsletterConfig.invalidEmailMessage);
      setStatus('error');
      setMessage(newsletterConfig.invalidEmailMessage);
      return;
    }

    setFieldError('');
    setMessage('');
    setStatus('submitting');

    const attribution = captureAttribution();

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: firstName.trim() || undefined,
          // Exact page being submitted from, evaluated now (not at page load).
          sourcePage: currentPathname(),
          leadMagnet,
          utmSource: attribution.utm_source,
          utmMedium: attribution.utm_medium,
          utmCampaign: attribution.utm_campaign,
        }),
      });

      let payload: { ok?: boolean; duplicate?: boolean } | null = null;
      try {
        payload = (await response.json()) as { ok?: boolean; duplicate?: boolean };
      } catch {
        payload = null;
      }

      if (response.ok && payload?.ok) {
        const duplicate = Boolean(payload.duplicate);
        setStatus(duplicate ? 'duplicate' : 'success');
        setMessage(duplicate ? newsletterConfig.duplicateMessage : newsletterConfig.successMessage);
        safeTrack('newsletter_signup', { source, lead_magnet: leadMagnet, duplicate });
        if (isSpecificLeadMagnet) {
          safeTrack('lead_magnet_submit', { lead_magnet: leadMagnet, source, duplicate });
        }
        return;
      }

      setStatus('error');
      setMessage(newsletterConfig.errorMessage);
    } catch {
      setStatus('error');
      setMessage(newsletterConfig.errorMessage);
    }
  }

  const messageColor = status === 'error' ? '#DC2626' : 'var(--text-tertiary)';

  const formNode = isComplete ? (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-3 rounded-lg border p-4"
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mt-0.5 flex-shrink-0">
        <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="2" />
        <path d="M8.5 12.5l2.4 2.4 4.6-4.9" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {status === 'duplicate' ? 'You are already subscribed' : 'Subscribed'}
        </p>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {message}
        </p>
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit} noValidate>
      <div className={withFirstName ? 'grid gap-3 sm:grid-cols-2' : ''}>
        <div>
          <label htmlFor={emailId} className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {newsletterConfig.emailLabel}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={isSubmitting}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={newsletterConfig.emailPlaceholder}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={statusId}
            className="w-full rounded-md border px-3 py-2.5 text-sm transition-colors"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: fieldError ? '#DC2626' : 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
        {withFirstName && (
          <div>
            <label htmlFor={firstNameId} className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {newsletterConfig.firstNameLabel} <span style={{ color: 'var(--text-tertiary)' }}>({newsletterConfig.firstNamePlaceholder})</span>
            </label>
            <input
              id={firstNameId}
              name="firstName"
              type="text"
              autoComplete="given-name"
              disabled={isSubmitting}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="w-full rounded-md border px-3 py-2.5 text-sm transition-colors"
              style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-opacity disabled:opacity-70"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
      >
        {isSubmitting && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="animate-spin">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {isSubmitting ? newsletterConfig.submitting : resolvedCta}
      </button>

      <p className="mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        {newsletterConfig.privacyNote}
      </p>

      <p id={statusId} role="status" aria-live="polite" className="mt-2 text-xs" style={{ color: messageColor }}>
        {status === 'error' ? message : ''}
      </p>
    </form>
  );

  /**
   * A downloadable artifact becomes the primary action; a link to another page
   * on this site stays secondary. Nothing renders when `resource` is null, so a
   * magnet that has not shipped can never expose a broken download.
   */
  const isDownload = Boolean(activeResource && activeResource.kind === 'external');
  const downloadNode = isDownload && activeResource ? (
    <div>
      <a
        href={activeResource.url}
        download
        className="inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold"
        style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
        onClick={() => safeTrack('lead_magnet_download', { lead_magnet: leadMagnet, source, destination: activeResource.url })}
      >
        {activeResource.label} <span aria-hidden="true">↓</span>
      </a>
      {activeResource.meta && (
        <p className="mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>{activeResource.meta}</p>
      )}
    </div>
  ) : null;
  const resourceNode = activeResource && activeResource.kind === 'internal' ? (
    <Link to={activeResource.url} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
      {activeResource.label} →
    </Link>
  ) : null;

  if (isCompact) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="sm:max-w-sm">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {resolvedHeading}
            </h4>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              {resolvedDescription}
            </p>
          </div>
          <div className="w-full sm:max-w-sm">{formNode}</div>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={`${source}-newsletter-heading`}
      data-lead-magnet={leadMagnet}
      className={`rounded-xl border p-6 sm:p-8 ${className}`}
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
              {eyebrow ?? newsletterConfig.eyebrow}
            </span>
          </div>
          <h2
            id={`${source}-newsletter-heading`}
            className="text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {resolvedHeading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            {resolvedDescription}
          </p>
          {contextNote && (
            <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              {contextNote}
            </p>
          )}
          {showTopicChips && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {newsletterConfig.topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border px-2.5 py-1 text-xs font-medium"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}
          {availability && (
            <p className="mt-4 text-xs leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              {availability}
            </p>
          )}
          {resourceNode}
        </div>
        <div>
          {downloadNode}
          {isDownload && (
            <p className={downloadNode ? 'mt-3 text-xs leading-relaxed' : 'text-xs leading-relaxed'} style={{ color: 'var(--text-tertiary)' }}>
              Prefer email? Subscribers get every new resource and The GTM Systems Brief.
            </p>
          )}
          <div className={isDownload ? 'mt-5 border-t pt-5' : ''} style={{ borderColor: 'var(--border-color)' }}>
            {formNode}
          </div>
          {resourceNode}
        </div>
      </div>
    </section>
  );
}

export default NewsletterSignup;
