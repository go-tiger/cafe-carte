'use client';

import { useSyncExternalStore } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/shared/lib';

const THRESHOLD = 200;

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

export function ScrollToTop() {
  const visible = useSyncExternalStore(
    subscribe,
    () => window.scrollY > THRESHOLD,
    () => false,
  );

  const scrollTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type='button'
      onClick={scrollTop}
      aria-label='맨 위로'
      title='맨 위로'
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        'fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-12 items-center justify-center gap-1.5 rounded-full bg-text text-sm font-bold text-bg shadow-poster transition-all hover:-translate-y-0.5 sm:right-6 sm:bottom-6 lg:right-[max(1.5rem,calc((100vw-64rem)/2-8rem))] lg:bottom-10 lg:h-11 lg:w-auto lg:px-4',
        visible ? 'opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <ArrowUp aria-hidden className='size-5' />
      <span className='hidden lg:inline'>맨 위로</span>
    </button>
  );
}
