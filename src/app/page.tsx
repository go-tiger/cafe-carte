import { SiteHeader } from '@/components';
import { LatestCovers } from '@/features/covers';
import { Hero, MemberIntro, LinkHub } from '@/features/home';

export default function Home() {
  return (
    <>
      <SiteHeader transparentOnTop />
      <main id='main'>
        <Hero />
        <MemberIntro />
        <LatestCovers />
        <LinkHub />
      </main>
    </>
  );
}
