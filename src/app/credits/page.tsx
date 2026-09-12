import type { Metadata } from 'next';
import { SiteHeader } from '@/components';
import { CreditsContent } from '@/features/credits';

export const metadata: Metadata = {
  title: '크레딧',
};

export default function CreditsPage() {
  return (
    <>
      <SiteHeader />

      <main className='px-6 pt-32 pb-20 sm:px-10'>
        <CreditsContent />
      </main>
    </>
  );
}
