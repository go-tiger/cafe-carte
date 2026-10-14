import Image from 'next/image';
import { CircleDot, Clock, GitFork, Scale, Star } from 'lucide-react';
import { getGitHubData, githubLinks, type GitHubStats } from '@/shared/lib/github';
import { LastCommitTime } from '@/shared/ui';
import { GithubIcon } from '@/shared/ui/icons';

const numberFmt = new Intl.NumberFormat('ko');
const stat = (v: number | undefined) => (v === undefined ? '—' : numberFmt.format(v));

const statItems = (s: GitHubStats | null) => [
  { icon: Star, label: '스타', value: stat(s?.stars), href: githubLinks.stars },
  { icon: GitFork, label: '포크', value: stat(s?.forks), href: githubLinks.forks },
  { icon: CircleDot, label: '이슈', value: stat(s?.openIssues), href: githubLinks.issues },
];

interface AssetCredit {
  asset: string;
  source: string;
  rights: string;
  rightsHref?: string;
}

const ASSET_CREDITS: AssetCredit[] = [
  {
    asset: '멤버 카드 일러스트',
    source: 'Twillit Studio 네이버 카페 대문 이미지',
    rights: '원저작권자(Twillit Studio) 소유',
  },
  { asset: '멤버 상세 프로필 이미지', source: '각 멤버 치지직 채널 프로필 이미지', rights: '원저작권자 소유' },
  { asset: '로고', source: 'Cafe Carte 관련 이미지', rights: '원저작권자 소유' },
  {
    asset: '본문 폰트',
    source: 'NanumSquareNeo (네이버)',
    rights: '네이버 폰트 라이선스',
    rightsHref: 'https://hangeul.naver.com/font',
  },
  {
    asset: '제목 폰트',
    source: 'Playfair Display (Google Fonts)',
    rights: 'SIL Open Font License 1.1',
    rightsHref: 'https://openfontlicense.org',
  },
  {
    asset: '브랜드 아이콘',
    source: 'YouTube, X, 네이버 카페, 치지직 로고를 단순화한 SVG',
    rights: '각 서비스 상표권자 소유',
  },
];

export async function CreditsContent() {
  const { stats, contributors } = await getGitHubData();

  return (
    <div className='mx-auto max-w-5xl'>
      <p className='text-xs font-bold tracking-eyebrow text-text-muted'>CREDITS</p>
      <h1 className='mt-2 font-display font-heavy text-3xl tracking-tight sm:text-4xl'>같이 만들어요</h1>
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
          <h2 className='text-xs font-bold tracking-eyebrow text-text-muted'>PROJECT STATS</h2>
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
                Last commit: <LastCommitTime pushedAt={stats.pushedAt} />
              </span>
            )}
          </p>
        </section>

        {contributors.length > 0 && (
          <section>
            <h2 className='text-xs font-bold tracking-eyebrow text-text-muted'>CONTRIBUTORS</h2>
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

      <section className='mt-12 border-t border-border pt-10'>
        <h2 className='text-xs font-bold tracking-eyebrow text-text-muted'>ASSETS</h2>
        <ul className='mt-4 divide-y divide-border text-sm'>
          {ASSET_CREDITS.map(({ asset, source, rights, rightsHref }) => (
            <li key={asset} className='grid gap-1 py-3 sm:grid-cols-[10rem_1fr_auto] sm:gap-6'>
              <span className='font-bold'>{asset}</span>
              <span className='text-text-muted'>{source}</span>
              {rightsHref ? (
                <a
                  href={rightsHref}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-fit text-accent underline-offset-4 hover:underline'
                >
                  {rights}
                </a>
              ) : (
                <span className='text-text-muted'>{rights}</span>
              )}
            </li>
          ))}
        </ul>
        <p className='mt-4 text-sm leading-relaxed text-text-muted'>
          이미지, 로고, 브랜드 아이콘의 권리는 원저작권자에게 있으며 팬 활동 목적으로만 사용합니다. 문제가 되는 콘텐츠는{' '}
          <a
            href={githubLinks.issues}
            target='_blank'
            rel='noopener noreferrer'
            className='text-accent underline-offset-4 hover:underline'
          >
            이슈
          </a>
          로 알려 주시면 삭제하겠습니다.
        </p>
      </section>
    </div>
  );
}
