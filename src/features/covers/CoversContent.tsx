'use client';

import { useState } from 'react';
import { MEMBERS } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import { CoverCard } from './CoverCard';
import { CoverPlayer } from './CoverPlayer';
import { useCovers } from './useCovers';

type Filter = 'all' | 'official' | string;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'official', label: '공식' },
  ...MEMBERS.map(m => ({ id: m.id, label: m.nameKo })),
];

export function CoversContent() {
  const covers = useCovers();
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const items = covers.status === 'ready' ? covers.items : [];
  const visible = items.filter(v =>
    filter === 'all' ? true : filter === 'official' ? v.memberId === null : v.memberId === filter,
  );
  const current = items.find(v => v.videoId === selectedId) ?? visible[0];
  const memberOf = (id: string | null) => MEMBERS.find(m => m.id === id);

  return (
    <div className='mx-auto max-w-5xl'>
      <p className='text-xs font-bold tracking-eyebrow text-text-muted'>COVERS</p>
      <h1 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>커버곡</h1>
      <p className='mt-3 max-w-md text-sm text-text-muted'>공식 채널과 멤버 채널의 커버곡을 모아 들을 수 있어요.</p>

      <div role='group' aria-label='채널 필터' className='mt-8 flex flex-wrap gap-2'>
        {FILTERS.map(f => {
          const member = memberOf(f.id);
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type='button'
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              data-member={member ? '' : undefined}
              style={member ? memberVars(member) : undefined}
              className={cn(
                'min-h-10 rounded-full border px-4 text-sm font-bold transition-colors',
                active
                  ? 'border-transparent bg-accent text-accent-ink'
                  : 'border-border bg-surface text-text-muted hover:text-text',
                active && member && 'bg-(--m-color) text-(--m-ink)',
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {covers.status === 'loading' && <p className='mt-10 text-sm text-text-muted'>커버곡을 불러오는 중이에요.</p>}
      {covers.status === 'error' && (
        <p className='mt-10 text-sm text-text-muted'>커버곡 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p>
      )}

      {covers.status === 'ready' && (
        <>
          {current ? (
            <div className='mt-8'>
              <CoverPlayer video={current} member={memberOf(current.memberId)} autoplay={selectedId !== null} />
              <p className='mt-3 text-xs text-text-muted'>
                영상은 YouTube에서 제공되며, 재생 시{' '}
                <a
                  href='https://www.youtube.com/t/terms'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline underline-offset-2 hover:text-text'
                >
                  YouTube 서비스 약관
                </a>
                이 적용됩니다.
              </p>
            </div>
          ) : (
            <p className='mt-10 text-sm text-text-muted'>아직 등록된 커버곡이 없어요.</p>
          )}

          {visible.length > 0 && (
            <ul className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {visible.map(v => (
                <li key={v.videoId}>
                  <CoverCard
                    video={v}
                    member={memberOf(v.memberId)}
                    active={current?.videoId === v.videoId}
                    onSelect={() => {
                      setSelectedId(v.videoId);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
