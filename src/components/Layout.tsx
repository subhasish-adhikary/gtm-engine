import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigation, navGroups, siteConfig } from '../data/content';
import { NewsletterSignup } from './NewsletterSignup';
import { newsletterPlacements } from '../data/newsletter';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Small editorial caret for dropdown parents */
function Caret({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 10"
      aria-hidden="true"
      className="transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M1.5 3.5 L5 7 L8.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change / Escape
  useEffect(() => { setOpenGroup(null); setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenGroup(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  const isGroupActive = (group: (typeof navGroups)[number]) => {
    if (group.children) return group.children.some((c) => isActive(c.path));
    return group.path ? isActive(group.path) : false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b transition-shadow duration-200" style={{ backgroundColor: 'var(--nav-bg)', borderColor: scrolled ? 'var(--border-color)' : 'transparent', boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04)' : 'none' }}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" onMouseLeave={() => setOpenGroup(null)}>
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" aria-label="Home">
            <img
              src="https://i.ibb.co/13gDzfW/logo-light-mode.png"
              alt="Subhasish Adhikary"
              decoding="async"
              className="h-7 sm:h-8 w-auto max-w-[150px] sm:max-w-[160px] object-contain object-left"
            />
          </Link>

          {/* Desktop — 5 editorial items with subtle dropdowns */}
          <div className="hidden lg:flex items-center gap-7">
            {navGroups.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => setOpenGroup(item.children ? item.label : null)}>
                {item.children ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openGroup === item.label}
                    onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                    className="inline-flex items-center gap-1.5 py-5 text-[13px] font-medium tracking-wide transition-colors"
                    style={{ color: isGroupActive(item) ? 'var(--text-primary)' : 'var(--text-secondary)', backgroundColor: 'transparent', cursor: 'pointer' }}
                  >
                    {item.label}
                    <Caret open={openGroup === item.label} />
                  </button>
                ) : (
                  <Link
                    to={item.path!}
                    className="inline-block py-5 text-[13px] font-medium tracking-wide transition-colors hover:text-[var(--text-primary)]"
                    style={{ color: isActive(item.path!) ? 'var(--text-primary)' : 'var(--text-secondary)', backgroundColor: 'transparent' }}
                  >
                    {item.label}
                  </Link>
                )}
                {item.children && openGroup === item.label && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-1 animate-dropdown-in"
                    role="menu"
                  >
                    <div className="min-w-[180px] py-3" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', boxShadow: '0 12px 32px rgba(23,25,28,0.08)' }}>
                      {item.children.map((child) => (
                        <Link
                          key={`${item.label}-${child.label}`}
                          to={child.path}
                          role="menuitem"
                          className="block px-5 py-2 text-[13px] tracking-wide transition-colors"
                          style={{ color: isActive(child.path) ? 'var(--accent)' : 'var(--text-secondary)' }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Separate CTA — kept out of the primary nav */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center ml-3 px-4 py-2 text-[13px] font-medium tracking-wide transition-colors"
              style={{ border: '1px solid var(--text-primary)', color: 'var(--text-primary)', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            >
              Let&rsquo;s connect
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-md" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile — accordion groups mirroring the desktop dropdowns */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            {navGroups.map((item) =>
              item.children ? (
                <MobileGroup key={item.label} label={item.label} path={item.path!} children_={item.children} isActive={isActive} />
              ) : (
                <Link key={item.path} to={item.path!} onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-sm font-medium" style={{ color: isActive(item.path!) ? 'var(--accent)' : 'var(--text-primary)' }}>{item.label}</Link>
              )
            )}
            <div className="px-3 pt-4 mt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center px-4 py-2 text-sm font-medium" style={{ border: '1px solid var(--text-primary)', color: 'var(--text-primary)' }}>
                Let&rsquo;s connect
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function MobileGroup({ label, path, children_, isActive }: { label: string; path: string; children_: { label: string; path: string }[]; isActive: (p: string) => boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b last:border-b-0" style={{ borderColor: 'var(--border-color)' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium"
        style={{ color: 'var(--text-primary)', backgroundColor: 'transparent', cursor: 'pointer' }}
      >
        {label}
        <Caret open={open} />
      </button>
      {open && (
        <div className="pb-2">
          <Link to={path} onClick={() => setOpen(false)} className="block px-3 pl-6 py-2 text-[13px]" style={{ color: 'var(--text-tertiary)' }}>Overview</Link>
          {children_.map((c) => (
            <Link key={c.label} to={c.path} onClick={() => setOpen(false)} className="block px-3 pl-6 py-2 text-[13px]" style={{ color: isActive(c.path) ? 'var(--accent)' : 'var(--text-secondary)' }}>{c.label}</Link>
          ))}
        </div>
      )}
    </div>
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
