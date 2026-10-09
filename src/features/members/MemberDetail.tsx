import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';
import type { ComponentType, ReactNode, SVGProps } from 'react';
import type { Member } from '@/shared/constants';
import { MEMBER_DETAILS, BRAND_COLORS } from '@/shared/constants';
import { asset, memberVars } from '@/shared/lib';
import { ChannelCard, DebutCounter, Emoji, LiveBadge } from '@/shared/ui';
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

const TAG_LABELS = {
  unified: '통합 태그',
  clip: '클립 태그',
  art: '팬아트 태그',
} as const;

interface MemberDetailProps {
  member: Member;
  prevMember: Member;
  nextMember: Member;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className='flex items-center gap-3 font-display text-lg text-accent'>
      <span aria-hidden className='h-px flex-1 bg-border' />
      {children}
      <span aria-hidden className='h-px flex-1 bg-border' />
    </h2>
  );
}

function ProfileRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className='flex items-baseline gap-2'>
      <dt className='shrink-0 text-sm text-text-muted'>{label}</dt>
      <span aria-hidden className='min-w-4 flex-1 border-b-2 border-dotted border-border' />
      <dd className='text-right font-heavy'>{children}</dd>
    </div>
  );
}

export function MemberDetail({ member, prevMember, nextMember }: MemberDetailProps) {
  const detail = MEMBER_DETAILS[member.id];
  const [fanName, fanNameNote] = detail?.fanName.split(/ (?=\()/) ?? [];

  return (
    <>
      <div className='border-b border-border px-6 pt-32 pb-10 sm:px-10' style={{ backgroundColor: member.color }}>
        <div className='mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-end'>
          <div className='relative aspect-179/236 w-56 shrink-0 self-center overflow-hidden rounded-2xl border border-border shadow-poster sm:w-72 sm:self-auto'>
            <Image
              src={asset(member.avatar)}
              alt={member.nameKo}
              fill
              sizes='288px'
              priority
              className='object-cover'
            />
          </div>

          <div className='flex flex-col gap-3 pb-2' style={{ color: member.ink }}>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='rounded-full border border-current px-3 py-1 text-xs font-bold tracking-widest'>
                {member.position}
              </span>
              <LiveBadge chzzkUrl={detail?.links.chzzk} asLink />
            </div>
            <h1 className='font-display font-heavy text-5xl tracking-tight sm:text-6xl'>{member.nameKo}</h1>
            <p className='font-display text-xl'>{member.name}</p>
            <p className='max-w-md leading-relaxed'>{detail?.bio ?? '소개 글이 등록되어 있지 않습니다.'}</p>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-5xl px-6 sm:px-10'>
        <article className='mt-10 overflow-hidden rounded-2xl border border-border bg-surface shadow-poster'>
          {detail && (
            <div className='grid gap-10 p-6 sm:p-10 lg:grid-cols-2'>
              <section className='flex flex-col gap-4'>
                <SectionTitle>Profile</SectionTitle>
                <dl className='flex flex-col gap-3'>
                  <ProfileRow label='나이'>{detail.age}</ProfileRow>
                  <ProfileRow label={detail.anniversaryLabel ?? '생일'}>{detail.anniversary}</ProfileRow>
                  <ProfileRow label='데뷔일'>
                    <span className='inline-flex flex-wrap items-center justify-end gap-2'>
                      {detail.debutDate}
                      <DebutCounter
                        debutDate={detail.debutDate}
                        color={member.color}
                        ink={member.ink}
                        className='px-2.5 py-0.5 text-sm'
                      />
                    </span>
                  </ProfileRow>
                  <ProfileRow label='팬네임'>
                    {fanName}
                    {fanNameNote && <span className='block text-sm font-normal text-text-muted'>{fanNameNote}</span>}
                  </ProfileRow>
                  <ProfileRow label='오시마크'>
                    <Emoji>{detail.mark}</Emoji>
                  </ProfileRow>
                  {(Object.keys(TAG_LABELS) as (keyof typeof TAG_LABELS)[]).map(key => (
                    <ProfileRow key={key} label={TAG_LABELS[key]}>
                      <a
                        href={`https://x.com/hashtag/${encodeURIComponent(detail.tags[key].replace(/^#/, ''))}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='-my-3 inline-block py-3 font-bold text-accent underline-offset-4 hover:underline'
                      >
                        {detail.tags[key]}
                      </a>
                    </ProfileRow>
                  ))}
                </dl>
              </section>

              <section className='flex flex-col gap-4'>
                <SectionTitle>Channels</SectionTitle>
                <ul className='flex flex-col gap-3'>
                  {detail.links.chzzk && (
                    <li>
                      <ChannelCard
                        href={detail.links.chzzk}
                        icon={SNS_ICONS.chzzk}
                        brand={BRAND_COLORS.chzzk}
                        label={SNS_LABELS.chzzk}
                      />
                    </li>
                  )}
                  {detail.links.youtube?.map(yt => (
                    <li key={yt.url}>
                      <ChannelCard
                        href={yt.url}
                        icon={SNS_ICONS.youtube}
                        brand={BRAND_COLORS.youtube}
                        label={`${SNS_LABELS.youtube} · ${yt.label}`}
                      />
                    </li>
                  ))}
                  {detail.links.x && (
                    <li>
                      <ChannelCard
                        href={detail.links.x}
                        icon={SNS_ICONS.x}
                        brand={BRAND_COLORS.x}
                        label={SNS_LABELS.x}
                      />
                    </li>
                  )}
                </ul>
              </section>
            </div>
          )}

          <nav
            aria-label='멤버 이동'
            className='flex items-center gap-1 border-t border-border bg-surface-2 px-2 py-3 sm:gap-2 sm:px-10'
          >
            <Link
              href={`/members/${prevMember.id}`}
              data-member
              style={memberVars(prevMember)}
              className='flex min-h-14 min-w-0 flex-1 items-center gap-2 rounded-xl px-1 transition-colors hover:bg-border/50 sm:gap-3 sm:px-2'
            >
              <ArrowLeft aria-hidden className='size-5 shrink-0 text-text-muted' />
              <span className='flex min-w-0 flex-col'>
                <span className='text-xs text-text-muted'>이전 멤버</span>
                <span className='font-heavy leading-tight text-member-text sm:truncate'>{prevMember.nameKo}</span>
              </span>
            </Link>
            <span aria-hidden className='h-8 w-px shrink-0 bg-border' />
            <Link
              href='/members'
              aria-label='전체 멤버'
              className='flex min-h-14 shrink-0 items-center gap-2 rounded-xl px-2.5 text-sm font-bold text-text-muted transition-colors hover:bg-border/50 hover:text-text'
            >
              <LayoutGrid aria-hidden className='size-5' />
              <span className='hidden sm:inline'>전체 멤버</span>
            </Link>
            <span aria-hidden className='h-8 w-px shrink-0 bg-border' />
            <Link
              href={`/members/${nextMember.id}`}
              data-member
              style={memberVars(nextMember)}
              className='flex min-h-14 min-w-0 flex-1 items-center justify-end gap-2 rounded-xl px-1 text-right transition-colors hover:bg-border/50 sm:gap-3 sm:px-2'
            >
              <span className='flex min-w-0 flex-col'>
                <span className='text-xs text-text-muted'>다음 멤버</span>
                <span className='font-heavy leading-tight text-member-text sm:truncate'>{nextMember.nameKo}</span>
              </span>
              <ArrowRight aria-hidden className='size-5 shrink-0 text-text-muted' />
            </Link>
          </nav>
        </article>
      </div>
    </>
  );
}
