import Link from 'next/link';
import { SiteHeader } from '@/components';
import { buttonVariants } from '@/shared/ui';

export default function NotFound() {
  return (
    <>
      <SiteHeader />

      <main className='flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-20 text-center sm:px-10'>
        <p className='text-xs font-bold tracking-eyebrow text-text-muted'>NOT ON THE MENU</p>
        <h1 className='mt-2 font-display font-heavy text-7xl tracking-tight sm:text-8xl'>404</h1>
        <p className='mt-4 max-w-sm text-text-muted'>
          주문하신 페이지를 메뉴판에서 찾을 수 없어요. 주소가 바뀌었거나 아직 준비 중인 메뉴일 수 있어요.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          <Link href='/' className={buttonVariants({ size: 'lg' })}>
            홈으로
          </Link>
          <Link href='/members' className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            멤버 보러 가기
          </Link>
        </div>
      </main>
    </>
  );
}
