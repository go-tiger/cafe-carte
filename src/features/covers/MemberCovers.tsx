'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { CoverLinkGrid } from './CoverLinkGrid';
import { useCovers } from './useCovers';

const COUNT = 3;

const MORE_LINK = 'inline-flex min-h-10 items-center gap-1 text-sm font-bold text-accent hover:underline';

export function MemberCovers({ memberId, title }: { memberId: string; title: ReactNode }) {
  const covers = useCovers();
  const items = covers.status === 'ready' ? covers.items.filter(v => v.memberId === memberId) : [];
  const all = items.filter(v => v.kind === 'cover');
  const shortCount = items.length - all.length;

  if (covers.status === 'error' || (covers.status === 'ready' && items.length === 0)) return null;

  return (
    <section className='flex flex-col gap-6 px-6 pb-6 sm:px-10 sm:pb-10'>
      {title}
      {(covers.status === 'loading' || all.length > 0) && (
        <CoverLinkGrid videos={covers.status === 'ready' ? all.slice(0, COUNT) : null} skeletonCount={COUNT} />
      )}
      {covers.status === 'ready' && (
        <div className='flex flex-wrap justify-end gap-x-6'>
          {all.length > 0 && (
            <Link href={`/covers?member=${memberId}`} className={MORE_LINK}>
              커버곡 {all.length}곡 보러가기
              <ArrowRight aria-hidden className='size-4' />
            </Link>
          )}
          {shortCount > 0 && (
            <Link href={`/covers?member=${memberId}&kind=short`} className={MORE_LINK}>
              노래 쇼츠 {shortCount}개 보러가기
              <ArrowRight aria-hidden className='size-4' />
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
