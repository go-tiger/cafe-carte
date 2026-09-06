import Image from 'next/image';
import { MEMBERS } from '@/lib/members';
import { asset } from '@/lib/asset';

export function HeroMembers() {
  return (
    <ul className='mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:hidden'>
      {MEMBERS.map((m, i) => (
        <li
          key={m.id}
          className='relative aspect-179/236 overflow-hidden rounded-xl shadow-poster'
          style={{ backgroundColor: m.color }}
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
    </ul>
  );
}
