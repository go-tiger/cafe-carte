import type { SVGProps } from 'react';

/** 네이버 카페 로고. 상표권은 NAVER Corp. 소유. */
export function NaverCafeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 32 32' fill='currentColor' aria-hidden {...props}>
      <path d='M3 12v10l1 1v1l4 4h1l1 1h8l2-2h1l4-5h3l2-2v-5l-1-1v-1h-1l-1-1z' />
      <path d='M22 2h-9l-1 1h-1l-2 2v2l-1 1v2h8l1-1h1l3-3V5l1-1z' opacity='0.65' />
    </svg>
  );
}
