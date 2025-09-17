export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'app-theme-preference';

let mediaQuery: MediaQueryList | null = null;
let mediaListener: ((e: MediaQueryListEvent) => void) | null = null;

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function getStoredTheme(): Theme | null {
  if (!isBrowser()) return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      return saved;
    }
  } catch {
    // ignore
  }
  return null;
}

export function getCurrentTheme(): Theme {
  return getStoredTheme() ?? 'light';
}

export function getSystemTheme(): Exclude<Theme, 'system'> {
  if (!isBrowser()) return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolveEffectiveTheme(theme: Theme): Exclude<Theme, 'system'> {
  return theme === 'system' ? getSystemTheme() : theme;
}

function applyThemeClass(effective: Exclude<Theme, 'system'>) {
  if (!isBrowser()) return;
  const root = document.documentElement;
  // Toggle Tailwind's class-based dark mode
  root.classList.toggle('dark', effective === 'dark');
  // Hint to the UA color-scheme for native components
  (root.style as any).colorScheme = effective;
}

function tearDownSystemListener() {
  if (mediaQuery && mediaListener) {
    try {
      // Modern browsers
      mediaQuery.removeEventListener('change', mediaListener);
    } catch {
      // Safari < 14 fallback
      // @ts-ignore
      mediaQuery.removeListener(mediaListener);
    }
  }
  mediaQuery = null;
  mediaListener = null;
}

function setupSystemListener() {
  if (!isBrowser() || !window.matchMedia) return;
  tearDownSystemListener();
  mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaListener = (e: MediaQueryListEvent) => {
    applyThemeClass(e.matches ? 'dark' : 'light');
  };
  try {
    mediaQuery.addEventListener('change', mediaListener);
  } catch {
    // Safari < 14 fallback
    // @ts-ignore
    mediaQuery.addListener(mediaListener);
  }
}

export function initTheme() {
  const pref = getCurrentTheme();
  applyThemeClass(resolveEffectiveTheme(pref));
  if (pref === 'system') setupSystemListener();
}

export function setTheme(theme: Theme) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore persistence errors
  }
  if (theme === 'system') {
    setupSystemListener();
    applyThemeClass(getSystemTheme());
  } else {
    tearDownSystemListener();
    applyThemeClass(theme);
  }
}

