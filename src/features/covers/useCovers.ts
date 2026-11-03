'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type CoverKind = 'cover' | 'short';

export interface CoverVideo {
  videoId: string;
  kind: CoverKind;
  title: string;
  channelTitle: string;
  memberId: string | null;
  publishedAt: string;
  durationSec: number;
  thumbnailUrl: string;
}

type CoversState =
  | { status: 'loading' }
  | { status: 'error'; retry: () => void }
  | { status: 'ready'; items: CoverVideo[]; updatedAt: string | null };

export function useCovers(): CoversState {
  const [state, setState] = useState<CoversState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/covers`)
      .then(res =>
        res.ok
          ? (res.json() as Promise<{ items: CoverVideo[]; updatedAt: string | null }>)
          : Promise.reject(res.status),
      )
      .then(data => !cancelled && setState({ status: 'ready', items: data.items, updatedAt: data.updatedAt }))
      .catch(
        () =>
          !cancelled &&
          setState({
            status: 'error',
            retry: () => {
              setState({ status: 'loading' });
              setAttempt(n => n + 1);
            },
          }),
      );

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return state;
}
