import Image from 'next/image';
import { CircleDot, Clock, GitFork, Scale, Star } from 'lucide-react';
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

export async function CreditsContent() {
  const { stats, contributors } = await getGitHubData();

  return (
    <div className='mx-auto max-w-5xl'>
      <p className='text-xs font-bold tracking-[0.3em] text-text-muted'>CREDITS</p>
      <h1 className='mt-2 font-heavy text-3xl tracking-tight sm:text-4xl'>같이 만들어요</h1>
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

      <div className='mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-2 lg:gap-16'>
        <section>
          <h2 className='text-xs font-bold tracking-[0.2em] text-text-muted'>PROJECT STATS</h2>
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
          </ul>
          <p className='mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted'>
            <span className='flex items-center gap-1.5'>
              <Scale className='size-4 shrink-0' />
              MIT · CC BY-NC-SA 4.0
            </span>
            {stats?.pushedAt && (
              <span className='flex items-center gap-1.5'>
                <Clock className='size-4 shrink-0' />
                Last commit: {relativeTime(stats.pushedAt)}
              </span>
            )}
          </p>
        </section>

        {contributors.length > 0 && (
          <section>
            <h2 className='text-xs font-bold tracking-[0.2em] text-text-muted'>CONTRIBUTORS</h2>
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
  );
}
