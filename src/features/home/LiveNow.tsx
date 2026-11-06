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
        className='group inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pr-4 pl-1.5 shadow-poster transition-transform hover:-translate-y-0.5'
      >
        <span
          className='relative size-9 shrink-0 overflow-hidden rounded-full'
          style={{ backgroundColor: member.color }}
        >
          <Image src={asset(member.avatar)} alt='' fill sizes='36px' className='object-cover' />
        </span>
        <LivePill />
        <span className='font-heavy text-sm text-member-text'>{member.nameKo}</span>
        <ArrowUpRight aria-hidden className='size-4 shrink-0 text-text-muted' />
      </a>
    </li>
  );
}

export function LiveNow() {
  return (
    <ul className='mt-6 flex max-w-xl flex-wrap gap-2 empty:hidden'>
      {MEMBERS.map(m => (
        <LiveMember key={m.id} member={m} />
      ))}
    </ul>
  );
}
