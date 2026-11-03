import Image from 'next/image';
import type { Member } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import { formatDuration } from './CoverCard';
import type { CoverVideo } from './useCovers';

interface CoverRowProps {
  video: CoverVideo;
  member: Member | undefined;
  active: boolean;
  eager: boolean;
  onSelect: () => void;
}

export function CoverRow({ video, member, active, eager, onSelect }: CoverRowProps) {
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-pressed={active}
      data-member={member ? '' : undefined}
      style={member ? memberVars(member) : undefined}
      className={cn(
        'flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors',
        active ? 'bg-surface-2 ring-2 ring-accent' : 'hover:bg-surface-2',
      )}
    >
      <span className='relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg bg-surface-2'>
        <Image
          src={video.thumbnailUrl.replace('/hqdefault.', '/mqdefault.')}
          alt=''
          fill
          loading={eager ? 'eager' : undefined}
          sizes='128px'
          className='object-cover'
        />
        <span className='absolute right-1 bottom-1 rounded bg-black/75 px-1 text-[0.6875rem] font-bold text-white'>
          {formatDuration(video.durationSec)}
        </span>
      </span>
      <span className='flex min-w-0 flex-col gap-1'>
        <span className='line-clamp-2 text-sm font-heavy leading-snug'>{video.title}</span>
        <span className={cn('text-xs', member ? 'font-bold text-member-text' : 'text-text-muted')}>
          {member?.nameKo ?? video.channelTitle}
        </span>
      </span>
    </button>
  );
}
