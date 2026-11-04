'use client';

import Link from 'next/link';
import { SiteHeader } from '@/components';
import { buttonVariants } from '@/shared/ui';

export default function Error({ retry }: { retry: () => void }) {
  return (
    <>
      <SiteHeader />

      <main
        id='main'
        className='flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-20 text-center sm:px-10'
      >
        <p className='text-xs font-bold tracking-eyebrow text-text-muted'>SOMETHING SPILLED</p>
        <h1 className='mt-2 font-display font-heavy text-5xl tracking-tight sm:text-6xl'>앗, 쏟았어요</h1>
        <p className='mt-4 max-w-md text-text-muted'>
          페이지를 준비하다 문제가 생겼어요.
          <br />
          다시 시도해도 같다면 잠시 후에 다시 찾아와 주세요.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          <button type='button' onClick={retry} className={buttonVariants({ size: 'lg' })}>
            다시 시도
          </button>
          <Link href='/' className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            홈으로
          </Link>
        </div>
      </main>
    </>
  );
}
