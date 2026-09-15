'use client';

import { useSyncExternalStore } from 'react';
import { debutDay } from '@/shared/lib/debut-day';

const noopSubscribe = () => () => {};

interface DebutCounterProps {
  debutDate: string;
  color: string;
  ink: string;
}

export function DebutCounter({ debutDate, color, ink }: DebutCounterProps) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  return (
    <span
      suppressHydrationWarning
      className='inline-flex w-fit items-center rounded-full px-3 py-1 font-heavy text-lg tracking-tight'
      style={{ backgroundColor: color, color: ink }}
    >
      {mounted ? debutDay(debutDate) : ' '}
    </span>
  );
}
