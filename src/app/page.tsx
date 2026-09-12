import { SiteHeader } from '@/components';
import { Hero, MemberIntro, LinkHub } from '@/features/home';

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
