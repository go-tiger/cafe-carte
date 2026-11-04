import { memberOgImage } from '@/features/og';
import { MEMBERS } from '@/shared/constants';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return MEMBERS.map(m => ({ file: `${m.id}.png` }));
}

export async function GET(_: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const member = MEMBERS.find(m => `${m.id}.png` === file);
  if (!member) return new Response(null, { status: 404 });
  return memberOgImage(member);
}
