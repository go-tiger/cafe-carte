'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getChzzkChannelId, useChzzkLive } from '@/shared/lib';

interface LiveBadgeProps {
  chzzkUrl: string | undefined;
  /** 링크 안(카드 등)에서는 false: 링크 중첩 방지 */
  asLink?: boolean;
}

export function LivePill({ children }: { children?: ReactNode }) {
  return (
    <span className='inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-live px-3 py-1 text-xs font-bold text-white'>
      <span aria-hidden className='size-1.5 animate-pulse rounded-full bg-white motion-reduce:animate-none' />
      LIVE
      {children}
    </span>
  );
}

export function LiveBadge({ chzzkUrl, asLink = false }: LiveBadgeProps) {
  const channelId = getChzzkChannelId(chzzkUrl);
  const status = useChzzkLive(channelId);

  if (!status?.openLive) return null;

  if (!asLink) return <LivePill />;

  return (
    <a
      href={status.liveUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='치지직에서 라이브 방송 보기'
      className='rounded-full transition-opacity hover:opacity-80'
    >
      <LivePill>
        <ArrowUpRight aria-hidden className='size-3' />
      </LivePill>
    </a>
  );
}
