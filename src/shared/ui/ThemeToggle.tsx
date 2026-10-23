'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const isDark = resolvedTheme === 'dark';
  const label = mounted ? (isDark ? '라이트 모드로 전환' : '다크 모드로 전환') : '테마 전환';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className='rounded-full p-2 text-text-muted transition-colors hover:bg-surface-2 hover:text-text'
    >
      <Sun aria-hidden className='hidden size-5 dark:block' />
      <Moon aria-hidden className='size-5 dark:hidden' />
    </button>
  );
}
