'use client';

import { cn, getChzzkChannelId, useChzzkLive } from '@/shared/lib';

interface LiveBadgeProps {
  chzzkUrl: string | undefined;
  /** 링크 안(카드 등)에서는 false: 링크 중첩 방지 */
  asLink?: boolean;
}

const BADGE_CLASS =
  'inline-flex w-fit items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white';

export function LiveBadge({ chzzkUrl, asLink = false }: LiveBadgeProps) {
  const channelId = getChzzkChannelId(chzzkUrl);
  const status = useChzzkLive(channelId);

  if (!status?.openLive) return null;

  const content = (
    <>
      <span aria-hidden className='size-1.5 animate-pulse rounded-full bg-white motion-reduce:animate-none' />
      LIVE
    </>
  );

  if (!asLink) return <span className={BADGE_CLASS}>{content}</span>;

  return (
    <a
      href={status.liveUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='치지직에서 라이브 방송 보기'
      className={cn(BADGE_CLASS, 'transition-opacity hover:opacity-80')}
    >
      {content}
    </a>
  );
}
