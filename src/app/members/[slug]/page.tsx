import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { ComponentType, CSSProperties, SVGProps } from 'react';
import { SiteHeader } from '@/components';
import { MEMBERS, MEMBER_DETAILS, BRAND_COLORS } from '@/shared/constants';
import { asset } from '@/shared/lib';
import { ChzzkIcon, YoutubeIcon, XIcon } from '@/shared/ui/icons';

const SNS_ICONS = {
  chzzk: ChzzkIcon,
  youtube: YoutubeIcon,
  x: XIcon,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

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

  const detail = MEMBER_DETAILS[member.id];

  return (
    <>
      <SiteHeader />

      <main className='px-6 pt-32 pb-20 sm:px-10'>
        <div className='mx-auto max-w-3xl'>
          <div className='flex flex-col gap-8 sm:flex-row'>
            <div
              className='relative aspect-179/236 w-full shrink-0 overflow-hidden rounded-2xl border border-border shadow-poster sm:w-64'
              style={{ backgroundColor: member.color }}
            >
              <Image src={asset(member.avatar)} alt={member.nameKo} fill sizes='256px' className='object-cover' />
            </div>

            <div className='flex flex-col justify-center gap-2'>
              <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>{member.position}</p>
              <h1 className='font-heavy text-4xl tracking-tight' style={{ color: member.ink }}>
                {member.nameKo}
              </h1>
              <p className='text-sm text-text-muted'>{member.name}</p>
              <p className='mt-2 text-sm leading-relaxed text-text-muted'>
                {detail?.bio ?? '소개 글이 등록되어있지 않습니다.'}
              </p>
            </div>
          </div>

          {detail && (
            <dl className='mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-8 text-sm sm:grid-cols-3 lg:grid-cols-5'>
              <div>
                <dt className='text-xs text-text-muted'>나이</dt>
                <dd className='mt-1'>{detail.age}</dd>
              </div>
              <div>
                <dt className='text-xs text-text-muted'>{detail.anniversaryLabel ?? '생일'}</dt>
                <dd className='mt-1'>{detail.anniversary}</dd>
              </div>
              <div>
                <dt className='text-xs text-text-muted'>데뷔일</dt>
                <dd className='mt-1'>{detail.debutDate}</dd>
              </div>
              <div>
                <dt className='text-xs text-text-muted'>팬네임</dt>
                <dd className='mt-1'>{detail.fanName}</dd>
              </div>
              <div>
                <dt className='text-xs text-text-muted'>오시마크</dt>
                <dd className='mt-1'>{detail.mark}</dd>
              </div>
            </dl>
          )}

          {detail && (
            <div className='mt-8 flex flex-wrap gap-2 border-t border-border pt-8 text-xs'>
              <span className='rounded-full bg-surface-2 px-3 py-1 text-text-muted'>{detail.tags.unified}</span>
              <span className='rounded-full bg-surface-2 px-3 py-1 text-text-muted'>{detail.tags.clip}</span>
              <span className='rounded-full bg-surface-2 px-3 py-1 text-text-muted'>{detail.tags.art}</span>
            </div>
          )}

          {detail?.links && (
            <ul className='mt-8 grid gap-4 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3'>
              {detail.links.chzzk && (
                <li>
                  <a
                    href={detail.links.chzzk}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
                  >
                    <span
                      className='flex size-12 shrink-0 items-center justify-center rounded-xl'
                      style={{ backgroundColor: BRAND_COLORS.chzzk.color, color: BRAND_COLORS.chzzk.ink }}
                    >
                      <SNS_ICONS.chzzk className='size-6' />
                    </span>
                    <span className='min-w-0 flex-1 font-heavy text-lg leading-tight'>치지직</span>
                  </a>
                </li>
              )}
              {detail.links.youtube?.map(yt => (
                <li key={yt.url}>
                  <a
                    href={yt.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
                  >
                    <span
                      className='flex size-12 shrink-0 items-center justify-center rounded-xl'
                      style={
                        {
                          backgroundColor: BRAND_COLORS.youtube.color,
                          color: BRAND_COLORS.youtube.ink,
                          ['--yt-notch' as string]: BRAND_COLORS.youtube.color,
                        } as CSSProperties
                      }
                    >
                      <SNS_ICONS.youtube className='size-6' />
                    </span>
                    <span className='min-w-0 flex-1 truncate font-heavy text-lg leading-tight'>
                      유튜브 · {yt.label}
                    </span>
                  </a>
                </li>
              ))}
              {detail.links.x && (
                <li>
                  <a
                    href={detail.links.x}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-poster transition-transform hover:-translate-y-1'
                  >
                    <span
                      className='flex size-12 shrink-0 items-center justify-center rounded-xl'
                      style={{ backgroundColor: BRAND_COLORS.x.color, color: BRAND_COLORS.x.ink }}
                    >
                      <SNS_ICONS.x className='size-6' />
                    </span>
                    <span className='min-w-0 flex-1 font-heavy text-lg leading-tight'>X</span>
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
