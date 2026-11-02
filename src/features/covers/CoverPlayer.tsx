import { ArrowUpRight } from 'lucide-react';
import type { Member } from '@/shared/constants';
import { cn } from '@/shared/lib';
import type { CoverVideo } from './useCovers';

interface CoverPlayerProps {
  video: CoverVideo;
  member: Member | undefined;
  autoplay: boolean;
}

export function YouTubeNotice({ className }: { className?: string }) {
  return (
    <p className={cn('mt-3 text-xs', className)}>
      영상은 YouTube에서 제공되며, 재생 시{' '}
      <a
        href='https://www.youtube.com/t/terms'
        target='_blank'
        rel='noopener noreferrer'
        className='underline underline-offset-2'
      >
        YouTube 서비스 약관
      </a>
      이 적용됩니다.
    </p>
  );
}

export function CoverPlayer({ video, member, autoplay }: CoverPlayerProps) {
  const src = `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
  const published = new Date(video.publishedAt).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
  const vertical = video.kind === 'short';

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-surface shadow-poster',
        vertical && 'sm:flex sm:w-fit',
      )}
    >
      <div className='bg-black sm:shrink-0'>
        <div
          className={
            vertical
              ? 'mx-auto aspect-9/16 w-full max-w-[min(100%,39svh,360px)] sm:w-[min(39svh,360px)]'
              : 'aspect-video w-full'
          }
        >
          <iframe
            key={video.videoId}
            src={src}
            title={video.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
            className='size-full'
          />
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col gap-3 p-5',
          vertical ? 'sm:w-80 sm:justify-end sm:p-8' : 'sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <div className='min-w-0'>
          <h2 className='font-heavy text-lg leading-snug'>{video.title}</h2>
          <p className='mt-1 text-sm text-text-muted'>
            {member?.nameKo ?? video.channelTitle}, {published}
          </p>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex shrink-0 items-center gap-1 text-sm font-bold text-accent hover:underline'
        >
          YouTube에서 보기
          <ArrowUpRight aria-hidden className='size-4' />
        </a>
      </div>
    </div>
  );
}
