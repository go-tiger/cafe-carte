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
  onPrev: (() => void) | undefined;
  onNext: (() => void) | undefined;
  onClose: () => void;
}

const NAV_BUTTON =
  'flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10';

export function ShortsViewer({ video, member, onPrev, onNext, onClose }: ShortsViewerProps) {
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
      className='fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-black p-4 pt-16 text-white open:flex sm:pt-4'
    >
      <button
        type='button'
        aria-label='닫기'
        onClick={() => dialogRef.current?.close()}
        className={cn(NAV_BUTTON, 'fixed top-4 right-4 z-10')}
      >
        <X aria-hidden className='size-5' />
      </button>
      <div className='fixed top-4 left-4 z-10 flex gap-2 sm:top-1/2 sm:right-4 sm:left-auto sm:-translate-y-1/2 sm:flex-col'>
        <button type='button' aria-label='이전 영상' disabled={!onPrev} onClick={onPrev} className={NAV_BUTTON}>
          <ArrowUp aria-hidden className='size-5' />
        </button>
        <button type='button' aria-label='다음 영상' disabled={!onNext} onClick={onNext} className={NAV_BUTTON}>
          <ArrowDown aria-hidden className='size-5' />
        </button>
      </div>
      <div className='m-auto'>
        <CoverPlayer video={video} member={member} autoplay />
        <YouTubeNotice className='text-white/70 hover:[&_a]:text-white' />
      </div>
    </dialog>
  );
}
