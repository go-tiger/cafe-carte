'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label='테마 전환'
      className='rounded-full p-2 text-text-muted transition-colors hover:bg-surface-2 hover:text-text'
    >
      <Sun aria-hidden className='hidden size-5 dark:block' />
      <Moon aria-hidden className='size-5 dark:hidden' />
    </button>
  );
}
