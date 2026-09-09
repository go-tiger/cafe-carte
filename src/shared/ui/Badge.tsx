import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, CSSProperties } from 'react';
import { cn, getContrastColor } from '@/shared/lib';
import { MEMBERS } from '@/shared/constants';

export const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold', {
  variants: {
    variant: {
      solid: 'bg-accent text-accent-ink',
      soft: 'bg-surface-2 text-text-muted',
      outline: 'border border-border text-text-muted',
    },
  },
  defaultVariants: {
    variant: 'soft',
  },
});

type BadgeProps = ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { member?: string };

export function Badge({ className, variant, member, style, ...props }: BadgeProps) {
  const memberColor = member ? MEMBERS.find(m => m.id === member)?.color : undefined;

  const memberStyle: CSSProperties | undefined = memberColor
    ? { backgroundColor: memberColor, color: getContrastColor(memberColor) }
    : undefined;

  return (
    <span
      className={cn(badgeVariants({ variant: memberColor ? undefined : variant }), className)}
      style={{ ...memberStyle, ...style }}
      {...props}
    />
  );
}
