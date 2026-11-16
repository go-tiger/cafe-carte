import Link from 'next/link';
import { cn } from '@/shared/lib';

const SINCE = 2026;
const YEAR = new Date().getFullYear();
const YEARS = YEAR > SINCE ? `${SINCE}–${YEAR}` : SINCE;
const FOOTER_LINK = 'inline-flex h-8 items-center text-text transition-colors hover:text-accent hover:underline';

export function SiteFooter() {

  return (
    <footer className='border-t border-border px-6 py-16 sm:px-10'>
      <div className='mx-auto flex max-w-5xl flex-col items-center gap-4 text-center'>
        <nav aria-label='사이트 정보' className='flex items-center gap-3 text-xs'>
          <Link href='/privacy' className={cn(FOOTER_LINK, 'font-bold')}>
            개인정보처리방침
          </Link>
          <span aria-hidden className='h-3 w-px bg-border' />
          <Link href='/credits' className={cn(FOOTER_LINK, 'font-bold')}>
            크레딧
          </Link>
        </nav>
        <p className='text-xs leading-relaxed text-text-muted'>
          비공식 팬사이트입니다. Twillit Studio 및 Cafe Carte 공식과 무관하며, 모든 캐릭터, 이미지, 상표의 권리는
          <br className='hidden sm:block' /> 각 원저작권자에게 있습니다.
        </p>
        <p className='text-xs text-text-muted'>Cafe Carte / Twillit Studio, &copy; {YEARS} go-tiger</p>
      </div>
    </footer>
  );
}
