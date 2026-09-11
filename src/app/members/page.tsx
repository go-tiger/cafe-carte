import type { Metadata } from 'next';
import { SiteHeader } from '@/components';
import { MEMBERS } from '@/shared/constants';
import { MemberCard } from '@/shared/ui';

export const metadata: Metadata = {
  title: '멤버',
};

export default function MembersPage() {
  return (
    <>
      <SiteHeader />

      <main className='px-6 pt-32 pb-20 sm:px-10'>
        <div className='mx-auto max-w-5xl'>
          <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>{MEMBERS.length}명의 멤버</p>
          <h1 className='mt-2 font-heavy text-3xl tracking-tight sm:text-4xl'>Cafe Carte 멤버 소개</h1>
          <p className='mt-3 max-w-md text-sm text-text-muted'>
            각 멤버의 프로필과 활동 정보는 준비 중입니다. 차차 채워나갈 예정이에요.
          </p>

          <ul className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {MEMBERS.map(m => (
              <li key={m.id}>
                <MemberCard member={m} variant='detailed' />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
