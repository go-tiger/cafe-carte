'use client';

import { useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Cake, PartyPopper } from 'lucide-react';
import { getAnniversaries, memberVars, seoulDateKey } from '@/shared/lib';

const noopSubscribe = () => () => {};

export function AnniversaryBanner() {
  // 정적 배포라 빌드 시점이 아닌 방문 시점의 날짜로 계산한다
  const dateKey = useSyncExternalStore(
    noopSubscribe,
    () => seoulDateKey(new Date()),
    () => null,
  );
  const events = useMemo(() => (dateKey ? getAnniversaries(dateKey) : []), [dateKey]);

  if (events.length === 0) return null;

  return (
    <div className='mx-auto flex max-w-5xl items-center gap-3 px-4 pb-3'>
      <span className='shrink-0 text-xs font-bold tracking-eyebrow text-text-muted'>TODAY</span>
      <ul aria-label='오늘의 기념일' className='flex min-w-0 gap-2 overflow-x-auto'>
        {events.map(({ member, kind, label }) => {
          const Icon = kind === 'debut' ? PartyPopper : Cake;
          return (
            <li key={`${member.id}-${kind}`} className='shrink-0'>
              <Link
                href={`/members/${member.id}`}
                aria-label={`오늘은 ${member.nameKo}의 ${label}이에요`}
                data-member
                style={memberVars(member)}
                className='inline-flex items-center gap-1.5 rounded-full bg-member-hero px-3 py-1 text-sm font-bold whitespace-nowrap text-member-hero-text'
              >
                <Icon aria-hidden className='size-4 shrink-0' />
                {member.nameKo} {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
