import { SiteHeader } from '@/components';
import { Hero, MemberIntro, LinkHub } from '@/features/home/ui';

export default function Home() {
  return (
    <>
      <SiteHeader transparentOnTop />
      <Hero />
      <MemberIntro />
      <LinkHub />
    </>
  );
}
