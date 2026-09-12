import Link from 'next/link';
import { MEMBERS } from '@/shared/constants';
import { MemberCard, Reveal } from '@/shared/ui';

export function MemberIntro() {
  return (
    <section className='border-t border-border bg-bg px-6 py-20 sm:px-10'>
      <Reveal className='mx-auto max-w-5xl'>
        <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>MEMBERS</p>
        <h2 className='mt-2 font-heavy text-3xl tracking-tight sm:text-4xl'>멤버</h2>

        <ul className='mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
          {MEMBERS.map(m => (
            <li key={m.id}>
              <Link href='/members' className='block transition-transform hover:-translate-y-1'>
                <MemberCard member={m} />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
