export const SITE_NAME = 'Cafe Carte 팬사이트';
export const SITE_ORIGIN = 'https://go-tiger.github.io';
export const SITE_DESCRIPTION =
  'Twillit Studio 소속 Cafe Carte(모코 파르페, 한서린, 댕키, 유우희, 에루 솔스티스) 비공식 팬사이트';

/** 페이지가 OG 를 지정하면 상위 값이 통째로 교체되므로 공통 필드를 함께 넘긴다 */
export const SITE_OPEN_GRAPH = {
  siteName: SITE_NAME,
  locale: 'ko_KR',
  type: 'website',
} as const;
