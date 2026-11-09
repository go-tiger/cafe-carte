'use client';

import { useEffect, useEffectEvent, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Member } from '@/shared/constants';
import { cn } from '@/shared/lib';
import type { CoverVideo } from './useCovers';

interface CoverPlayerProps {
  video: CoverVideo;
  member: Member | undefined;
  autoplay: boolean;
  position?: string;
  controls?: ReactNode;
  overlay?: ReactNode;
  onEnded?: () => void;
}

const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com';

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

export function CoverPlayer({ video, member, autoplay, position, controls, overlay, onEnded }: CoverPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const listensForEnd = onEnded !== undefined;
  const src = `${YOUTUBE_ORIGIN}/embed/${video.videoId}?rel=0${autoplay ? '&autoplay=1' : ''}${listensForEnd ? '&enablejsapi=1' : ''}`;
  const handleEnded = useEffectEvent(() => onEnded?.());

  // YouTube 플레이어가 보내는 재생 상태 중 종료(0)만 받아서 다음 곡으로 넘긴다
  useEffect(() => {
    if (!listensForEnd) return;
    let ended = false;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YOUTUBE_ORIGIN || e.source !== iframeRef.current?.contentWindow) return;
      try {
        const data = JSON.parse(e.data);
        if (data.event === 'onStateChange' && data.info === 0 && !ended) {
          ended = true;
          handleEnded();
        }
      } catch {}
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [listensForEnd, video.videoId]);

  const subscribe = () => {
    if (!listensForEnd) return;
    const player = iframeRef.current?.contentWindow;
    player?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), YOUTUBE_ORIGIN);
    player?.postMessage(
      JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onStateChange'], id: 1, channel: 'widget' }),
      YOUTUBE_ORIGIN,
    );
  };
  const published = new Date(video.publishedAt).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
  const vertical = video.kind === 'short';

  return (
    <div
      className={cn(
        vertical
          ? 'lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-6'
          : 'overflow-hidden rounded-2xl border border-border bg-surface shadow-poster',
      )}
    >
      <div
        className={cn('bg-black sm:shrink-0', vertical && 'mx-auto w-fit overflow-hidden rounded-2xl lg:col-start-2')}
      >
        <div className={vertical ? 'relative mx-auto aspect-9/16 w-(--shorts-w)' : 'relative aspect-video w-full'}>
          <Image src={video.thumbnailUrl} alt='' fill sizes='400px' className='object-cover' />
          <iframe
            ref={iframeRef}
            key={video.videoId}
            src={src}
            title={video.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
            onLoad={subscribe}
            className='relative size-full'
          />
          {overlay}
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col gap-3',
          vertical ? 'pt-4 lg:max-w-80 lg:pt-0' : 'p-5 sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        <div className='min-w-0'>
          {position && <p className='mb-2 text-xs font-bold text-white/70'>{position}</p>}
          <h2 className='font-heavy text-lg leading-snug'>{video.title}</h2>
          <p className={cn('mt-1 text-sm', vertical ? 'text-white/70' : 'text-text-muted')}>
            <span
              className={cn(vertical && member && 'font-bold')}
              style={vertical && member ? { color: member.color } : undefined}
            >
              {member?.nameKo ?? video.channelTitle}
            </span>
            , {published}
          </p>
        </div>
        <div className='flex shrink-0 items-center gap-4'>
          {controls}
          <a
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              'inline-flex shrink-0 items-center gap-1 text-sm font-bold hover:underline',
              vertical ? 'text-white' : 'text-accent',
            )}
          >
            YouTube에서 보기
            <ArrowUpRight aria-hidden className='size-4' />
          </a>
        </div>
      </div>
    </div>
  );
}
