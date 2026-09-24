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

/* Live Kolkata time shown at the far right of the header (per mockup) */
function KolkataClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(now);
  return (
    <div className="hidden lg:flex flex-col items-end leading-tight text-right">
      <span className="text-[9px] font-medium uppercase tracking-[0.14em]" style={{ color: 'var(--text-tertiary)' }}>Kolkata, India</span>
      <span className="text-[11px] font-medium tabular-nums" style={{ color: 'var(--text-secondary)' }}>{time} IST</span>
    </div>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b transition-shadow duration-200" style={{ backgroundColor: 'var(--nav-bg)', borderColor: scrolled ? 'var(--border-color)' : 'transparent', boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04)' : 'none' }}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center" aria-label="Home">
            <img
              src="https://i.ibb.co/13gDzfW/logo-light-mode.png"
              alt="Subhasish Adhikary"
              decoding="async"
              className="h-7 sm:h-8 w-auto max-w-[150px] sm:max-w-[160px] object-contain object-left"
            />
          </Link>

          {/* Desktop — flat menu matching the mockup: Home · Work · Thinking · Tools · Lab · About */}
          <div className="hidden lg:flex items-center gap-7">
            {navGroups.map((item) => (
              <Link
                key={item.path}
                to={item.path!}
                className="inline-block py-5 text-[13px] font-medium tracking-wide transition-colors hover:text-[var(--text-primary)]"
                style={{ color: isActive(item.path!) ? 'var(--text-primary)' : 'var(--text-secondary)', backgroundColor: 'transparent' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Primary CTA — solid dark button per mockup */}
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center ml-3 px-4 py-2 text-[13px] font-medium tracking-wide transition-opacity hover:opacity-85"
              style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
            >
              Let&rsquo;s connect
            </Link>
            <KolkataClock />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-md" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile — flat list mirroring the desktop menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
            {navGroups.map((item) => (
              <Link key={item.path} to={item.path!} onClick={() => setMobileOpen(false)} className="block px-3 py-3 text-sm font-medium" style={{ color: isActive(item.path!) ? 'var(--accent)' : 'var(--text-primary)' }}>{item.label}</Link>
            ))}
            <div className="px-3 pt-4 mt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="inline-flex items-center px-4 py-2 text-sm font-medium" style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                Let&rsquo;s connect
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
