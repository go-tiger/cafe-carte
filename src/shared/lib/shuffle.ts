export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const randomInRange = (min: number, max: number): number => Math.random() * (max - min) + min;

export function reshuffle<T>(items: readonly T[]): T[] {
  if (items.length < 2) return [...items];
  let next = shuffle(items);
  while (next.every((item, i) => item === items[i])) next = shuffle(items);
  return next;
}
