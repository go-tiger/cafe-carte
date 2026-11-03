'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MEMBERS } from '@/shared/constants';
import { memberVars } from '@/shared/lib';
import { Reveal } from '@/shared/ui';
import { formatDuration } from './CoverCard';
import { useCovers } from './useCovers';

const COUNT = 3;

export function LatestCovers() {
  const covers = useCovers();
  const latest = covers.status === 'ready' ? covers.items.filter(v => v.kind === 'cover').slice(0, COUNT) : [];

  if (covers.status === 'error' || (covers.status === 'ready' && latest.length === 0)) return null;

  return (
    <section className='border-t border-border bg-bg px-6 py-20 sm:px-10'>
      <Reveal className='mx-auto max-w-5xl'>
        <div className='flex items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-bold tracking-eyebrow text-text-muted'>COVERS</p>
            <h2 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>커버곡</h2>
            <p className='mt-3 text-sm text-text-muted'>최근 올라온 {COUNT}곡</p>
          </div>
          <Link
            href='/covers'
            className='inline-flex min-h-10 shrink-0 items-center gap-1 text-sm font-bold text-accent hover:underline'
          >
            전체 보기
            <ArrowRight aria-hidden className='size-4' />
          </Link>
        </div>

        <ul className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {covers.status === 'loading'
            ? Array.from({ length: COUNT }, (_, i) => (
                <li key={i} aria-hidden className='flex gap-3 motion-safe:animate-pulse sm:flex-col'>
                  <div className='aspect-video w-36 shrink-0 rounded-xl bg-surface-2 sm:w-full' />
                  <div className='flex flex-1 flex-col gap-2 py-1'>
                    <div className='h-3.5 w-4/5 rounded bg-surface-2' />
                    <div className='h-3 w-1/3 rounded bg-surface-2' />
                  </div>
                </li>
              ))
            : latest.map(v => {
                const member = MEMBERS.find(m => m.id === v.memberId);
                return (
                  <li key={v.videoId}>
                    <Link
                      href={`/covers?cover=${v.videoId}`}
                      data-member={member ? '' : undefined}
                      style={member ? memberVars(member) : undefined}
                      className='group flex gap-3 sm:flex-col'
                    >
                      <span className='relative aspect-video w-36 shrink-0 overflow-hidden rounded-xl bg-surface-2 shadow-poster sm:w-full'>
                        <Image
                          src={v.thumbnailUrl}
                          alt=''
                          fill
                          sizes='(max-width: 640px) 144px, 33vw'
                          className='object-cover transition-transform group-hover:scale-105'
                        />
                        <span className='absolute right-1.5 bottom-1.5 rounded bg-black/75 px-1.5 py-0.5 text-xs font-bold text-white'>
                          {formatDuration(v.durationSec)}
                        </span>
                      </span>
                      <span className='flex min-w-0 flex-col gap-1'>
                        <span className='line-clamp-2 text-sm font-heavy leading-snug group-hover:underline sm:text-base'>
                          {v.title}
                        </span>
                        <span className={member ? 'text-xs font-bold text-member-text' : 'text-xs text-text-muted'}>
                          {member?.nameKo ?? v.channelTitle}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
        </ul>
      </Reveal>
    </section>
  );
}
