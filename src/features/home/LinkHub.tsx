import type { ComponentType, SVGProps } from 'react';
import { OFFICIAL_LINKS, type OfficialLinkId } from '@/shared/constants';
import { ChannelCard, Reveal } from '@/shared/ui';
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
        <p className='text-xs font-bold tracking-eyebrow text-text-muted'>OFFICIAL</p>
        <h2 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>공식 채널</h2>

        <ul className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {OFFICIAL_LINKS.map(link => (
            <li key={link.id}>
              <ChannelCard
                href={link.href}
                icon={ICONS[link.id]}
                brand={{ color: link.brand, ink: link.ink }}
                label={link.label}
                handle={link.handle}
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
