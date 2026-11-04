'use client';

import { Suspense, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { MEMBERS } from '@/shared/constants';
import { cn, memberVars } from '@/shared/lib';
import { relativeTime } from '@/shared/lib/relative-time';
import { CoverCard } from './CoverCard';
import { CoverPlayer, YouTubeNotice } from './CoverPlayer';
import { CoverRow } from './CoverRow';
import { ShortsViewer } from './ShortsViewer';
import { useCovers, type CoverKind } from './useCovers';

type Filter = 'all' | 'official' | string;
type Order = 'newest' | 'oldest';

const ORDERS: { id: Order; label: string }[] = [
  { id: 'newest', label: '최신순' },
  { id: 'oldest', label: '오래된순' },
];

const KINDS: { id: CoverKind; label: string }[] = [
  { id: 'cover', label: '커버곡' },
  { id: 'short', label: '노래 쇼츠' },
];

const STEP_BUTTON =
  'flex size-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:bg-surface-2 hover:text-text disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text-muted';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: '전체' },
  { id: 'official', label: '공식' },
  ...MEMBERS.map(m => ({ id: m.id, label: m.nameKo })),
];

function CoversSkeleton() {
  return (
    <div aria-hidden className='mt-8 motion-safe:animate-pulse lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8'>
      <div className='aspect-video rounded-2xl bg-surface-2' />
      <div className='mt-6 grid gap-3 lg:mt-0'>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className='flex items-center gap-3 p-2'>
            <div className='aspect-video w-32 shrink-0 rounded-lg bg-surface-2' />
            <div className='flex flex-1 flex-col gap-2'>
              <div className='h-3.5 w-4/5 rounded bg-surface-2' />
              <div className='h-3 w-1/3 rounded bg-surface-2' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CoversContent() {
  return (
    <div className='mx-auto max-w-5xl'>
      <p className='text-xs font-bold tracking-eyebrow text-text-muted'>COVERS</p>
      <h1 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>커버곡</h1>
      <p className='mt-3 max-w-md text-sm text-text-muted'>공식 채널과 멤버 채널의 커버곡을 모아 들을 수 있어요.</p>

      <Suspense fallback={<CoversSkeleton />}>
        <CoversBody />
      </Suspense>
    </div>
  );
}

function CoversBody() {
  const covers = useCovers();
  const searchParams = useSearchParams();
  const shortId = searchParams.get('short');
  const [kind, setKind] = useState<CoverKind>(shortId ? 'short' : 'cover');
  const [filter, setFilter] = useState<Filter>(() => {
    const memberId = searchParams.get('member');
    return MEMBERS.some(m => m.id === memberId) ? memberId! : 'all';
  });
  const [order, setOrder] = useState<Order>('newest');
  const [coverId, setCoverId] = useState(() => searchParams.get('cover'));
  const [autoplay, setAutoplay] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const openedFromList = useRef(false);

  const items = covers.status === 'ready' ? covers.items : [];
  const ofKind = items.filter(v => v.kind === kind);
  const matches = (f: Filter, memberId: string | null) =>
    f === 'all' ? true : f === 'official' ? memberId === null : memberId === f;
  const filtered = ofKind.filter(v => matches(filter, v.memberId));
  const visible = kind === 'cover' && order === 'oldest' ? filtered.toReversed() : filtered;
  const selected = visible.find(v => v.videoId === (kind === 'short' ? shortId : coverId));
  const current = selected ?? visible[0];
  const selectedIndex = selected ? visible.indexOf(selected) : -1;
  const moveTo = (index: number) => {
    const video = visible[index];
    return video && (() => window.history.replaceState(null, '', `?short=${video.videoId}`));
  };
  const closeViewer = () => {
    if (openedFromList.current) {
      openedFromList.current = false;
      window.history.back();
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };
  const selectCover = (videoId: string) => {
    setCoverId(videoId);
    setAutoplay(true);
    window.history.replaceState(null, '', `?cover=${videoId}`);
  };
  const clearCover = () => {
    if (coverId) window.history.replaceState(null, '', window.location.pathname);
    setCoverId(null);
    setAutoplay(false);
  };
  const currentIndex = current ? visible.indexOf(current) : -1;
  const prevCover = visible[currentIndex - 1];
  const nextCover = visible[currentIndex + 1];
  const memberOf = (id: string | null) => MEMBERS.find(m => m.id === id);

  return (
    <>
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
              clearCover();
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
          const count = ofKind.filter(v => matches(f.id, v.memberId)).length;
          return (
            <button
              key={f.id}
              type='button'
              aria-pressed={active}
              disabled={covers.status === 'ready' && count === 0 && !active}
              onClick={() => {
                setFilter(f.id);
                clearCover();
                window.history.replaceState(null, '', member ? `?member=${member.id}` : window.location.pathname);
              }}
              data-member={member ? '' : undefined}
              style={member ? memberVars(member) : undefined}
              className={cn(
                'min-h-10 rounded-full border px-4 text-sm font-bold transition-colors disabled:opacity-40',
                active
                  ? 'border-transparent bg-accent text-accent-ink'
                  : 'border-border bg-surface text-text-muted hover:text-text',
                active && member && 'bg-(--m-color) text-(--m-ink)',
              )}
            >
              {f.label}
              {covers.status === 'ready' && <span className='ml-1.5 font-normal opacity-70'>{count}</span>}
            </button>
          );
        })}
      </div>

      {covers.status === 'ready' && covers.updatedAt && (
        <p className='mt-3 text-xs text-text-muted'>
          목록 업데이트 {relativeTime(covers.updatedAt)}, 30분마다 갱신돼요
        </p>
      )}

      {covers.status === 'loading' && <CoversSkeleton />}
      {covers.status === 'error' && (
        <div className='mt-10 flex flex-wrap items-center gap-3 text-sm text-text-muted'>
          <p>커버곡 목록을 불러오지 못했어요.</p>
          <button
            type='button'
            onClick={covers.retry}
            className='inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-surface px-4 font-bold text-text transition-colors hover:bg-surface-2'
          >
            <RotateCw aria-hidden className='size-4' />
            다시 시도
          </button>
        </div>
      )}

      {covers.status === 'ready' && (
        <>
          {!current && (
            <p className='mt-10 text-sm text-text-muted'>
              {ofKind.length === 0 ? '아직 등록된 영상이 없어요.' : '이 채널에는 아직 영상이 없어요.'}
            </p>
          )}

          {current && kind === 'cover' && (
            <div className='mt-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-x-8'>
              <div ref={playerRef} className='scroll-mt-32'>
                <CoverPlayer
                  video={current}
                  member={memberOf(current.memberId)}
                  autoplay={autoplay}
                  onEnded={nextCover && (() => selectCover(nextCover.videoId))}
                  controls={
                    <span className='flex gap-2'>
                      <button
                        type='button'
                        aria-label='이전 곡'
                        disabled={!prevCover}
                        onClick={() => selectCover(prevCover.videoId)}
                        className={STEP_BUTTON}
                      >
                        <ChevronLeft aria-hidden className='size-5' />
                      </button>
                      <button
                        type='button'
                        aria-label='다음 곡'
                        disabled={!nextCover}
                        onClick={() => selectCover(nextCover.videoId)}
                        className={STEP_BUTTON}
                      >
                        <ChevronRight aria-hidden className='size-5' />
                      </button>
                    </span>
                  }
                />
              </div>
              <YouTubeNotice className='text-text-muted hover:[&_a]:text-text lg:col-start-1 lg:row-start-2' />

              <div className='relative mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0'>
                <div className='lg:absolute lg:inset-0 lg:flex lg:flex-col'>
                  <div className='mb-2 flex items-center justify-between px-2 lg:absolute lg:inset-x-0 lg:bottom-full'>
                    <p className='text-sm font-bold'>{visible.length}곡</p>
                    <div role='group' aria-label='정렬' className='flex gap-3 text-sm'>
                      {ORDERS.map(o => (
                        <button
                          key={o.id}
                          type='button'
                          aria-pressed={order === o.id}
                          onClick={() => setOrder(o.id)}
                          className={cn(
                            'min-h-10 font-bold transition-colors',
                            order === o.id ? 'text-text' : 'text-text-muted hover:text-text',
                          )}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ul className='grid gap-1 sm:grid-cols-2 lg:min-h-0 lg:flex-1 lg:grid-cols-1 lg:overflow-y-auto lg:p-1'>
                    {visible.map((v, index) => (
                      <li key={v.videoId}>
                        <CoverRow
                          video={v}
                          member={memberOf(v.memberId)}
                          eager={index < 4}
                          active={current.videoId === v.videoId}
                          onSelect={() => {
                            selectCover(v.videoId);
                            playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {kind === 'short' && visible.length > 0 && (
            <ul className='mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
              {visible.map((v, index) => (
                <li key={v.videoId}>
                  <CoverCard
                    video={v}
                    member={memberOf(v.memberId)}
                    eager={index < 4}
                    active={selected?.videoId === v.videoId}
                    onSelect={() => {
                      openedFromList.current = true;
                      window.history.pushState(null, '', `?short=${v.videoId}`);
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
              position={`${selectedIndex + 1} / ${visible.length}`}
              onPrev={moveTo(selectedIndex - 1)}
              onNext={moveTo(selectedIndex + 1)}
              onClose={closeViewer}
            />
          )}
        </>
      )}
    </>
  );
}
