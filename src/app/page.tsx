import { MEMBERS } from '@/lib/members';
import { SiteHeader } from '@/components/SiteHeader';
import { HeroCollage } from './HeroCollage';

const memberNames = MEMBERS.map(m => m.nameKo).join(' · ');

export default function Home() {
  return (
    <>
      <SiteHeader transparentOnTop />

      <section className='relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-16 pt-24 sm:px-10'>
        <HeroCollage />

        <div className='relative z-10 max-w-2xl'>
          <p className='mb-3 text-sm font-bold tracking-[0.3em] text-text-muted'>UNOFFICIAL FAN SITE</p>
          <h1 className='font-heavy text-[clamp(3rem,12vw,7rem)] leading-[0.95] tracking-[-0.03em]'>
            CAFE
            <br />
            CARTE
          </h1>
          <p className='mt-5 max-w-md text-base text-text-muted'>
            Twillet Studio 소속 버추얼 그룹 Cafe Carte
            <br />
            <span className='text-text'>{memberNames}</span>
          </p>

          <div className='mt-10 flex gap-1.5 lg:hidden'>
            {MEMBERS.map(m => (
              <span key={m.id} className='h-14 flex-1 rounded-lg' style={{ backgroundColor: m.color }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
