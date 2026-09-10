'use client';

import type { ComponentProps } from 'react';
import { useSyncExternalStore } from 'react';
import { useInView } from '@/shared/lib/useInView';
import { cn } from '@/shared/lib';

const noopSubscribe = () => () => {};

export function Reveal({ className, children, ...props }: ComponentProps<'div'>) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  return (
    <div
      ref={ref}
      data-reveal={mounted ? '' : undefined}
      data-in-view={inView ? '' : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </div>
  );
}
