import Image from 'next/image';
import type { Member } from '@/shared/constants';
import { asset } from '@/shared/lib';

interface MemberCardProps {
  member: Member;
  /** compact: 메인 미리보기용 (기본). detailed: /members 페이지용, 정보 섹션 포함 */
  variant?: 'compact' | 'detailed';
}

export function MemberCard({ member, variant = 'compact' }: MemberCardProps) {
  const detailed = variant === 'detailed';

  if (detailed) {
    return (
      <div className='group relative aspect-179/236 w-full overflow-hidden rounded-2xl border border-border shadow-poster'>
        <div className='absolute inset-0' style={{ backgroundColor: member.color }}>
          <Image
            src={asset(member.avatar)}
            alt={member.nameKo}
            fill
            sizes='(max-width: 640px) 100vw, 20vw'
            className='object-cover'
          />
        </div>

        <div className='absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/10 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <span className='font-heavy text-xl leading-tight text-white'>{member.nameKo}</span>
          <span className='text-xs text-white/70'>{member.name}</span>
          <span className='mt-0.5 text-xs text-white/70'>{member.position}</span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-poster'>
      <div className='relative aspect-179/236 w-full' style={{ backgroundColor: member.color }}>
        <Image
          src={asset(member.avatar)}
          alt={member.nameKo}
          fill
          sizes='(max-width: 640px) 50vw, 20vw'
          className='object-cover'
        />
      </div>
      <div className='flex flex-1 flex-col gap-1 p-4'>
        <span className='font-heavy leading-tight' style={{ color: member.ink }}>
          {member.nameKo}
        </span>
        <span className='text-xs text-text-muted'>{member.name}</span>
        <span className='mt-0.5 text-xs text-text-muted'>{member.position}</span>
      </div>
    </div>
  );
}
