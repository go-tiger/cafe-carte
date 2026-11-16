import { MEMBERS } from '@/shared/constants';
import { HeroCollage } from './HeroCollage';
import { HeroMembers } from './HeroMembers';
import { LiveNow } from './LiveNow';

const memberNames = MEMBERS.map(m => m.nameKo).join(' · ');

export function Hero() {
  return (
    <section className='relative flex flex-col justify-start overflow-hidden px-4 pt-28 pb-16 lg:justify-center lg:pt-32 lg:pb-20'>
      <div className='relative mx-auto w-full max-w-5xl lg:flex lg:min-h-124 lg:items-center'>
        <HeroCollage />

        <div className='pointer-events-none relative z-10 w-full max-w-2xl lg:max-w-[min(42rem,calc(100%-min(42vw,35rem)-2.5rem))]'>
          <p className='mb-3 w-fit text-xs font-bold tracking-eyebrow text-text-muted sm:text-sm'>
            UNOFFICIAL FAN SITE
          </p>
          <h1 className='w-fit font-display font-heavy text-[clamp(2.75rem,13vw,7rem)] leading-[0.95] tracking-[-0.03em]'>
            CAFE
            <br />
            CARTE
          </h1>
          <p className='mt-5 w-fit max-w-md text-sm text-text-muted sm:text-base'>
            Twillit Studio 소속 버추얼 그룹 Cafe Carte
            <br />
            <span className='text-text'>{memberNames}</span>
          </p>

          <div className='pointer-events-auto'>
            <LiveNow />
            <HeroMembers />
          </div>
        </div>
      </div>
    </section>
  );
}
