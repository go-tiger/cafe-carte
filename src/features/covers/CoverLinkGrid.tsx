import Link from 'next/link';
import { MEMBERS } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import { CoverThumb, CoverThumbSkeleton } from './CoverThumb';
import type { CoverVideo } from './useCovers';

interface CoverLinkGridProps {
  videos: CoverVideo[] | null;
  skeletonCount: number;
  className?: string;
}

export function CoverLinkGrid({ videos, skeletonCount, className }: CoverLinkGridProps) {
  return (
    <ul className={cn('grid grid-cols-1 gap-4 sm:grid-cols-3', className)}>
      {!videos
        ? Array.from({ length: skeletonCount }, (_, i) => (
            <li key={i} aria-hidden className='flex gap-3 motion-safe:animate-pulse sm:flex-col'>
              <CoverThumbSkeleton variant='grid' />
              <div className='flex flex-1 flex-col gap-2 py-1'>
                <div className='h-3.5 w-4/5 rounded bg-surface-2' />
                <div className='h-3 w-1/3 rounded bg-surface-2' />
              </div>
            </li>
          ))
        : videos.map(v => {
            const member = MEMBERS.find(m => m.id === v.memberId);
            return (
              <li key={v.videoId}>
                <Link
                  href={`/covers?cover=${v.videoId}`}
                  data-member={member ? '' : undefined}
                  style={member ? memberVars(member) : undefined}
                  className='group flex gap-3 sm:flex-col'
                >
                  <CoverThumb video={v} variant='grid' zoomOnHover className='shadow-poster' />
                  <span className='flex min-w-0 flex-col gap-1'>
                    <span className='line-clamp-2 text-sm font-heavy leading-snug group-hover:underline sm:text-base'>
                      {v.title}
                    </span>
                    <span className={member ? 'text-xs font-bold text-member-text' : 'text-xs text-text-muted'}>
                      {member?.nameKo ?? v.channelTitle}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
    </ul>
  );
}
