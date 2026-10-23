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

type CoversState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; items: CoverVideo[] };

export function useCovers(): CoversState {
  const [state, setState] = useState<CoversState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/covers`)
      .then(res => (res.ok ? (res.json() as Promise<{ items: CoverVideo[] }>) : Promise.reject(res.status)))
      .then(data => !cancelled && setState({ status: 'ready', items: data.items }))
      .catch(() => !cancelled && setState({ status: 'error' }));

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
