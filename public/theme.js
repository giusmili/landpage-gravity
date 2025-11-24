// Simple JS for theme control (light/dark/system)
const STORAGE_MODE_KEY = 'themeMode';
const STORAGE_THEME_KEY = 'theme';

const getStoredMode = () => {
  try {
    const m = localStorage.getItem(STORAGE_MODE_KEY);
    return m === 'light' || m === 'dark' || m === 'system' ? m : null;
  } catch {
    return null;
  }
};

const isSystemDark = () => {
  try {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  } catch {
    return false;
  }
};

const computeEffectiveDark = (mode) => {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  return isSystemDark();
};

const applyTheme = (mode) => {
  try {
    const dark = computeEffectiveDark(mode);
    const root = document.documentElement;
    root.classList.add('theme-transition');
    root.classList.toggle('dark', dark);
    setTimeout(() => root.classList.remove('theme-transition'), 300);
    localStorage.setItem(STORAGE_MODE_KEY, mode);
    localStorage.setItem(STORAGE_THEME_KEY, dark ? 'dark' : 'light');
  } catch {}
};

const cycleTheme = () => {
  const cur = getStoredMode() ?? 'system';
  const next = cur === 'light' ? 'dark' : cur === 'dark' ? 'system' : 'light';
  applyTheme(next);
};

const initTheme = () => {
  try {
    const mode = getStoredMode() ?? 'system';
    const dark = computeEffectiveDark(mode);
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    localStorage.setItem(STORAGE_THEME_KEY, dark ? 'dark' : 'light');

    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (mq) {
      const handler = () => { if ((getStoredMode() ?? 'system') === 'system') applyTheme('system'); };
      if (mq.addEventListener) mq.addEventListener('change', handler);
      else if (mq.addListener) mq.addListener(handler);
    }
  } catch {}
};

// Expose a tiny API globally and initialize early
try { window.Theme = { applyTheme, cycleTheme, initTheme, isSystemDark, getStoredMode, computeEffectiveDark }; } catch {}
initTheme();
