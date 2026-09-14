'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const POLL_INTERVAL_MS = 30_000;

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

    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/live/${channelId}`);
        if (!res.ok) return;
        const data = (await res.json()) as ChzzkChannelStatus;
        if (!cancelled) setStatus(data);
      } catch {}
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [channelId]);

  return status;
}
