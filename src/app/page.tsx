import { MEMBERS } from '@/shared/constants';
import { SiteHeader } from '@/components';
import { HeroCollage, HeroMembers } from '@/features/home/ui';

const memberNames = MEMBERS.map(m => m.nameKo).join(' · ');

export default function Home() {
  return (
    <>
      <SiteHeader transparentOnTop />

      <section className='relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-24 sm:px-10'>
        <HeroCollage />

        <div className='pointer-events-none relative z-10 w-full max-w-2xl'>
          <p className='mb-3 w-fit text-xs font-bold tracking-[0.3em] text-text-muted sm:text-sm'>
            UNOFFICIAL FAN SITE
          </p>
          <h1 className='w-fit font-heavy text-[clamp(2.75rem,13vw,7rem)] leading-[0.95] tracking-[-0.03em]'>
            CAFE
            <br />
            CARTE
          </h1>
          <p className='mt-5 w-fit max-w-md text-sm text-text-muted sm:text-base'>
            Twillet Studio 소속 버추얼 그룹 Cafe Carte
            <br />
            <span className='text-text'>{memberNames}</span>
          </p>

          <div className='pointer-events-auto'>
            <HeroMembers />
          </div>
        </div>
      </section>
    </>
  );
}
