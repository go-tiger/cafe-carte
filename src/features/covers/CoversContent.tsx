'use client';

import { useRef, useState } from 'react';
import { MEMBERS } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import { CoverCard } from './CoverCard';
import { CoverPlayer, YouTubeNotice } from './CoverPlayer';
import { ShortsViewer } from './ShortsViewer';
import { useCovers, type CoverKind } from './useCovers';

type Filter = 'all' | 'official' | string;

const KINDS: { id: CoverKind; label: string }[] = [
  { id: 'cover', label: '커버곡' },
  { id: 'short', label: '노래 쇼츠' },
];

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'official', label: '공식' },
  ...MEMBERS.map(m => ({ id: m.id, label: m.nameKo })),
];

export function CoversContent() {
  const covers = useCovers();
  const [kind, setKind] = useState<CoverKind>('cover');
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const items = covers.status === 'ready' ? covers.items : [];
  const ofKind = items.filter(v => v.kind === kind);
  const visible = ofKind.filter(v =>
    filter === 'all' ? true : filter === 'official' ? v.memberId === null : v.memberId === filter,
  );
  const selected = visible.find(v => v.videoId === selectedId);
  const current = selected ?? visible[0];
  const selectedIndex = selected ? visible.indexOf(selected) : -1;
  const selectAt = (index: number) => {
    const video = visible[index];
    return video && (() => setSelectedId(video.videoId));
  };
  const memberOf = (id: string | null) => MEMBERS.find(m => m.id === id);

  return (
    <div className='mx-auto max-w-5xl'>
      <p className='text-xs font-bold tracking-eyebrow text-text-muted'>COVERS</p>
      <h1 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>커버곡</h1>
      <p className='mt-3 max-w-md text-sm text-text-muted'>공식 채널과 멤버 채널의 커버곡을 모아 들을 수 있어요.</p>

      <div
        role='group'
        aria-label='영상 종류'
        className='mt-8 inline-flex rounded-full border border-border bg-surface p-1'
      >
        {KINDS.map(k => (
          <button
            key={k.id}
            type='button'
            aria-pressed={kind === k.id}
            onClick={() => {
              setKind(k.id);
              setSelectedId(null);
            }}
            className={cn(
              'min-h-10 rounded-full px-5 text-sm font-bold transition-colors',
              kind === k.id ? 'bg-text text-bg' : 'text-text-muted hover:text-text',
            )}
          >
            {k.label}
            {covers.status === 'ready' && (
              <span className='ml-1.5 font-normal opacity-70'>{items.filter(v => v.kind === k.id).length}</span>
            )}
          </button>
        ))}
      </div>

      <div role='group' aria-label='채널 필터' className='mt-4 flex flex-wrap gap-2'>
        {FILTERS.map(f => {
          const member = memberOf(f.id);
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type='button'
              aria-pressed={active}
              onClick={() => {
                setFilter(f.id);
                setSelectedId(null);
              }}
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
          {!current && (
            <p className='mt-10 text-sm text-text-muted'>
              {ofKind.length === 0 ? '아직 등록된 영상이 없어요.' : '이 채널에는 아직 영상이 없어요.'}
            </p>
          )}

          {current && kind === 'cover' && (
            <div ref={playerRef} className='mt-8 scroll-mt-32'>
              <CoverPlayer video={current} member={memberOf(current.memberId)} autoplay={selectedId !== null} />
              <YouTubeNotice className='text-text-muted hover:[&_a]:text-text' />
            </div>
          )}

          {visible.length > 0 && (
            <ul
              className={cn(
                'mt-10 grid',
                kind === 'short'
                  ? 'grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3',
              )}
            >
              {visible.map(v => (
                <li key={v.videoId}>
                  <CoverCard
                    video={v}
                    member={memberOf(v.memberId)}
                    active={(kind === 'short' ? selected : current)?.videoId === v.videoId}
                    onSelect={() => {
                      setSelectedId(v.videoId);
                      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  />
                </li>
              ))}
            </ul>
          )}

          {kind === 'short' && selected && (
            <ShortsViewer
              video={selected}
              member={memberOf(selected.memberId)}
              onPrev={selectAt(selectedIndex - 1)}
              onNext={selectAt(selectedIndex + 1)}
              onClose={() => setSelectedId(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
