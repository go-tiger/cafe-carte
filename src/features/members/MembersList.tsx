import { MEMBERS } from '@/shared/constants';
import { MemberMenuItem } from './MemberMenuItem';

export function MembersList() {
  return (
    <div className='mx-auto max-w-5xl'>
      <p className='text-xs font-bold tracking-eyebrow text-text-muted'>MEMBERS</p>
      <h1 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>Cafe Carte 멤버 소개</h1>
      <p className='mt-3 max-w-md text-sm text-text-muted'>멤버를 눌러 프로필을 확인해보세요.</p>

      <ul className='mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {MEMBERS.map(m => (
          <li key={m.id}>
            <MemberMenuItem member={m} />
          </li>
        ))}
      </ul>
    </div>
  );
}
