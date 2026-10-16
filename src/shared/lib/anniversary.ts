import { MEMBER_DETAILS, MEMBERS, type Member } from '@/shared/constants';

export interface AnniversaryEvent {
  member: Member;
  kind: 'anniversary' | 'debut';
  label: string;
}

/** 한국 시간 기준 날짜를 'YYYY-MM-DD' 로 돌려준다 */
export function seoulDateKey(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now);
}

export function getAnniversaries(dateKey: string): AnniversaryEvent[] {
  const [year, month, day] = dateKey.split('-').map(Number);

  return MEMBERS.flatMap(member => {
    const detail = MEMBER_DETAILS[member.id];
    if (!detail) return [];

    const events: AnniversaryEvent[] = [];

    const [, m, d] = detail.anniversary.match(/(\d+)월\s*(\d+)일/)?.map(Number) ?? [];
    if (m === month && d === day) {
      events.push({ member, kind: 'anniversary', label: detail.anniversaryLabel ?? '생일' });
    }

    const [debutYear, debutMonth, debutDay] = detail.debutDate.split('.').map(Number);
    const years = year - debutYear;
    if (years >= 1 && debutMonth === month && debutDay === day) {
      events.push({ member, kind: 'debut', label: `데뷔 ${years}주년` });
    }

    return events;
  });
}
