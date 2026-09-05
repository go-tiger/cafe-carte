import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { themeInitScript } from '@/components/ui/ThemeToggle';

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
        <Script id='theme-init' strategy='beforeInteractive'>
          {themeInitScript}
        </Script>
        {children}
        <footer className='border-t border-border py-10 text-center text-xs text-text-muted'>
          비공식 팬사이트 · Cafe Carte / Twillet Studio
        </footer>
      </body>
    </html>
  );
}
