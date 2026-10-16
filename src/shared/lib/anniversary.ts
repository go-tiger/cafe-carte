import { MEMBER_DETAILS, MEMBERS, type Member } from '@/shared/constants';

/** 기념일 며칠 전부터 배너에 보여줄지 */
export const ANNIVERSARY_NOTICE_DAYS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;

export interface AnniversaryEvent {
  member: Member;
  kind: 'anniversary' | 'debut';
  label: string;
  /** 0 이면 당일 */
  daysLeft: number;
}

/** 한국 시간 기준 날짜를 'YYYY-MM-DD' 로 돌려준다 */
export function seoulDateKey(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now);
}

function daysBetween(from: [number, number, number], to: [number, number, number]): number {
  return Math.round((Date.UTC(to[0], to[1] - 1, to[2]) - Date.UTC(from[0], from[1] - 1, from[2])) / DAY_MS);
}

/** 오늘부터 ANNIVERSARY_NOTICE_DAYS 일 안에 돌아오는 기념일을 가까운 순으로 돌려준다 */
export function getAnniversaries(dateKey: string): AnniversaryEvent[] {
  const [year, month, day] = dateKey.split('-').map(Number);
  const today: [number, number, number] = [year, month, day];

  const nextOccurrence = (m: number, d: number) => {
    const thisYear = daysBetween(today, [year, m, d]);
    return thisYear >= 0
      ? { year, daysLeft: thisYear }
      : { year: year + 1, daysLeft: daysBetween(today, [year + 1, m, d]) };
  };

  const events = MEMBERS.flatMap(member => {
    const detail = MEMBER_DETAILS[member.id];
    if (!detail) return [];

    const found: AnniversaryEvent[] = [];

    const [, m, d] = detail.anniversary.match(/(\d+)월\s*(\d+)일/)?.map(Number) ?? [];
    if (m && d) {
      const { daysLeft } = nextOccurrence(m, d);
      found.push({ member, kind: 'anniversary', label: detail.anniversaryLabel ?? '생일', daysLeft });
    }

    const [debutYear, debutMonth, debutDay] = detail.debutDate.split('.').map(Number);
    const next = nextOccurrence(debutMonth, debutDay);
    const years = next.year - debutYear;
    if (years >= 1) {
      found.push({ member, kind: 'debut', label: `데뷔 ${years}주년`, daysLeft: next.daysLeft });
    }

    return found;
  });

  return events.filter(e => e.daysLeft <= ANNIVERSARY_NOTICE_DAYS).sort((a, b) => a.daysLeft - b.daysLeft);
}
