import Link from 'next/link';
import { MEMBERS } from '@/shared/constants';
import { MemberCard } from '@/shared/ui';

export function MembersList() {
  return (
    <div className='mx-auto max-w-5xl'>
      <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>MEMBERS</p>
      <h1 className='mt-2 font-heavy text-3xl tracking-tight sm:text-4xl'>Cafe Carte 멤버 소개</h1>
      <p className='mt-3 max-w-md text-sm text-text-muted'>카드를 눌러 각 멤버의 프로필을 확인해보세요.</p>

      <ul className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5'>
        {MEMBERS.map(m => (
          <li key={m.id}>
            <Link href={`/members/${m.id}`}>
              <MemberCard member={m} variant='detailed' />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
