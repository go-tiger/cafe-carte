'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/shared/ui';
import { cn, asset } from '@/shared/lib';

const NAV_LINKS = [
  { href: '/members', label: 'MEMBERS' },
  { href: '/credits', label: 'CREDITS' },
];

export function SiteHeader({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const pathname = usePathname();

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparentOnTop]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled ? 'border-b border-border bg-bg/80 backdrop-blur' : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className='mx-auto flex h-16 max-w-5xl items-center gap-6 px-4'>
        <Link href='/' className='flex shrink-0 items-center gap-2'>
          <Image src={asset('/logo.png')} alt='Cafe Carte' width={32} height={32} className='rounded-full' priority />
          <span className='font-heavy tracking-tight'>Cafe Carte</span>
        </Link>

        <ul className='flex items-center gap-5'>
          {NAV_LINKS.map(link => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-xs font-bold tracking-[0.15em] transition-colors',
                    active ? 'text-accent' : 'text-text-muted hover:text-text',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className='ml-auto'>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
