'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const POLL_INTERVAL_MS = 60_000;

interface ChzzkChannelStatus {
  channelId: string;
  channelName: string;
  channelImageUrl: string | null;
  openLive: boolean;
  followerCount: number;
  liveUrl: string;
}

export function getChzzkChannelId(chzzkUrl: string | undefined): string | null {
  if (!chzzkUrl) return null;
  const match = chzzkUrl.match(/chzzk\.naver\.com\/([^/?#]+)/);
  return match?.[1] ?? null;
}

export function useChzzkLive(channelId: string | null): ChzzkChannelStatus | null {
  const [status, setStatus] = useState<ChzzkChannelStatus | null>(null);

  useEffect(() => {
    if (!channelId) return;

    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/live/${channelId}`);
        if (!res.ok) return;
        const data = (await res.json()) as ChzzkChannelStatus;
        if (!cancelled) setStatus(data);
      } catch {}
    };

    const start = () => {
      if (interval) return;
      fetchStatus();
      interval = setInterval(fetchStatus, POLL_INTERVAL_MS);
    };

    const stop = () => {
      clearInterval(interval);
      interval = undefined;
    };

    const onVisibilityChange = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [channelId]);

  return status;
}
