import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components';
import { MEMBERS } from '@/shared/constants';
import { MemberDetail } from '@/features/members';

interface MemberPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MEMBERS.map(m => ({ slug: m.id }));
}

export function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  return params.then(({ slug }) => {
    const member = MEMBERS.find(m => m.id === slug);
    return { title: member ? member.nameKo : '멤버' };
  });
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const member = MEMBERS.find(m => m.id === slug);
  if (!member) notFound();

  return (
    <>
      <SiteHeader />

      <main className='pb-20'>
        <MemberDetail member={member} />
      </main>
    </>
  );
}
