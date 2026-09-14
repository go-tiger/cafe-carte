'use client';

import { getChzzkChannelId, useChzzkLive } from '@/shared/lib';

interface LiveBadgeProps {
  chzzkUrl: string | undefined;
}

export function LiveBadge({ chzzkUrl }: LiveBadgeProps) {
  const channelId = getChzzkChannelId(chzzkUrl);
  const status = useChzzkLive(channelId);

  if (!status?.openLive) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(status.liveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <span
      role='link'
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') handleClick(e as unknown as React.MouseEvent);
      }}
      className='inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white transition-opacity hover:opacity-80'
    >
      <span className='size-1.5 animate-pulse rounded-full bg-white' />
      LIVE
    </span>
  );
}
