import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navigation, siteConfig } from '../data/content';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Navbar({ theme, toggleTheme }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b transition-shadow duration-200" style={{ backgroundColor: 'var(--nav-bg)', borderColor: scrolled ? 'var(--border-color)' : 'transparent', backdropFilter: 'blur(12px)', boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04)' : 'none' }}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img 
              src="https://i.ibb.co/gb5BGLXn/Site-logo-for-menu-and-footer.png" 
              alt="Subhasish Adhikary" 
              className="h-8 w-auto"
            />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link key={item.path} to={item.path} className="px-3 py-2 text-sm font-medium rounded-md transition-colors" style={{ color: isActive(item.path) ? 'var(--accent)' : 'var(--text-secondary)', backgroundColor: isActive(item.path) ? 'var(--bg-secondary)' : 'transparent' }}>{item.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-md" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-md" style={{ color: 'var(--text-secondary)' }}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="lg:hidden pb-4">
            {navigation.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium rounded-md" style={{ color: isActive(item.path) ? 'var(--accent)' : 'var(--text-secondary)' }}>{item.label}</Link>
            ))}
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
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <Link to="/privacy" className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Privacy</Link>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children, theme, toggleTheme }: { children: ReactNode; theme: 'light' | 'dark'; toggleTheme: () => void }) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollToTop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content" className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
