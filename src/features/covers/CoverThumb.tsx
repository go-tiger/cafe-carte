import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';
import type { CoverVideo } from './useCovers';

type Variant = 'row' | 'grid' | 'vertical';

const FRAME: Record<Variant, string> = {
  row: 'aspect-video w-32',
  grid: 'aspect-video w-36 sm:w-full',
  vertical: 'aspect-9/16 w-full',
};

const SIZES: Record<Variant, string> = {
  row: '128px',
  grid: '(max-width: 640px) 144px, 33vw',
  vertical: '(max-width: 640px) 50vw, 25vw',
};

export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, '0');
  return m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

interface CoverThumbProps {
  video: CoverVideo;
  variant: Variant;
  eager?: boolean;
  zoomOnHover?: boolean;
  className?: string;
  children?: ReactNode;
}

export function CoverThumb({ video, variant, eager, zoomOnHover, className, children }: CoverThumbProps) {
  const src = variant === 'row' ? video.thumbnailUrl.replace('/hqdefault.', '/mqdefault.') : video.thumbnailUrl;

  return (
    <span className={cn('relative block shrink-0 overflow-hidden rounded-xl bg-surface-2', FRAME[variant], className)}>
      <Image
        src={src}
        alt=''
        fill
        loading={eager ? 'eager' : undefined}
        sizes={SIZES[variant]}
        className={cn('object-cover', zoomOnHover && 'transition-transform group-hover:scale-105')}
      />
      <span className='absolute right-1.5 bottom-1.5 rounded bg-black/75 px-1.5 py-0.5 text-xs font-bold text-white'>
        {formatDuration(video.durationSec)}
      </span>
      {children}
    </span>
  );
}

export function CoverThumbSkeleton({ variant, className }: { variant: Variant; className?: string }) {
  return <span aria-hidden className={cn('block shrink-0 rounded-xl bg-surface-2', FRAME[variant], className)} />;
}
