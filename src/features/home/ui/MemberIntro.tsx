import Image from 'next/image';
import { MEMBERS } from '@/shared/constants';
import { asset } from '@/shared/lib';
import { Reveal } from '@/shared/ui';

export function MemberIntro() {
  return (
    <section className='border-t border-border bg-bg px-6 py-20 sm:px-10'>
      <Reveal className='mx-auto max-w-5xl'>
        <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>MEMBERS</p>
        <h2 className='mt-2 font-heavy text-3xl tracking-tight sm:text-4xl'>멤버</h2>

        <ul className='mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
          {MEMBERS.map(m => (
            <li
              key={m.id}
              className='flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-poster'
            >
              <div className='relative aspect-179/236 w-full' style={{ backgroundColor: m.color }}>
                <Image
                  src={asset(m.avatar)}
                  alt={m.nameKo}
                  fill
                  sizes='(max-width: 640px) 50vw, 20vw'
                  className='object-cover'
                />
              </div>
              <div className='flex flex-1 flex-col gap-1 p-4'>
                <span className='font-heavy leading-tight' style={{ color: m.ink }}>
                  {m.nameKo}
                </span>
                <span className='text-xs text-text-muted'>{m.name}</span>
                <p className='mt-1 text-xs leading-relaxed text-text-muted'>소개 글이 등록되어있지 않습니다.</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
