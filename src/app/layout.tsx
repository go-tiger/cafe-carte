import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/shared/providers';
import { SiteFooter } from '@/components';

export const metadata: Metadata = {
  title: {
    default: 'Cafe Carte 팬사이트',
    template: '%s · Cafe Carte 팬사이트',
  },
  description: 'Twillet Studio 소속 Cafe Carte(모코 파르페, 한서린, 댕키, 유우희, 에루 솔스티스) 비공식 팬사이트',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='ko' className='h-full antialiased' suppressHydrationWarning>
      <body className='flex min-h-full flex-col bg-bg text-text'>
        <ThemeProvider>
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
