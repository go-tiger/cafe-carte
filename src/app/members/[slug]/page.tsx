import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components';
import { MEMBER_DETAILS, MEMBERS, SITE_NAME, SITE_OPEN_GRAPH } from '@/shared/constants';
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
    if (!member) return { title: '멤버' };

    const bio = MEMBER_DETAILS[member.id]?.bio;
    const description = `${member.nameKo}(${member.name}) · ${member.position}${bio ? ` — ${bio}` : ''}`;
    return {
      title: member.nameKo,
      description,
      openGraph: {
        ...SITE_OPEN_GRAPH,
        title: `${member.nameKo} · ${SITE_NAME}`,
        description,
        images: [{ url: member.profile ?? member.avatar, alt: member.nameKo }],
      },
    };
  });
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { slug } = await params;
  const index = MEMBERS.findIndex(m => m.id === slug);
  if (index === -1) notFound();

  const member = MEMBERS[index];
  const prevMember = MEMBERS[(index - 1 + MEMBERS.length) % MEMBERS.length];
  const nextMember = MEMBERS[(index + 1) % MEMBERS.length];

  return (
    <>
      <SiteHeader />

      <main className='pb-20'>
        <MemberDetail member={member} prevMember={prevMember} nextMember={nextMember} />
      </main>
    </>
  );
}
