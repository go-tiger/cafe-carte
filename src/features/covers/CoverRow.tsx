import type { Member } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import { CoverThumb } from './CoverThumb';
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
      <CoverThumb video={video} variant='row' eager={eager} />
      <span className='flex min-w-0 flex-col gap-1'>
        <span className='line-clamp-2 text-sm font-heavy leading-snug'>{video.title}</span>
        <span className={cn('text-xs', member ? 'font-bold text-member-text' : 'text-text-muted')}>
          {member?.nameKo ?? video.channelTitle}
        </span>
      </span>
    </button>
  );
}
