import type { SVGProps } from 'react';

/** 팬딩 로고. 상표권은 팬딩 소유. */
export function FandingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 9 237 237'
      fill='none'
      stroke='currentColor'
      strokeWidth={36}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden
      {...props}
    >
      <path d='M17.5 227V82a54.75 54.75 0 0 1 109.5 0v36M17.5 118H72m55 0h36a54.75 54.75 0 0 1 0 109.5h-35.5V191' />
    </svg>
  );
}
