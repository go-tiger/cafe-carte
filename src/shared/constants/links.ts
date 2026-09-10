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
    brand: '#03C75A',
    ink: '#ffffff',
  },
  {
    id: 'youtube',
    label: '유튜브',
    handle: '@TWILLITSTUDIOofficial',
    href: 'https://www.youtube.com/@TWILLITSTUDIOofficial',
    brand: '#FF0033',
    ink: '#ffffff',
  },
  {
    id: 'x',
    label: 'X',
    handle: '@TWILLIT_studio_',
    href: 'https://x.com/TWILLIT_studio_',
    brand: '#000000',
    ink: '#ffffff',
  },
];
