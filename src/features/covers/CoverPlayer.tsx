import { ArrowUpRight } from 'lucide-react';
import type { Member } from '@/shared/constants';
import type { CoverVideo } from './useCovers';

interface CoverPlayerProps {
  video: CoverVideo;
  member: Member | undefined;
  autoplay: boolean;
}

export function CoverPlayer({ video, member, autoplay }: CoverPlayerProps) {
  const src = `https://www.youtube-nocookie.com/embed/${video.videoId}?rel=0${autoplay ? '&autoplay=1' : ''}`;
  const published = new Date(video.publishedAt).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });

  return (
    <div className='overflow-hidden rounded-2xl border border-border bg-surface shadow-poster'>
      <div className='aspect-video w-full bg-black'>
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
      <div className='flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between'>
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
