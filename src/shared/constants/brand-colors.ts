export interface BrandColor {
  color: string;
  ink: string;
}

/** 각 플랫폼의 공식 브랜드 컬러. 공식 브랜드 가이드 기준. */
export const BRAND_COLORS = {
  navercafe: { color: '#03C75A', ink: '#ffffff' },
  youtube: { color: '#FF0000', ink: '#ffffff' },
  x: { color: '#000000', ink: '#ffffff' },
  chzzk: { color: '#000000', ink: '#00FFA3' },
} satisfies Record<string, BrandColor>;
