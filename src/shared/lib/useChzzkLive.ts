'use client';

import { useCallback, useSyncExternalStore } from 'react';

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

interface ChannelEntry {
  status: ChzzkChannelStatus | null;
  listeners: Set<() => void>;
  interval?: ReturnType<typeof setInterval>;
  onVisibilityChange?: () => void;
}

const channels = new Map<string, ChannelEntry>();

function getEntry(channelId: string): ChannelEntry {
  let entry = channels.get(channelId);
  if (!entry) {
    entry = { status: null, listeners: new Set() };
    channels.set(channelId, entry);
  }
  return entry;
}

async function fetchStatus(channelId: string, entry: ChannelEntry) {
  try {
    const res = await fetch(`${API_URL}/live/${channelId}`);
    if (!res.ok) return;
    entry.status = (await res.json()) as ChzzkChannelStatus;
    entry.listeners.forEach(listener => listener());
  } catch {}
}

function startPolling(channelId: string, entry: ChannelEntry) {
  const start = () => {
    if (entry.interval) return;
    fetchStatus(channelId, entry);
    entry.interval = setInterval(() => fetchStatus(channelId, entry), POLL_INTERVAL_MS);
  };
  const stop = () => {
    clearInterval(entry.interval);
    entry.interval = undefined;
  };

  entry.onVisibilityChange = () => (document.hidden ? stop() : start());
  if (!document.hidden) start();
  document.addEventListener('visibilitychange', entry.onVisibilityChange);
}

function stopPolling(entry: ChannelEntry) {
  clearInterval(entry.interval);
  entry.interval = undefined;
  if (entry.onVisibilityChange) document.removeEventListener('visibilitychange', entry.onVisibilityChange);
}

export function useChzzkLive(channelId: string | null): ChzzkChannelStatus | null {
  const subscribe = useCallback(
    (listener: () => void) => {
      if (!channelId) return () => {};
      const entry = getEntry(channelId);
      if (entry.listeners.size === 0) startPolling(channelId, entry);
      entry.listeners.add(listener);
      return () => {
        entry.listeners.delete(listener);
        if (entry.listeners.size === 0) stopPolling(entry);
      };
    },
    [channelId],
  );

  return useSyncExternalStore(
    subscribe,
    () => (channelId ? getEntry(channelId).status : null),
    () => null,
  );
}
