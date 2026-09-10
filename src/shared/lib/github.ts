const REPO = 'go-tiger/cafe-carte';
const API = `https://api.github.com/repos/${REPO}`;

export const githubLinks = {
  repository: `https://github.com/${REPO}`,
  stars: `https://github.com/${REPO}/stargazers`,
  forks: `https://github.com/${REPO}/forks`,
  issues: `https://github.com/${REPO}/issues`,
  commits: `https://github.com/${REPO}/commits`,
  contributing: `https://github.com/${REPO}/blob/main/CONTRIBUTING.md`,
};

export interface GitHubStats {
  stars: number;
  forks: number;
  openIssues: number;
  pushedAt: string | null;
}

export interface GitHubContributor {
  login: string;
  profileUrl: string;
  avatarUrl: string;
  contributions: number;
}

export interface GitHubData {
  stats: GitHubStats | null;
  contributors: GitHubContributor[];
}

const headers: HeadersInit = {
  Accept: 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

export async function getGitHubData(): Promise<GitHubData> {
  const [stats, contributors] = await Promise.all([fetchStats(), fetchContributors()]);
  return { stats, contributors };
}

async function fetchStats(): Promise<GitHubStats | null> {
  try {
    const res = await fetch(API, { headers, next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      stargazers_count: number;
      forks_count: number;
      open_issues_count: number;
      pushed_at: string;
    };
    return {
      stars: json.stargazers_count,
      forks: json.forks_count,
      openIssues: json.open_issues_count,
      pushedAt: json.pushed_at ?? null,
    };
  } catch {
    return null;
  }
}

async function fetchContributors(): Promise<GitHubContributor[]> {
  try {
    const res = await fetch(`${API}/contributors?per_page=20`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as {
      login: string;
      html_url: string;
      avatar_url: string;
      contributions: number;
    }[];
    return json
      .filter(c => c.login && !c.login.endsWith('[bot]'))
      .map(c => ({
        login: c.login,
        profileUrl: c.html_url,
        avatarUrl: c.avatar_url,
        contributions: c.contributions,
      }));
  } catch {
    return [];
  }
}
