'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MEMBERS, type Member } from '@/lib/members';

type Tile = {
  m: Member;
  rotate: number;
  dx: number;
  dy: number;
  scale: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const INITIAL: Tile[] = MEMBERS.map(m => ({ m, rotate: 0, dx: 0, dy: 0, scale: 1 }));

export function HeroCollage() {
  const [tiles, setTiles] = useState<Tile[]>(INITIAL);

  useEffect(() => {
    setTiles(
      shuffle(MEMBERS).map(m => ({
        m,
        rotate: rand(-4, 4),
        dx: rand(-6, 6),
        dy: rand(-8, 8),
        scale: rand(0.94, 1.06),
      })),
    );
  }, []);

  return (
    <div
      aria-hidden
      className='collage group absolute right-4 top-1/2 hidden aspect-[3/2] w-[42vw] max-w-[520px] -translate-y-1/2 grid-cols-3 grid-rows-2 gap-3 lg:grid'
    >
      {tiles.map(({ m, rotate, dx, dy, scale }) => (
        <div
          key={m.id}
          className='tile relative overflow-hidden rounded-2xl shadow-poster'
          style={
            {
              backgroundColor: m.color,
              '--tx': `${dx}px`,
              '--ty': `${dy}px`,
              '--rot': `${rotate}deg`,
              '--scl': scale,
            } as React.CSSProperties
          }
        >
          <Image src={m.avatar} alt='' fill sizes='200px' className='tile-img object-cover' />
          <span className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-2 text-right text-xs font-bold text-white'>
            {m.nameKo}
          </span>
        </div>
      ))}
      <div className='tile-logo grid place-items-center rounded-2xl bg-surface-2 shadow-poster'>
        <Image src='/logo.png' alt='' width={56} height={56} className='rounded-full opacity-80' />
      </div>

      <style jsx>{`
        .tile,
        .tile-logo {
          transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0)) scale(var(--scl, 1));
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.35s ease,
            box-shadow 0.35s ease;
        }
        .tile-img {
          transition: transform 0.35s ease;
        }
        .collage:hover .tile,
        .collage:hover .tile-logo {
          filter: brightness(0.55);
        }
        .collage .tile:hover {
          filter: brightness(1);
          transform: translate(var(--tx, 0), var(--ty, 0)) rotate(0deg) scale(1.12);
          z-index: 10;
          box-shadow: 0 24px 50px -12px rgba(0, 0, 0, 0.45);
        }
        .collage .tile:hover .tile-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
