import type { Metadata } from 'next';
import { SiteHeader } from '@/components';
import { MembersList } from '@/features/members';

export const metadata: Metadata = {
  title: '멤버',
};

export default function MembersPage() {
  return (
    <>
      <SiteHeader />

      <main className='px-6 pt-32 pb-20 sm:px-10'>
        <MembersList />
      </main>
    </>
  );
}
