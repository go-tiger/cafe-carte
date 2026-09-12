'use client';

import { useMemo, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { MEMBERS, type Member } from '@/shared/constants';
import { asset, shuffle, randomInRange } from '@/shared/lib';

type Tile = {
  m: Member;
  rotate: number;
  dx: number;
  dy: number;
  scale: number;
};

const noopSubscribe = () => () => {};

const STATIC_TILES: Tile[] = MEMBERS.map(m => ({ m, rotate: 0, dx: 0, dy: 0, scale: 1 }));

function scatter(): Tile[] {
  return shuffle(MEMBERS).map(m => ({
    m,
    rotate: randomInRange(-4, 4),
    dx: randomInRange(-6, 6),
    dy: randomInRange(-8, 8),
    scale: randomInRange(0.94, 1.06),
  }));
}

export function HeroCollage() {
  // 서버·첫 클라 렌더는 정렬된 STATIC_TILES(hydration match), 마운트 후 셔플/회전 적용
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const tiles = useMemo(() => (mounted ? scatter() : STATIC_TILES), [mounted]);

  return (
    <div
      aria-hidden
      className='collage group absolute right-4 top-1/2 hidden w-[42vw] max-w-140 -translate-y-1/2 grid-cols-3 gap-5 lg:grid'
    >
      {tiles.map(({ m, rotate, dx, dy, scale }) => (
        <div
          key={m.id}
          className='slot relative aspect-179/236'
          style={
            {
              '--tx': `${dx}px`,
              '--ty': `${dy}px`,
              '--rot': `${rotate}deg`,
              '--scl': scale,
            } as React.CSSProperties
          }
        >
          <div
            className='inner relative h-full w-full overflow-hidden rounded-2xl shadow-poster'
            style={{ backgroundColor: m.color }}
          >
            <Image src={asset(m.avatar)} alt='' fill sizes='220px' className='img object-cover' priority />
          </div>
        </div>
      ))}
      <div className='slot slot-static relative aspect-179/236'>
        <div className='inner relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-poster'>
          <Image src={asset('/logo.png')} alt='Cafe Carte' fill sizes='220px' className='object-cover' />
        </div>
      </div>

      <style jsx>{`
        .slot * {
          pointer-events: none;
        }
        .inner {
          transform: translate(var(--tx, 0), var(--ty, 0)) rotate(var(--rot, 0)) scale(var(--scl, 1));
          transition:
            transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.35s ease,
            box-shadow 0.35s ease;
        }
        .img {
          transition: transform 0.35s ease;
        }
        .collage:hover .slot:not(.slot-static) .inner {
          filter: brightness(0.55);
        }
        .collage .slot:not(.slot-static):hover {
          z-index: 10;
        }
        .collage .slot:not(.slot-static):hover .inner {
          filter: brightness(1);
          transform: translate(var(--tx, 0), var(--ty, 0)) rotate(0deg) scale(1.12);
          box-shadow: 0 24px 50px -12px rgba(0, 0, 0, 0.45);
        }
        .collage .slot:not(.slot-static):hover .img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
