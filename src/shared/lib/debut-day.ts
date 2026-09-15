export function debutDay(debutDate: string): string {
  const [y, m, d] = debutDate.split('.').map(Number);
  if (!y || !m || !d) return '—';

  const debut = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  debut.setHours(0, 0, 0, 0);

  const diffDays = Math.round((today.getTime() - debut.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? `D+${diffDays}` : `D${diffDays}`;
}
