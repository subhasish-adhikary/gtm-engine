import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { navigation, navGroups, siteConfig, NavItem } from '../data/content';
import { NewsletterSignup } from './NewsletterSignup';
import { newsletterPlacements } from '../data/newsletter';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Text-based brand: SA | SUBHASHISH ADHIKARY (no image asset) */
function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Subhasish Adhikary — Home">
      <span
        className="font-serif text-[15px] font-semibold leading-none tracking-wide"
        style={{ color: 'var(--text-primary)' }}
      >
        SA
      </span>
      <span className="w-px h-5" style={{ backgroundColor: 'var(--border-color)' }} aria-hidden="true" />
      <span
        className="text-[10.5px] sm:text-[11px] font-medium uppercase leading-none"
        style={{ color: 'var(--text-primary)', letterSpacing: '0.16em' }}
      >
        Subhasish&nbsp;Adhikary
      </span>
    </Link>
  );
}

/* Location block: KOLKATA, INDIA / live IST clock (GMT+5:30) */
function LocationBlock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(now);
  return (
    <div className="hidden lg:flex flex-col items-start justify-center leading-tight pl-4">
      <span className="text-[9px] font-medium uppercase tracking-[0.14em]" style={{ color: 'var(--text-tertiary)' }}>Kolkata, India</span>
      <span className="text-[10px] font-medium tabular-nums uppercase tracking-[0.08em]" style={{ color: 'var(--text-secondary)' }}>{time} · GMT+5:30</span>
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname, location.hash]);

  // Close any open dropdown with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenDropdown(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (path?: string) => {
    if (!path) return false;
    return path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  };

  const renderDesktopItem = (item: NavItem) => {
    const active = isActive(item.path);
    const labelColor = active ? 'var(--accent)' : 'var(--text-secondary)';
    if (!item.children) {
      return (
        <div key={item.label} className="relative">
          <Link
            to={item.path!}
            className="relative inline-flex items-center py-5 text-[13px] font-medium tracking-wide transition-colors hover:text-[var(--text-primary)]"
            style={{ color: labelColor }}
          >
            {item.label}
            {active && (
              <span
                className="absolute left-1/2 -translate-x-1/2 bottom-3 w-1 h-1 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
                aria-hidden="true"
              />
            )}
          </Link>
        </div>
      );
    }
    const open = openDropdown === item.label;
    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => setOpenDropdown(item.label)}
        onMouseLeave={() => setOpenDropdown((cur) => (cur === item.label ? null : cur))}
      >
        <Link
          to={item.path!}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpenDropdown(null)}
          className="relative inline-flex items-center gap-1 py-5 text-[13px] font-medium tracking-wide transition-colors hover:text-[var(--text-primary)]"
          style={{ color: labelColor }}
        >
          {item.label}
          <ChevronDown
            size={12}
            strokeWidth={2}
            className="mt-px transition-transform duration-150"
            style={{ transform: open ? 'rotate(180deg)' : undefined }}
            aria-hidden="true"
          />
          {active && (
            <span
              className="absolute left-1/2 -translate-x-1/2 bottom-3 w-1 h-1 rounded-full"
              style={{ backgroundColor: 'var(--accent)' }}
              aria-hidden="true"
            />
          )}
        </Link>
        {open && (
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full z-50 min-w-[210px] py-1.5 border shadow-sm"
            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '6px' }}
          >
            {item.children.map((child) => (
              <Link
                key={child.label}
                to={child.path}
                onClick={() => setOpenDropdown(null)}
                className="block px-4 py-2 text-[13px] transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b transition-shadow duration-200" style={{ backgroundColor: 'var(--nav-bg)', borderColor: scrolled ? 'var(--border-color)' : 'transparent', boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04)' : 'none' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center h-16">
          <Brand />

          {/* Desktop nav — Home · Work▾ · Thinking▾ · Tools▾ · Lab · About */}
          <div className="hidden lg:flex items-center gap-7 mx-auto">
            {navGroups.map(renderDesktopItem)}
          </div>

          <div className="flex items-center ml-auto lg:ml-0">
            {/* Primary CTA — compact dark button with arrow */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
            >
              Let&rsquo;s connect
              <ArrowRight size={13} strokeWidth={2.25} aria-hidden="true" />
            </Link>
            {/* Thin vertical divider between CTA and location block */}
            <span className="hidden lg:block w-px h-8 ml-4" style={{ backgroundColor: 'var(--border-color)' }} aria-hidden="true" />
            <LocationBlock />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-md" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile — same hierarchy, dropdowns become expandable/collapsible */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            {navGroups.map((item) => {
              const active = isActive(item.path);
              if (!item.children) {
                return (
                  <Link key={item.label} to={item.path!} className="flex items-center gap-2 px-3 py-3 text-sm font-medium" style={{ color: active ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {item.label}
                    {active && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--accent)' }} aria-hidden="true" />}
                  </Link>
                );
              }
              const expanded = mobileExpanded === item.label;
              return (
                <div key={item.label}>
                  <div className="flex items-stretch">
                    <Link to={item.path!} className="flex-1 px-3 py-3 text-sm font-medium" style={{ color: active ? 'var(--accent)' : 'var(--text-primary)' }}>
                      {item.label}
                    </Link>
                    <button
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      aria-expanded={expanded}
                      aria-label={`Toggle ${item.label} submenu`}
                      className="px-4 flex items-center"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <ChevronDown size={14} className="transition-transform duration-150" style={{ transform: expanded ? 'rotate(180deg)' : undefined }} aria-hidden="true" />
                    </button>
                  </div>
                  {expanded && (
                    <div className="pb-1" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.path} className="block pl-8 pr-3 py-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="px-3 pt-4 mt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium" style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                Let&rsquo;s connect
                <ArrowRight size={13} strokeWidth={2.25} aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-3">
              <img 
                src="https://i.ibb.co/gb5BGLXn/Site-logo-for-menu-and-footer.png" 
                alt="Subhasish Adhikary" 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{siteConfig.location}</p>
            <p className="mt-2 text-sm max-w-md" style={{ color: 'var(--text-tertiary)' }}>{siteConfig.description}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Navigate</h4>
            <ul className="space-y-2">{navigation.map((item) => <li key={item.path}><Link to={item.path} className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</Link></li>)}</ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Connect</h4>
            <ul className="space-y-2">
              <li><a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a></li>
              <li><a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: 'var(--text-secondary)' }}>X / Twitter</a></li>
              <li><a href={`mailto:${siteConfig.email}`} className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email</a></li>
              <li><Link to="/contact" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <NewsletterSignup
            variant="compact"
            source={newsletterPlacements.footer.source}
            leadMagnet={newsletterPlacements.footer.leadMagnet}
            heading={newsletterPlacements.footer.heading}
            description={newsletterPlacements.footer.description}
            cta={newsletterPlacements.footer.cta}
          />
        </div>
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <Link to="/privacy" className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Privacy</Link>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
