import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Member } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import type { CoverVideo } from './useCovers';

interface CoverCardProps {
  video: CoverVideo;
  member: Member | undefined;
  active: boolean;
  onSelect: () => void;
}

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, '0');
  return m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

export function CoverCard({ video, member, active, onSelect }: CoverCardProps) {
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
      <span className='relative block aspect-video w-full bg-surface-2'>
        <Image src={video.thumbnailUrl} alt='' fill sizes='(max-width: 640px) 100vw, 33vw' className='object-cover' />
        <span className='absolute right-2 bottom-2 rounded bg-black/75 px-1.5 py-0.5 text-xs font-bold text-white'>
          {formatDuration(video.durationSec)}
        </span>
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity',
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
          )}
        >
          <Play className='size-10 fill-white text-white' />
        </span>
      </span>
      <span className='flex flex-1 flex-col gap-1 p-4'>
        <span className='line-clamp-2 font-heavy leading-snug'>{video.title}</span>
        <span className={cn('text-sm', member ? 'font-bold text-member-text' : 'text-text-muted')}>
          {member?.nameKo ?? video.channelTitle}
        </span>
      </span>
    </button>
  );
}
