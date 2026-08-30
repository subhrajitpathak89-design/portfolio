import { profile } from "@/content/profile";

/**
 * Recent public commits.
 *
 * Read from the events feed first: it is the only endpoint that spans every
 * repository without a token, and it needs a single request. But it only keeps
 * about 90 days, so a quiet quarter empties it while the repositories are still
 * full — hence the fallback, which walks the most recently pushed repositories
 * and reads their commits directly.
 *
 * Both paths see public activity only. Work in private or organisation
 * repositories is invisible here no matter which endpoint is asked.
 *
 * Nothing here throws. A rate limit, a renamed account, an empty repository or
 * a network failure all end the same way: no commits, and the section that
 * calls this renders nothing rather than an error state nobody can act on.
 */

const GITHUB_HOST = "https://github.com/";

export type Commit = {
  sha: string;
  message: string;
  /** `owner/name`, as GitHub reports it. */
  repo: string;
  url: string;
  date: string;
};

/** GitHub caps the feed at 300 events; this is a display limit, not a fetch one. */
const MAX_COMMITS = 6;

type PushEvent = {
  type: string;
  created_at: string;
  repo?: { name?: string };
  payload?: { commits?: { sha?: string; message?: string }[] };
};

/** The username is derived from the profile link, so there is one place to edit. */
function usernameFromProfile() {
  const github = profile.socials.find((social) => social.platform === "github");
  if (!github?.href?.startsWith(GITHUB_HOST)) return null;

  const handle = github.href.slice(GITHUB_HOST.length).split(/[/?#]/)[0];
  return handle || null;
}

/**
 * Every GitHub read goes through here: same headers, same cache window, and a
 * failure of any kind comes back as null instead of an exception.
 *
 * Hourly, because the unauthenticated limit is 60 requests an hour per IP and
 * refetching per request would burn it on a busy day.
 */
async function githubJson<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`https://api.github.com/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    });

    // 409 on an empty repository, 403 when rate limited, 404 on a rename.
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getRecentCommits(): Promise<Commit[]> {
  const username = usernameFromProfile();
  if (!username) return [];

  const fromEvents = await commitsFromEvents(username);
  if (fromEvents.length > 0) return fromEvents;

  return commitsFromRepos(username);
}

async function commitsFromEvents(username: string): Promise<Commit[]> {
  const events = await githubJson<PushEvent[]>(
    `users/${username}/events/public?per_page=100`
  );
  if (!Array.isArray(events)) return [];

  const commits: Commit[] = [];

  for (const event of events) {
    if (event.type !== "PushEvent") continue;

    const repo = event.repo?.name;
    if (!repo) continue;

    // A push carries its commits oldest-first, so the last one is the tip —
    // and the tip is the only one of a batch worth listing.
    const pushed = event.payload?.commits;
    const tip = pushed?.[pushed.length - 1];
    if (!tip?.sha || !tip.message) continue;

    // Merge commits say nothing about the work and would crowd out the rest.
    if (tip.message.startsWith("Merge ")) continue;

    commits.push({
      sha: tip.sha,
      // Only the subject line: bodies run to paragraphs and this is a list.
      message: tip.message.split("\n")[0],
      repo,
      url: `${GITHUB_HOST}${repo}/commit/${tip.sha}`,
      date: event.created_at,
    });

    if (commits.length === MAX_COMMITS) break;
  }

  return commits;
}

/** How many repositories the fallback opens before giving up on the budget. */
const REPOS_SCANNED = 4;

type Repo = { full_name?: string; fork?: boolean; size?: number };

type RepoCommit = {
  sha?: string;
  author?: { login?: string } | null;
  commit?: { message?: string; author?: { date?: string } };
};

async function commitsFromRepos(username: string): Promise<Commit[]> {
  const repos = await githubJson<Repo[]>(
    `users/${username}/repos?per_page=100&sort=pushed&type=owner`
  );
  if (!Array.isArray(repos)) return [];

  // `size: 0` is an empty repository. Skipping those here saves a request that
  // would only come back 409, and forks are somebody else's history.
  const candidates = repos
    .filter((repo) => repo.full_name && !repo.fork && (repo.size ?? 0) > 0)
    .slice(0, REPOS_SCANNED);

  const perRepo = await Promise.all(
    candidates.map((repo) =>
      githubJson<RepoCommit[]>(`repos/${repo.full_name}/commits?per_page=5`)
    )
  );

  const commits: Commit[] = [];

  perRepo.forEach((list, index) => {
    const repo = candidates[index].full_name;
    if (!repo || !Array.isArray(list)) return;

    for (const entry of list) {
      const message = entry.commit?.message?.split("\n")[0];
      const date = entry.commit?.author?.date;
      if (!entry.sha || !message || !date) continue;
      if (message.startsWith("Merge ")) continue;

      // A null author means the commit email is not linked to any account,
      // which on your own repository is still your commit.
      const author = entry.author?.login;
      if (author && author.toLowerCase() !== username.toLowerCase()) continue;

      commits.push({
        sha: entry.sha,
        message,
        repo,
        url: `${GITHUB_HOST}${repo}/commit/${entry.sha}`,
        date,
      });
    }
  });

  return commits
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, MAX_COMMITS);
}
