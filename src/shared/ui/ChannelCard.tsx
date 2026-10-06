import type { ComponentType, CSSProperties, SVGProps } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { BrandColor } from '@/shared/constants';

interface ChannelCardProps {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  brand: BrandColor;
  label: string;
  handle?: string;
}

export function ChannelCard({ href, icon: Icon, brand, label, handle }: ChannelCardProps) {
  const chipStyle = {
    backgroundColor: brand.color,
    color: brand.ink,
    '--yt-notch': brand.color,
  } as CSSProperties;

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
    >
      <span className='flex size-12 shrink-0 items-center justify-center rounded-xl' style={chipStyle}>
        <Icon className='size-6' />
      </span>
      <span className='min-w-0 flex-1'>
        <span className='block truncate font-heavy text-lg leading-tight'>{label}</span>
        {handle && <span className='block truncate text-sm text-text-muted'>{handle}</span>}
      </span>
      <ArrowUpRight
        aria-hidden
        className='size-5 shrink-0 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
      />
    </a>
  );
}
