import { useEffect, useState } from 'react';

/*
 * Hero location + live clock.
 * - Detects the visitor's timezone via Intl.DateTimeFormat().resolvedOptions().timeZone
 * - Resolves a readable city/country label from the IANA zone name when possible
 * - Never requests geolocation permission, never calls an external IP-location service
 * - Updates every second; degrades to "Local time" if the timezone cannot be resolved
 */

const COUNTRY_NAMES: Record<string, string> = {
  IN: 'India', US: 'United States', GB: 'United Kingdom', CA: 'Canada', AU: 'Australia',
  DE: 'Germany', FR: 'France', ES: 'Spain', IT: 'Italy', NL: 'Netherlands', PT: 'Portugal',
  SE: 'Sweden', NO: 'Norway', DK: 'Denmark', FI: 'Finland', PL: 'Poland', CH: 'Switzerland',
  AT: 'Austria', BE: 'Belgium', IE: 'Ireland', CZ: 'Czechia', GR: 'Greece', HU: 'Hungary',
  RO: 'Romania', UA: 'Ukraine', RU: 'Russia', TR: 'Turkey', AE: 'UAE', SA: 'Saudi Arabia',
  IL: 'Israel', SG: 'Singapore', JP: 'Japan', KR: 'South Korea', CN: 'China', HK: 'Hong Kong',
  TW: 'Taiwan', TH: 'Thailand', VN: 'Vietnam', MY: 'Malaysia', ID: 'Indonesia', PH: 'Philippines',
  NZ: 'New Zealand', BR: 'Brazil', MX: 'Mexico', AR: 'Argentina', CL: 'Chile', CO: 'Colombia',
  PE: 'Peru', ZA: 'South Africa', NG: 'Nigeria', KE: 'Kenya', EG: 'Egypt', MA: 'Morocco',
  PK: 'Pakistan', BD: 'Bangladesh', LK: 'Sri Lanka', NP: 'Nepal', FI2: '',
};

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function resolveLocation(tz: string | undefined): { place: string; country: string } | null {
  if (!tz || tz === 'UTC') return null;
  const parts = tz.split('/');
  const city = titleCase(parts[parts.length - 1].replace(/_/g, ' '));
  const region = parts[0];
  const country = /^[A-Z]{2}$/.test(region) ? (COUNTRY_NAMES[region] ?? '') : titleCase(region.replace(/_/, ' '));
  return { place: city, country };
}

function gmtOffsetLabel(offsetMinutes: number): string {
  if (offsetMinutes === 0) return 'GMT';
  const sign = offsetMinutes > 0 ? '+' : '-';
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `GMT${sign}${h}${m ? ':' + m : ''}`;
}

export function LocationClock({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  const [tz, setTz] = useState<string>('');

  useEffect(() => {
    try {
      setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || '');
    } catch {
      setTz('');
    }
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    // Pre-hydration placeholder keeps layout stable (SSR/prerender safe)
    return <div className={className} aria-hidden="true">&nbsp;</div>;
  }

  const loc = resolveLocation(tz);
  const offsetMin = -now.getTimezoneOffset();
  const offset = gmtOffsetLabel(offsetMin);
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now);

  const placeLine = loc
    ? `${loc.place}${loc.country ? ', ' + loc.country : ''}`.toUpperCase()
    : tz
      ? tz.replace(/_/g, ' ').toUpperCase()
      : 'LOCAL TIME';

  return (
    <div className={className}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--text-primary)' }}>
        {placeLine}
      </div>
      <div className="mt-1 text-[10px] tracking-[0.08em] tnum" style={{ color: 'var(--text-tertiary)' }}>
        {offset} · {time.toUpperCase()}
      </div>
    </div>
  );
}
