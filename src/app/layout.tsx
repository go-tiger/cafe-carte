import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/shared/providers';
import { SiteFooter } from '@/components';
import { SITE_DESCRIPTION, SITE_NAME, SITE_OPEN_GRAPH, SITE_ORIGIN } from '@/shared/constants';
import { asset, BASE_PATH, cn } from '@/shared/lib';

const playfair = Playfair_Display({ weight: '700', subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_ORIGIN}${BASE_PATH}/`),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: asset('/logo.png') },
  openGraph: {
    ...SITE_OPEN_GRAPH,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Cafe Carte' }],
  },
  twitter: { card: 'summary' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' className={cn('h-full antialiased', playfair.variable)} suppressHydrationWarning>
      <body className='flex min-h-full flex-col bg-bg text-text'>
        <ThemeProvider>
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
