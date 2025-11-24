"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeMode = Theme | "system";

const THEME_MODE_KEY = "themeMode"; // light/dark/system

declare global {
  interface Window {
    Theme?: {
      getStoredMode: () => ("light" | "dark" | "system") | null;
      isSystemDark: () => boolean;
      cycleTheme: () => void;
      applyTheme: (mode: "light" | "dark" | "system") => void;
    };
  }
}

export default function ThemeToggle() {
  // Default to light on SSR to avoid hydration mismatch
  const [mode, setMode] = useState<ThemeMode>("light");
  const [sysDark, setSysDark] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // Setup on mount: read stored mode and system preference, subscribe to changes
  useEffect(() => {
    const read = () => {
      const m = window.Theme?.getStoredMode?.() ?? "system";
      setMode(m as ThemeMode);
      setSysDark(window.Theme?.isSystemDark?.() ?? false);
    };
    read();
    setMounted(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_MODE_KEY) read();
    };
    window.addEventListener("storage", onStorage);

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMQ = (e: MediaQueryListEvent) => setSysDark(e.matches);
    if (mq && mq.addEventListener) mq.addEventListener("change", onMQ);
    else if (mq && mq.addListener) mq.addListener(onMQ);

    return () => {
      window.removeEventListener("storage", onStorage);
      if (mq && mq.removeEventListener) mq.removeEventListener("change", onMQ);
      else if (mq && mq.removeListener) mq.removeListener(onMQ);
    };
  }, []);

  // Theme application handled by public/theme.js — we only reflect UI state here
  const setAndClose = (next: ThemeMode) => {
    // Optimistically update local UI state
    setMode(next);
    setSysDark(window.Theme?.isSystemDark?.() ?? (!!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));

    // Use global API if available; otherwise fallback
    if (window.Theme?.applyTheme) {
      window.Theme.applyTheme(next);
    } else {
      try {
        const isSys = next === 'system';
        const dark = next === 'dark' || (isSys && (!!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));
        const root = document.documentElement;
        root.classList.add('theme-transition');
        root.classList.toggle('dark', dark);
        setTimeout(() => root.classList.remove('theme-transition'), 300);
        localStorage.setItem('themeMode', next);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
      } catch {}
    }

    setOpen(false);
  };

  const effectiveDark = mode === "dark" || (mode === "system" && sysDark);
  const icon = mounted ? (mode === "system" ? "brightness_6" : effectiveDark ? "dark_mode" : "light_mode") : "brightness_6";
  const label = mounted ? (mode === "system" ? "Theme: system" : effectiveDark ? "Theme: dark" : "Theme: light") : "Change theme";

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      // Close if clicking outside any element with data-theme-menu-root
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-theme-menu-root]')) return;
      setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  return (
    <div className="theme-menu" data-theme-menu-root>
      <button
        type="button"
        aria-label={label}
        className="menu-button"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-icons-outlined" aria-hidden>
          {icon}
        </span>
      </button>

      {open && (
        <div className="theme-menu__panel">
          <button
            type="button"
            className="theme-menu__item"
            onClick={() => setAndClose('light')}
          >
            <span className="material-icons-outlined" aria-hidden>light_mode</span>
            Light
          </button>
          <button
            type="button"
            className="theme-menu__item"
            onClick={() => setAndClose('dark')}
          >
            <span className="material-icons-outlined" aria-hidden>dark_mode</span>
            Dark
          </button>
          <button
            type="button"
            className="theme-menu__item"
            onClick={() => setAndClose('system')}
          >
            <span className="material-icons-outlined" aria-hidden>brightness_6</span>
            System
          </button>
        </div>
      )}
    </div>
  );
}
