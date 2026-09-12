import { BRAND_COLORS } from './brand-colors';

export type OfficialLinkId = 'navercafe' | 'youtube' | 'x';

export interface OfficialLink {
  id: OfficialLinkId;
  label: string;
  handle: string;
  href: string;
  brand: string;
  ink: string;
}

export const OFFICIAL_LINKS: OfficialLink[] = [
  {
    id: 'navercafe',
    label: '네이버 카페',
    handle: 'twillitstudio',
    href: 'https://cafe.naver.com/twillitstudio',
    brand: BRAND_COLORS.navercafe.color,
    ink: BRAND_COLORS.navercafe.ink,
  },
  {
    id: 'youtube',
    label: '유튜브',
    handle: '@TWILLITSTUDIOofficial',
    href: 'https://www.youtube.com/@TWILLITSTUDIOofficial',
    brand: BRAND_COLORS.youtube.color,
    ink: BRAND_COLORS.youtube.ink,
  },
  {
    id: 'x',
    label: 'X',
    handle: '@TWILLIT_studio_',
    href: 'https://x.com/TWILLIT_studio_',
    brand: BRAND_COLORS.x.color,
    ink: BRAND_COLORS.x.ink,
  },
];
