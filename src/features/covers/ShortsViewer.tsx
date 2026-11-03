'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { ArrowDown, ArrowUp, X } from 'lucide-react';
import type { Member } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { CoverPlayer, YouTubeNotice } from './CoverPlayer';
import type { CoverVideo } from './useCovers';

interface ShortsViewerProps {
  video: CoverVideo;
  member: Member | undefined;
  position: string;
  onPrev: (() => void) | undefined;
  onNext: (() => void) | undefined;
  onClose: () => void;
}

const NAV_BUTTON =
  'flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10';

export function ShortsViewer({ video, member, position, onPrev, onNext, onClose }: ShortsViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowDown' && onNext) {
        e.preventDefault();
        onNext();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onPrev, onNext]);

  const closeOnBackdrop = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={video.title}
      onClose={onClose}
      onClick={closeOnBackdrop}
      className='fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-black p-4 pt-16 pb-20 text-white [--shorts-w:min(calc((100svh-16rem)*9/16),calc(100vw-2rem))] open:flex lg:pt-4 lg:pb-4 lg:[--shorts-w:min(calc((100svh-6rem)*9/16),calc(100vw-45rem))]'
    >
      <button
        type='button'
        aria-label='닫기'
        onClick={() => dialogRef.current?.close()}
        className={cn(NAV_BUTTON, 'fixed top-4 right-4 z-10')}
      >
        <X aria-hidden className='size-5' />
      </button>
      <div className='fixed right-4 bottom-4 z-10 flex gap-2 lg:top-1/2 lg:right-auto lg:bottom-auto lg:left-[calc(50%+var(--shorts-w)/2+1.5rem)] lg:-translate-y-1/2 lg:flex-col'>
        <button type='button' aria-label='이전 영상' disabled={!onPrev} onClick={onPrev} className={NAV_BUTTON}>
          <ArrowUp aria-hidden className='size-5' />
        </button>
        <button type='button' aria-label='다음 영상' disabled={!onNext} onClick={onNext} className={NAV_BUTTON}>
          <ArrowDown aria-hidden className='size-5' />
        </button>
      </div>
      <div className='m-auto lg:w-full'>
        <CoverPlayer video={video} member={member} autoplay position={position} onEnded={onNext} />
        <YouTubeNotice className='text-white/70 hover:[&_a]:text-white pr-28 lg:pr-0 lg:text-center' />
      </div>
    </dialog>
  );
}
