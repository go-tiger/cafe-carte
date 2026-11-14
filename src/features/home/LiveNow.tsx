'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { MEMBER_DETAILS, MEMBERS, type Member } from '@/shared/constants';
import { asset, getChzzkChannelId, memberVars, useChzzkLive } from '@/shared/lib';
import { LivePill } from '@/shared/ui';

function LiveMember({ member }: { member: Member }) {
  const status = useChzzkLive(getChzzkChannelId(MEMBER_DETAILS[member.id]?.links.chzzk));

  if (!status?.openLive) return null;

  return (
    <li>
      <a
        href={status.liveUrl}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`${member.nameKo} 치지직 라이브 방송 보기`}
        data-member
        style={memberVars(member)}
        className='group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pr-4 pl-1.5 shadow-poster transition-transform hover:-translate-y-0.5 group-has-[li:nth-of-type(3)]/live:min-h-10 group-has-[li:nth-of-type(3)]/live:gap-2 group-has-[li:nth-of-type(3)]/live:py-1 group-has-[li:nth-of-type(3)]/live:pr-3.5 group-has-[li:nth-of-type(3)]/live:pl-1'
      >
        <span
          className='relative size-9 shrink-0 overflow-hidden rounded-full group-has-[li:nth-of-type(3)]/live:size-8'
          style={{ backgroundColor: member.color }}
        >
          <Image src={asset(member.avatar)} alt='' fill sizes='36px' className='object-cover' />
        </span>
        <span className='group-has-[li:nth-of-type(3)]/live:hidden'>
          <LivePill />
        </span>
        <span className='font-heavy text-sm text-member-text'>{member.nameKo}</span>
        <ArrowUpRight
          aria-hidden
          className='size-4 shrink-0 text-text-muted group-has-[li:nth-of-type(3)]/live:hidden'
        />
      </a>
    </li>
  );
}

export function LiveNow() {
  return (
    <div className='group/live mt-6 hidden max-w-xl flex-wrap items-center gap-2 has-[li]:flex'>
      <span className='hidden group-has-[li:nth-of-type(3)]/live:inline-flex'>
        <LivePill />
      </span>
      <ul className='contents'>
        {MEMBERS.map(m => (
          <LiveMember key={m.id} member={m} />
        ))}
      </ul>
    </div>
  );
}
