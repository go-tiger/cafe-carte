import Image from 'next/image';
import type { Member } from '@/shared/constants';
import { MEMBER_DETAILS } from '@/shared/constants';
import { asset, memberVars } from '@/shared/lib';
import { LiveBadge } from './LiveBadge';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const chzzkUrl = MEMBER_DETAILS[member.id]?.links.chzzk;

  return (
    <div
      data-member
      style={memberVars(member)}
      className='flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-poster'
    >
      <div className='relative aspect-179/236 w-full' style={{ backgroundColor: member.color }}>
        <Image src={asset(member.avatar)} alt='' fill sizes='(max-width: 640px) 50vw, 20vw' className='object-cover' />
        <div className='absolute top-2 left-2'>
          <LiveBadge chzzkUrl={chzzkUrl} />
        </div>
      </div>
      <div className='flex flex-1 flex-col gap-1 p-3 min-[360px]:p-4'>
        <span className='font-heavy leading-tight text-member-text'>{member.nameKo}</span>
        <span className='text-xs text-text-muted'>{member.name}</span>
        <span className='mt-0.5 text-xs text-text-muted'>{member.position}</span>
      </div>
    </div>
  );
}
