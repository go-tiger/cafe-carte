'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const CACHE_TTL_MS = 5 * 60_000;

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

interface CoversData {
  items: CoverVideo[];
  updatedAt: string | null;
}

let cached: { data: CoversData; expiresAt: number } | null = null;
let inflight: Promise<CoversData> | null = null;

function readCache(): CoversData | null {
  return cached && Date.now() < cached.expiresAt ? cached.data : null;
}

function loadCovers(): Promise<CoversData> {
  inflight ??= fetch(`${API_URL}/covers`)
    .then(res => (res.ok ? (res.json() as Promise<CoversData>) : Promise.reject(res.status)))
    .then(data => {
      cached = { data, expiresAt: Date.now() + CACHE_TTL_MS };
      return data;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function useCovers(): CoversState {
  const [state, setState] = useState<CoversState>(() => {
    const data = readCache();
    return data ? { status: 'ready', ...data } : { status: 'loading' };
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (readCache()) return;

    let cancelled = false;

    loadCovers()
      .then(data => !cancelled && setState({ status: 'ready', ...data }))
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
