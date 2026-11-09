import { Play } from 'lucide-react';
import type { Member } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import { CoverThumb } from './CoverThumb';
import type { CoverVideo } from './useCovers';

interface CoverCardProps {
  video: CoverVideo;
  member: Member | undefined;
  active: boolean;
  eager: boolean;
  onSelect: () => void;
}

export function CoverCard({ video, member, active, eager, onSelect }: CoverCardProps) {
  return (
    <button
      type='button'
      onClick={onSelect}
      aria-pressed={active}
      data-member={member ? '' : undefined}
      style={member ? memberVars(member) : undefined}
      className={cn(
        'group flex w-full flex-col overflow-hidden rounded-2xl border bg-surface text-left shadow-poster transition-transform hover:-translate-y-1',
        active ? 'border-accent ring-2 ring-accent' : 'border-border',
      )}
    >
      <CoverThumb video={video} variant='vertical' eager={eager} className='rounded-none'>
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity',
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
        >
          <Play className='size-10 fill-white text-white' />
        </span>
      </CoverThumb>
      <span className='flex flex-1 flex-col gap-1 p-3'>
        <span className='line-clamp-2 text-sm font-heavy leading-snug'>{video.title}</span>
        <span className={cn('text-sm', member ? 'font-bold text-member-text' : 'text-text-muted')}>
          {member?.nameKo ?? video.channelTitle}
        </span>
      </span>
    </button>
  );
}
