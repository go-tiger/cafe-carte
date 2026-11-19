'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MEMBERS, type Member } from '@/shared/constants';
import { asset, reshuffle } from '@/shared/lib';
import { withViewTransition } from '@/shared/lib/viewTransition';
import { useShuffled } from '@/shared/lib/useShuffled';

export function HeroMembers() {
  const initial = useShuffled(MEMBERS);
  const [shuffled, setShuffled] = useState<readonly Member[] | null>(null);
  const members = shuffled ?? initial;

  const shuffleMembers = () => {
    const next = reshuffle(members);
    withViewTransition(() => setShuffled(next));
  };

  return (
    <ul className='mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:hidden'>
      {members.map((m, i) => (
        <li
          key={m.id}
          className='relative aspect-179/236 overflow-hidden rounded-xl shadow-poster'
          style={{ backgroundColor: m.color, viewTransitionName: `hero-member-${m.id}` }}
        >
          <Image
            src={asset(m.avatar)}
            alt={m.nameKo}
            fill
            sizes='(max-width: 640px) 33vw, 20vw'
            className='object-cover'
            priority={i === 0}
          />
        </li>
      ))}
      <li className='relative aspect-179/236 sm:hidden'>
        <button
          type='button'
          onClick={shuffleMembers}
          aria-label='멤버 배너 섞기'
          title='멤버 배너 섞기'
          className='relative block size-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-poster transition-transform active:scale-95 dark:brightness-90 dark:sepia-[.25]'
        >
          <Image src={asset('/logo.png')} alt='' fill sizes='33vw' className='object-cover' />
        </button>
      </li>
    </ul>
  );
}
