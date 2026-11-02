'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { X } from 'lucide-react';
import type { Member } from '@/shared/constants';
import { CoverPlayer, YouTubeNotice } from './CoverPlayer';
import type { CoverVideo } from './useCovers';

interface ShortsViewerProps {
  video: CoverVideo;
  member: Member | undefined;
  onClose: () => void;
}

export function ShortsViewer({ video, member, onClose }: ShortsViewerProps) {
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
        className='fixed top-4 right-4 z-10 flex size-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80'
      >
        <X aria-hidden className='size-5' />
      </button>
      <div className='m-auto'>
        <CoverPlayer video={video} member={member} autoplay />
        <YouTubeNotice className='text-white/70 hover:[&_a]:text-white' />
      </div>
    </dialog>
  );
}
