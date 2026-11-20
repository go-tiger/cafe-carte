'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib';

const FOOTER_LINKS = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/credits', label: '크레딧' },
];

export function FooterNav() {
  const pathname = usePathname();

  return (
    <nav aria-label='사이트 정보' className='flex items-center gap-3 text-xs'>
      {FOOTER_LINKS.map((link, i) => {
        const active = pathname === link.href;
        return (
          <span key={link.href} className='contents'>
            {i > 0 && <span aria-hidden className='h-3 w-px bg-border' />}
            <Link
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'inline-flex h-8 items-center font-bold transition-colors hover:text-accent hover:underline',
                active ? 'text-accent' : 'text-text',
              )}
            >
              {link.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
