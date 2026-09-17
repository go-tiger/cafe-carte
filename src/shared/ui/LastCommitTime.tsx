'use client';

import { useSyncExternalStore } from 'react';
import { relativeTime } from '@/shared/lib/relative-time';

const noopSubscribe = () => () => {};

export function LastCommitTime({ pushedAt }: { pushedAt: string }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  return <span suppressHydrationWarning>{mounted ? relativeTime(pushedAt) : ' '}</span>;
}
