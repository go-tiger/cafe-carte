'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { shuffle } from './shuffle';

const noopSubscribe = () => () => {};

export function useShuffled<T>(items: readonly T[]): readonly T[] {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  return useMemo(() => (mounted ? shuffle(items) : items), [mounted, items]);
}
