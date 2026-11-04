import { siteOgImage } from '@/features/og';

export const dynamic = 'force-static';

export function GET() {
  return siteOgImage();
}
