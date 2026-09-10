import Image from 'next/image';
import { CircleDot, GitFork, Scale, Star } from 'lucide-react';
import { getGitHubData, githubLinks, type GitHubStats } from '@/shared/lib/github';
import { relativeTime } from '@/shared/lib/relative-time';
import { GithubIcon } from '@/shared/ui/icons';

const numberFmt = new Intl.NumberFormat('ko');
const stat = (v: number | undefined) => (v === undefined ? '—' : numberFmt.format(v));

const statItems = (s: GitHubStats | null) => [
  { icon: Star, label: '스타', value: stat(s?.stars), href: githubLinks.stars },
  { icon: GitFork, label: '포크', value: stat(s?.forks), href: githubLinks.forks },
  { icon: CircleDot, label: '이슈', value: stat(s?.openIssues), href: githubLinks.issues },
];

export async function SiteFooter() {
  const { stats, contributors } = await getGitHubData();
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-border px-6 py-16 sm:px-10'>
      <div className='mx-auto max-w-5xl'>
        <div className='grid gap-10 border-b border-border pb-12 lg:grid-cols-2 lg:gap-16'>
          {/* 좌: 기여 CTA */}
          <div>
            <h2 className='font-heavy text-2xl tracking-tight sm:text-3xl'>같이 만들어요</h2>
            <p className='mt-3 max-w-md text-sm leading-relaxed text-text-muted'>
              멤버 정보 보강, 버그 수정, 디자인 개선, 새 기능 — 어떤 기여든 환영합니다. 저장소에서 이슈를 남기거나 Pull
              Request를 보내주세요.
            </p>
            <a
              href={githubLinks.repository}
              target='_blank'
              rel='noopener noreferrer'
              className='group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-bold text-bg transition-opacity hover:opacity-80'
            >
              <GithubIcon className='size-4 transition-transform group-hover:-translate-y-0.5' />
              GitHub에서 기여하기
            </a>
          </div>

          {/* 우: 통계 + 기여자 */}
          <div className='flex flex-col gap-8'>
            <section>
              <h3 className='text-xs font-bold tracking-[0.2em] text-text-muted'>PROJECT STATS</h3>
              <ul className='mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted'>
                {statItems(stats).map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-1.5 transition-colors hover:text-text'
                    >
                      <Icon className='size-4' />
                      <span className='font-bold text-text'>{value}</span> {label}
                    </a>
                  </li>
                ))}
                <li className='flex items-center gap-1.5'>
                  <Scale className='size-4' />
                  MIT · CC BY-NC-SA 4.0
                </li>
              </ul>
              {stats?.pushedAt && (
                <p className='mt-3 text-xs text-text-muted'>마지막 커밋 {relativeTime(stats.pushedAt)}</p>
              )}
            </section>

            {contributors.length > 0 && (
              <section>
                <h3 className='text-xs font-bold tracking-[0.2em] text-text-muted'>CONTRIBUTORS</h3>
                <ul className='mt-4 flex flex-wrap items-center gap-2'>
                  {contributors.map(c => (
                    <li key={c.login}>
                      <a
                        href={c.profileUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        title={`${c.login} · ${numberFmt.format(c.contributions)} commits`}
                        className='block overflow-hidden rounded-full border border-border transition-transform hover:-translate-y-0.5'
                      >
                        <Image src={c.avatarUrl} alt={c.login} width={36} height={36} />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* 고지 */}
        <div className='mt-10 flex flex-col items-center gap-3 text-center'>
          <p className='text-xs leading-relaxed text-text-muted'>
            비공식 팬사이트입니다. Twillet Studio 및 Cafe Carte 공식과 무관하며, 모든 캐릭터·이미지·상표의 권리는
            <br className='hidden sm:block' /> 각 원저작권자에게 있습니다.
          </p>
          <p className='text-xs text-text-muted'>Cafe Carte / Twillet Studio · &copy; {year} go-tiger</p>
        </div>
      </div>
    </footer>
  );
}
