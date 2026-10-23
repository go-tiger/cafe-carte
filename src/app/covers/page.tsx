import type { Metadata } from 'next';
import { SiteHeader } from '@/components';
import { CoversContent } from '@/features/covers';

export const metadata: Metadata = {
  title: '커버곡',
};

export default function CoversPage() {
  return (
    <>
      <SiteHeader />

      <main className='px-6 pt-32 pb-20 sm:px-10'>
        <CoversContent />
      </main>
    </>
  );
}
