import { SiteHeader } from '@/components';
import { Hero, LinkHub } from '@/features/home/ui';

export default function Home() {
  return (
    <>
      <SiteHeader transparentOnTop />
      <Hero />
      <LinkHub />
    </>
  );
}
