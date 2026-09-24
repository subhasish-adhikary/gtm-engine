/*
 * Theme hook — LIGHT THEME ONLY.
 *
 * Dark mode has been disabled site-wide. This hook exists only so existing
 * consumers keep a stable `theme` value ('light'); there is no toggle, no
 * persisted preference, and no way to resolve to a dark theme. Any stale
 * 'dark' preference saved by an older version of the site is cleared here.
 */

type Theme = 'light';

export function useTheme() {
  const theme: Theme = 'light';

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('theme');
      sessionStorage.removeItem('theme');
    } catch {
      /* storage unavailable — nothing to clear */
    }
    const root = document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
  }

  return { theme };
}
