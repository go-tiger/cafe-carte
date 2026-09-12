import Image from 'next/image';
import type { Member } from '@/shared/constants';
import { asset, cn } from '@/shared/lib';

interface MemberCardProps {
  member: Member;
  /** compact: 메인 미리보기용 (기본). detailed: /members 페이지용, 정보 섹션 포함 */
  variant?: 'compact' | 'detailed';
}

export function MemberCard({ member, variant = 'compact' }: MemberCardProps) {
  const detailed = variant === 'detailed';

  return (
    <div className='flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-poster'>
      <div className='relative aspect-179/236 w-full' style={{ backgroundColor: member.color }}>
        <Image
          src={asset(member.avatar)}
          alt={member.nameKo}
          fill
          sizes={detailed ? '(max-width: 640px) 100vw, 25vw' : '(max-width: 640px) 50vw, 20vw'}
          className='object-cover'
        />
      </div>
      <div className={cn('flex flex-1 flex-col gap-1', detailed ? 'p-5' : 'p-4')}>
        <span className={cn('font-heavy leading-tight', detailed ? 'text-xl' : '')} style={{ color: member.ink }}>
          {member.nameKo}
        </span>
        <span className='text-xs text-text-muted'>{member.name}</span>
        <span className='mt-0.5 text-xs text-text-muted'>{member.position}</span>
      </div>
    </div>
  );
}
