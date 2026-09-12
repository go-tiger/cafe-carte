import { MEMBERS } from '@/shared/constants';
import { HeroCollage } from './HeroCollage';
import { HeroMembers } from './HeroMembers';

const memberNames = MEMBERS.map(m => m.nameKo).join(' · ');

export function Hero() {
  return (
    <section className='relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-24 pb-16 sm:px-10 lg:h-screen'>
      <div className='relative mx-auto w-full max-w-7xl'>
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
      </div>
    </section>
  );
}
