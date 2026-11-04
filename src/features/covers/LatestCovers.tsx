'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/shared/ui';
import { CoverLinkGrid } from './CoverLinkGrid';
import { useCovers } from './useCovers';

const COUNT = 3;

export function LatestCovers() {
  const covers = useCovers();
  const latest = covers.status === 'ready' ? covers.items.filter(v => v.kind === 'cover').slice(0, COUNT) : [];

  if (covers.status === 'error' || (covers.status === 'ready' && latest.length === 0)) return null;

  return (
    <section className='border-t border-border bg-bg px-6 py-20 sm:px-10'>
      <Reveal className='mx-auto max-w-5xl'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-bold tracking-eyebrow text-text-muted'>COVERS</p>
            <h2 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>커버곡</h2>
            <p className='mt-3 text-sm text-text-muted'>최근 올라온 {COUNT}곡</p>
          </div>
          <Link
            href='/covers'
            className='inline-flex min-h-10 shrink-0 items-center gap-1 text-sm font-bold text-accent hover:underline'
          >
            전체 보기
            <ArrowRight aria-hidden className='size-4' />
          </Link>
        </div>

        <CoverLinkGrid videos={covers.status === 'ready' ? latest : null} skeletonCount={COUNT} className='mt-10' />
      </Reveal>
    </section>
  );
}
