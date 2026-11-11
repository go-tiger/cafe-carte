import Image from 'next/image';
import Link from 'next/link';
import type { Member } from '@/shared/constants';
import { MEMBER_DETAILS } from '@/shared/constants';
import { asset, memberVars } from '@/shared/lib';
import { LiveBadge } from '@/shared/ui';

export function MemberMenuItem({ member }: { member: Member }) {
  const details = MEMBER_DETAILS[member.id];

  return (
    <Link
      href={`/members/${member.id}`}
      data-member
      style={memberVars(member)}
      className='group flex h-full items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-poster transition-transform hover:-translate-y-1 min-[360px]:gap-4 sm:gap-5 sm:p-4'
    >
      <span className='relative size-20 shrink-0 overflow-hidden rounded-xl bg-[color-mix(in_oklch,var(--m-color)_22%,white)] dark:bg-transparent min-[360px]:size-24 sm:size-32'>
        <Image
          src={asset(member.profile ?? member.avatar)}
          alt=''
          fill
          sizes='128px'
          className='object-cover mix-blend-multiply dark:mix-blend-normal'
        />
      </span>
      <span className='min-w-0 flex-1'>
        <span className='flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:flex-nowrap'>
          <span className='shrink-0 font-heavy leading-tight text-member-text min-[360px]:text-lg sm:text-xl'>
            {member.nameKo}
          </span>
          <LiveBadge chzzkUrl={details?.links.chzzk} />
          <span
            aria-hidden
            className='hidden min-w-2 flex-1 translate-y-[-0.2em] border-b-2 border-dotted border-border sm:block'
          />
          <span className='hidden text-right text-sm font-bold sm:inline'>{member.position}</span>
        </span>
        <span className='mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted'>
          {member.name}
          <span className='font-bold text-text sm:hidden'>{member.position}</span>
        </span>
        {details?.bio && <span className='mt-2 line-clamp-2 text-sm text-text-muted'>{details.bio}</span>}
      </span>
    </Link>
  );
}
