import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { ComponentType, CSSProperties, SVGProps } from 'react';
import { SiteHeader } from '@/components';
import { MEMBERS, MEMBER_DETAILS, BRAND_COLORS } from '@/shared/constants';
import { asset } from '@/shared/lib';
import { Emoji } from '@/shared/ui';
import { ChzzkIcon, YoutubeIcon, XIcon } from '@/shared/ui/icons';

const SNS_ICONS = {
  chzzk: ChzzkIcon,
  youtube: YoutubeIcon,
  x: XIcon,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

const SNS_LABELS = {
  chzzk: '치지직',
  youtube: '유튜브',
  x: 'X',
} satisfies Record<string, string>;

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

  const fanNameLines = detail?.fanName.split(/(?= \()/) ?? [];

  return (
    <>
      <SiteHeader />

      <main className='pb-20'>
        <div className='border-b border-border px-6 pt-32 pb-10 sm:px-10' style={{ backgroundColor: member.color }}>
          <div className='mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-end'>
            <div className='relative aspect-179/236 w-56 shrink-0 overflow-hidden rounded-2xl border border-border shadow-poster sm:w-72'>
              <Image
                src={asset(member.avatar)}
                alt={member.nameKo}
                fill
                sizes='288px'
                priority
                className='object-cover'
              />
            </div>

            <div className='flex flex-col gap-2 pb-2'>
              <p className='text-xs font-bold tracking-[0.3em] text-black/60'>{member.position}</p>
              <h1 className='font-heavy text-5xl tracking-tight sm:text-6xl' style={{ color: member.ink }}>
                {member.nameKo}
              </h1>
              <p className='text-sm text-black/60'>{member.name}</p>
            </div>
          </div>
        </div>

        <div className='mx-auto max-w-5xl px-6 sm:px-10'>
          <p className='mt-8 max-w-xl text-base leading-relaxed text-text-muted'>
            {detail?.bio ?? '소개 글이 등록되어있지 않습니다.'}
          </p>

          {detail && (
            <dl className='mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
              <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
                <dt className='text-xs text-text-muted'>나이</dt>
                <dd className='mt-1 font-heavy'>{detail?.age}</dd>
              </div>
              <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
                <dt className='text-xs text-text-muted'>{detail?.anniversaryLabel ?? '생일'}</dt>
                <dd className='mt-1 font-heavy'>{detail?.anniversary}</dd>
              </div>
              <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
                <dt className='text-xs text-text-muted'>데뷔일</dt>
                <dd className='mt-1 font-heavy'>{detail?.debutDate}</dd>
              </div>
              <div className='col-span-2 rounded-2xl border border-border bg-surface p-4 shadow-poster'>
                <dt className='text-xs text-text-muted'>팬네임</dt>
                <dd className='mt-1 font-heavy'>
                  {fanNameLines.map(line => (
                    <span key={line} className='block'>
                      {line.trim()}
                    </span>
                  ))}
                </dd>
              </div>
              <div className='rounded-2xl border border-border bg-surface p-4 shadow-poster'>
                <dt className='text-xs text-text-muted'>오시마크</dt>
                <dd className='mt-1 text-lg'>{detail && <Emoji>{detail.mark}</Emoji>}</dd>
              </div>
            </dl>
          )}

          {detail && (
            <div className='mt-6 flex flex-wrap gap-2 text-xs'>
              <span className='rounded-full bg-surface-2 px-3 py-1 text-text-muted'>{detail.tags.unified}</span>
              <span className='rounded-full bg-surface-2 px-3 py-1 text-text-muted'>{detail.tags.clip}</span>
              <span className='rounded-full bg-surface-2 px-3 py-1 text-text-muted'>{detail.tags.art}</span>
            </div>
          )}

          {detail?.links && (
            <div className='mt-12 border-t border-border pt-8'>
              <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>CHANNELS</p>
              <ul className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
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
                      <span className='min-w-0 flex-1 font-heavy text-lg leading-tight'>{SNS_LABELS.chzzk}</span>
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
                        {SNS_LABELS.youtube} · {yt.label}
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
                      <span className='min-w-0 flex-1 font-heavy text-lg leading-tight'>{SNS_LABELS.x}</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
