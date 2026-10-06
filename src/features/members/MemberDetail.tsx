import Image from 'next/image';
import Link from 'next/link';
import type { ComponentType, CSSProperties, SVGProps } from 'react';
import type { Member } from '@/shared/constants';
import { MEMBER_DETAILS, BRAND_COLORS } from '@/shared/constants';
import { asset, memberVars } from '@/shared/lib';
import { DebutCounter, Emoji, LiveBadge } from '@/shared/ui';
import { ChzzkIcon, YoutubeIcon, XIcon } from '@/shared/ui/icons';

const SNS_ICONS = {
  chzzk: ChzzkIcon,
  youtube: YoutubeIcon,
  x: XIcon,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

const SNS_LABELS = {
  chzzk: '치지직',
  youtube: '유튜브',
  x: 'X',
} satisfies Record<string, string>;

interface MemberDetailProps {
  member: Member;
  prevMember: Member;
  nextMember: Member;
}

export function MemberDetail({ member, prevMember, nextMember }: MemberDetailProps) {
  const detail = MEMBER_DETAILS[member.id];
  const fanNameLines = detail?.fanName.split(/(?= \()/) ?? [];

  return (
    <>
      <div className='border-b border-border px-6 pt-32 pb-10 sm:px-10' style={{ backgroundColor: member.color }}>
        <div className='mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-end'>
          <div className='relative aspect-179/236 w-56 shrink-0 overflow-hidden rounded-2xl border border-border shadow-poster sm:w-72'>
            <Image
              src={asset(member.avatar)}
              alt={member.nameKo}
              fill
              sizes='288px'
              priority
              className='object-cover'
            />
          </div>

          <div className='flex flex-col gap-2 pb-2'>
            <p className='text-xs font-bold tracking-[0.3em] text-black/60'>{member.position}</p>
            <h1 className='font-display font-heavy text-5xl tracking-tight sm:text-6xl' style={{ color: member.ink }}>
              {member.nameKo}
            </h1>
            <p className='text-sm text-black/60'>{member.name}</p>
            <LiveBadge chzzkUrl={detail?.links.chzzk} asLink />
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-5xl px-6 sm:px-10'>
        <p className='mt-8 max-w-xl text-base leading-relaxed text-text-muted'>
          {detail?.bio ?? '소개 글이 등록되어있지 않습니다.'}
        </p>

        {detail && (
          <dl className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
            <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
              <dt className='text-xs text-text-muted'>나이</dt>
              <dd className='mt-1 font-heavy'>{detail?.age}</dd>
            </div>
            <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
              <dt className='text-xs text-text-muted'>{detail?.anniversaryLabel ?? '생일'}</dt>
              <dd className='mt-1 font-heavy'>{detail?.anniversary}</dd>
            </div>
            <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
              <dt className='text-xs text-text-muted'>데뷔일</dt>
              <dd className='mt-1 font-heavy'>{detail?.debutDate}</dd>
              {detail && (
                <dd className='mt-1.5'>
                  <DebutCounter debutDate={detail.debutDate} color={member.color} ink={member.ink} />
                </dd>
              )}
            </div>
            <div className='col-span-2 rounded-2xl border border-border bg-surface p-4 shadow-poster'>
              <dt className='text-xs text-text-muted'>팬네임</dt>
              <dd className='mt-1 font-heavy'>
                {fanNameLines.map(line => (
                  <span key={line} className='block'>
                    {line.trim()}
                  </span>
                ))}
              </dd>
            </div>
            <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
              <dt className='text-xs text-text-muted'>오시마크</dt>
              <dd className='mt-1 text-lg'>{detail && <Emoji>{detail.mark}</Emoji>}</dd>
            </div>
          </dl>
        )}

        {detail && (
          <div className='mt-6 flex flex-wrap gap-2 text-xs'>
            {[detail.tags.unified, detail.tags.clip, detail.tags.art].map(tag => (
              <a
                key={tag}
                href={`https://x.com/hashtag/${encodeURIComponent(tag.replace(/^#/, ''))}`}
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-full bg-surface-2 px-3 py-1 text-text-muted transition-opacity hover:opacity-70'
              >
                {tag}
              </a>
            ))}
          </div>
        )}

        <Link
          href={`/members/${prevMember.id}`}
          aria-label={`이전 멤버: ${prevMember.nameKo}`}
          data-member
          style={memberVars(prevMember)}
          className='fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-border bg-surface py-3 pr-4 pl-2 shadow-poster transition-transform hover:-translate-x-1 sm:flex'
        >
          <span aria-hidden className='text-lg text-text-muted'>
            ←
          </span>
          <span className='max-w-24 truncate font-heavy text-member-text'>{prevMember.nameKo}</span>
        </Link>
        <Link
          href={`/members/${nextMember.id}`}
          aria-label={`다음 멤버: ${nextMember.nameKo}`}
          data-member
          style={memberVars(nextMember)}
          className='fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-border bg-surface py-3 pr-2 pl-4 shadow-poster transition-transform hover:translate-x-1 sm:flex'
        >
          <span className='max-w-24 truncate font-heavy text-member-text'>{nextMember.nameKo}</span>
          <span aria-hidden className='text-lg text-text-muted'>
            →
          </span>
        </Link>

        {detail?.links && (
          <div className='mt-12 border-t border-border pt-8'>
            <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>CHANNELS</p>
            <ul className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {detail.links.chzzk && (
                <li>
                  <a
                    href={detail.links.chzzk}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
                  >
                    <span
                      className='flex size-12 shrink-0 items-center justify-center rounded-xl'
                      style={{ backgroundColor: BRAND_COLORS.chzzk.color, color: BRAND_COLORS.chzzk.ink }}
                    >
                      <SNS_ICONS.chzzk className='size-6' />
                    </span>
                    <span className='min-w-0 flex-1 font-heavy text-lg leading-tight'>{SNS_LABELS.chzzk}</span>
                  </a>
                </li>
              )}
              {detail.links.youtube?.map(yt => (
                <li key={yt.url}>
                  <a
                    href={yt.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
                  >
                    <span
                      className='flex size-12 shrink-0 items-center justify-center rounded-xl'
                      style={
                        {
                          backgroundColor: BRAND_COLORS.youtube.color,
                          color: BRAND_COLORS.youtube.ink,
                          ['--yt-notch' as string]: BRAND_COLORS.youtube.color,
                        } as CSSProperties
                      }
                    >
                      <SNS_ICONS.youtube className='size-6' />
                    </span>
                    <span className='min-w-0 flex-1 truncate font-heavy text-lg leading-tight'>
                      {SNS_LABELS.youtube} · {yt.label}
                    </span>
                  </a>
                </li>
              ))}
              {detail.links.x && (
                <li>
                  <a
                    href={detail.links.x}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
                  >
                    <span
                      className='flex size-12 shrink-0 items-center justify-center rounded-xl'
                      style={{ backgroundColor: BRAND_COLORS.x.color, color: BRAND_COLORS.x.ink }}
                    >
                      <SNS_ICONS.x className='size-6' />
                    </span>
                    <span className='min-w-0 flex-1 font-heavy text-lg leading-tight'>{SNS_LABELS.x}</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        <nav aria-label='멤버 이동' className='mt-12 grid grid-cols-2 gap-3 sm:hidden'>
          <Link
            href={`/members/${prevMember.id}`}
            data-member
            style={memberVars(prevMember)}
            className='flex min-h-16 items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-poster'
          >
            <span aria-hidden className='text-lg text-text-muted'>
              ←
            </span>
            <span className='flex min-w-0 flex-col'>
              <span className='text-xs text-text-muted'>이전 멤버</span>
              <span className='truncate font-heavy text-member-text'>{prevMember.nameKo}</span>
            </span>
          </Link>
          <Link
            href={`/members/${nextMember.id}`}
            data-member
            style={memberVars(nextMember)}
            className='flex min-h-16 items-center justify-end gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-right shadow-poster'
          >
            <span className='flex min-w-0 flex-col'>
              <span className='text-xs text-text-muted'>다음 멤버</span>
              <span className='truncate font-heavy text-member-text'>{nextMember.nameKo}</span>
            </span>
            <span aria-hidden className='text-lg text-text-muted'>
              →
            </span>
          </Link>
        </nav>
      </div>
    </>
  );
}
