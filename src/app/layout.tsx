import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/shared/providers';
import { SiteFooter } from '@/components';
import { asset, cn } from '@/shared/lib';

const playfair = Playfair_Display({ weight: '700', subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: {
    default: 'Cafe Carte 팬사이트',
    template: '%s · Cafe Carte 팬사이트',
  },
  description: 'Twillit Studio 소속 Cafe Carte(모코 파르페, 한서린, 댕키, 유우희, 에루 솔스티스) 비공식 팬사이트',
  icons: { icon: asset('/logo.png') },
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
