import type { ComponentType, CSSProperties, SVGProps } from 'react';
import { OFFICIAL_LINKS, type OfficialLinkId } from '@/shared/constants';
import { Reveal } from '@/shared/ui';
import { NaverCafeIcon, YoutubeIcon, XIcon } from '@/shared/ui/icons';

const ICONS: Record<OfficialLinkId, ComponentType<SVGProps<SVGSVGElement>>> = {
  navercafe: NaverCafeIcon,
  youtube: YoutubeIcon,
  x: XIcon,
};

export function LinkHub() {
  return (
    <section className='border-t border-border bg-surface-2 px-6 py-20 sm:px-10'>
      <Reveal className='mx-auto max-w-5xl'>
        <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>OFFICIAL</p>
        <h2 className='mt-2 font-heavy text-3xl tracking-tight sm:text-4xl'>공식 채널</h2>

        <ul className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {OFFICIAL_LINKS.map(link => {
            const Icon = ICONS[link.id];
            const chipStyle: CSSProperties = {
              backgroundColor: link.brand,
              color: link.ink,
              ['--yt-notch' as string]: link.brand,
            };
            return (
              <li key={link.id}>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
                >
                  <span className='flex size-12 shrink-0 items-center justify-center rounded-xl' style={chipStyle}>
                    <Icon className='size-6' />
                  </span>
                  <span className='min-w-0 flex-1'>
                    <span className='block font-heavy text-lg leading-tight'>{link.label}</span>
                    <span className='block truncate text-sm text-text-muted'>{link.handle}</span>
                  </span>
                  <span
                    aria-hidden
                    className='text-lg text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
                  >
                    ↗
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
