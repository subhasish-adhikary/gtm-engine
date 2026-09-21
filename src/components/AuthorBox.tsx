import { LinkedinIcon } from './icons';
import { siteConfig } from '../data/content';

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

export function AuthorBox({
  name = 'Subhasish Adhikary',
  role = 'Growth Marketing & GTM Strategy',
  bio = 'Growth Marketing & GTM Engineer with 6+ years of experience building B2B growth systems across demand generation, marketing automation, outbound, ABM and AI-enabled RevOps. Currently at LanceSoft, building growth and GTM systems that connect marketing execution with pipeline creation.',
}: {
  name?: string;
  role?: string;
  bio?: string;
}) {
  return (
    <div
      className="p-5 rounded-lg border"
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <img
          src="https://i.ibb.co/B2spFn8r/Subhasish-Adhikary-Marketer-1.png"
          alt={name}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0"
          style={{ border: '2px solid var(--border-color)' }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Written by
          </p>
          <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            {name}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            {role}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on LinkedIn"
            className="w-9 h-9 rounded-md border flex items-center justify-center transition-colors hover:border-accent"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={siteConfig.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on X"
            className="w-9 h-9 rounded-md border flex items-center justify-center transition-colors hover:border-accent"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <XIcon size={15} />
          </a>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {bio}
      </p>
    </div>
  );
}
