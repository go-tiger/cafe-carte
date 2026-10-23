import type { Metadata } from 'next';
import { SiteHeader } from '@/components';
import { PrivacyContent } from '@/features/privacy';

export const metadata: Metadata = {
  title: '개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main className='px-6 pt-32 pb-20 sm:px-10'>
        <PrivacyContent />
      </main>
    </>
  );
}
