'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/cn';
import { asset } from '@/lib/asset';

export function SiteHeader({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);

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
      <nav className='mx-auto flex h-16 max-w-5xl items-center px-4'>
        <Link href='/' className='flex shrink-0 items-center gap-2'>
          <Image src={asset('/logo.png')} alt='Cafe Carte' width={32} height={32} className='rounded-full' priority />
          <span className={cn('font-heavy tracking-tight transition-opacity', scrolled ? 'opacity-100' : 'opacity-0')}>
            Cafe Carte
          </span>
        </Link>
        <div className='ml-auto'>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
