'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export const themeInitScript = `
(function(){
  try {
    var s = localStorage.getItem('theme');
    var t = (s === 'light' || s === 'dark')
      ? s
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = t;
  } catch (e) {}
})();
`;

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme | undefined) ?? 'light';
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label='테마 전환'
      className='rounded-full p-2 text-lg text-text-muted transition-colors hover:bg-surface-2 hover:text-text'
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
