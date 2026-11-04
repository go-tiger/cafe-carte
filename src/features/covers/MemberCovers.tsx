'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { CoverLinkGrid } from './CoverLinkGrid';
import { useCovers } from './useCovers';

const COUNT = 3;

export function MemberCovers({ memberId, title }: { memberId: string; title: ReactNode }) {
  const covers = useCovers();
  const all = covers.status === 'ready' ? covers.items.filter(v => v.kind === 'cover' && v.memberId === memberId) : [];

  if (covers.status === 'error' || (covers.status === 'ready' && all.length === 0)) return null;

  return (
    <section className='flex flex-col gap-6 px-6 pb-6 sm:px-10 sm:pb-10'>
      {title}
      <CoverLinkGrid videos={covers.status === 'ready' ? all.slice(0, COUNT) : null} skeletonCount={COUNT} />
      {covers.status === 'ready' && (
        <Link
          href={`/covers?member=${memberId}`}
          className='inline-flex min-h-10 items-center gap-1 self-end text-sm font-bold text-accent hover:underline'
        >
          커버곡 {all.length}곡 모두 보기
          <ArrowRight aria-hidden className='size-4' />
        </Link>
      )}
    </section>
  );
}
