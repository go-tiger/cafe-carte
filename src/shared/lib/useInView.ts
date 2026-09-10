'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  once?: boolean;
  rootMargin?: string;
};

export function useInView<T extends HTMLElement = HTMLElement>({
  once = true,
  rootMargin = '0px 0px -10% 0px',
}: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return { ref, inView };
}
