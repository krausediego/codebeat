import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService, IGithub } from "@/modules/shared";
import type { PullRequest, IPullRequest } from ".";

export class PullRequestService extends BaseService implements IPullRequest {
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly github: IGithub,
  ) {
    super(logger);
  }

  @setTraceId
  async run({
    userId,
    token,
    username,
  }: PullRequest.Params): Promise<PullRequest.Response> {
    this.log("info", "Starting process pull-requests", { username });

    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    type PRContributionsResponse = {
      user: {
        contributionsCollection: {
          pullRequestContributions: {
            totalCount: number;
            nodes: {
              pullRequest: {
                title: string;
                state: string;
                createdAt: string;
                mergedAt: string | null;
                closedAt: string | null;
                repository: { nameWithOwner: string };
              };
            }[];
          };
          issueContributions: {
            totalCount: number;
            nodes: {
              issue: {
                state: string;
                createdAt: string;
                closedAt: string | null;
              };
            }[];
          };
        };
      };
    };

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            pullRequestContributions(first: 100) {
              totalCount
              nodes {
                pullRequest {
                  title
                  state
                  createdAt
                  mergedAt
                  closedAt
                  repository { nameWithOwner }
                }
              }
            }
            issueContributions(first: 100) {
              totalCount
              nodes {
                issue {
                  state
                  createdAt
                  closedAt
                }
              }
            }
          }
        }
      }
    `;

    // busca GraphQL e Search API em paralelo
    const [graphqlData, searchOpen, searchMerged, searchClosed] =
      await Promise.all([
        this.github.graphql<PRContributionsResponse>(userId, token, query, {
          username,
          from: oneYearAgo.toISOString(),
          to: now.toISOString(),
        }),
        this.github.fetch({
          userId,
          token,
          endpoint: "search/pull-requests",
          args: [{ q: `author:${username} type:pr is:open`, page: 1 }],
        }),
        this.github.fetch({
          userId,
          token,
          endpoint: "search/pull-requests",
          args: [{ q: `author:${username} type:pr is:merged`, page: 1 }],
        }),
        this.github.fetch({
          userId,
          token,
          endpoint: "search/pull-requests",
          args: [{ q: `author:${username} type:pr is:closed`, page: 1 }],
        }),
      ]);

    // GraphQL traz nodes com detalhes
    const prs =
      graphqlData.user.contributionsCollection.pullRequestContributions.nodes.map(
        (n) => ({
          title: n.pullRequest.title,
          state: n.pullRequest.state,
          createdAt: n.pullRequest.createdAt,
          mergedAt: n.pullRequest.mergedAt,
          closedAt: n.pullRequest.closedAt,
          repo: n.pullRequest.repository.nameWithOwner,
        }),
      );

    const issueNodes =
      graphqlData.user.contributionsCollection.issueContributions.nodes;

    // Search API traz totalCount mais preciso (inclui repos públicos que o GraphQL pode não ver)
    const open = Math.max(
      prs.filter((p) => p.state === "OPEN").length,
      searchOpen.total_count,
    );
    const merged = Math.max(
      prs.filter((p) => p.state === "MERGED").length,
      searchMerged.total_count,
    );
    const closed = Math.max(
      prs.filter((p) => p.state === "CLOSED").length,
      searchClosed.total_count,
    );

    this.log("info", "PRs fetched", {
      graphqlTotal:
        graphqlData.user.contributionsCollection.pullRequestContributions
          .totalCount,
      searchOpen: searchOpen.total_count,
      searchMerged: searchMerged.total_count,
      searchClosed: searchClosed.total_count,
      finalOpen: open,
      finalMerged: merged,
      finalClosed: closed,
    });

    return {
      total: open + merged + closed,
      open,
      merged,
      closed,
      avgMergeTimeHours: this.calculateAvgMergeTime(prs),
      last12Months: this.buildMonthlyStats(prs),
      issues: {
        total:
          graphqlData.user.contributionsCollection.issueContributions
            .totalCount,
        open: issueNodes.filter((n) => n.issue.state === "OPEN").length,
        closed: issueNodes.filter((n) => n.issue.state === "CLOSED").length,
      },
    };
  }

  private calculateAvgMergeTime(prs: PullRequest.PRItem[]): number | null {
    const withMergeTime = prs.filter((pr) => pr.mergedAt);
    if (!withMergeTime.length) return null;

    const totalHours = withMergeTime.reduce((sum, pr) => {
      const created = new Date(pr.createdAt).getTime();
      const mergedAt = new Date(pr.mergedAt!).getTime();
      return sum + (mergedAt - created) / (1000 * 60 * 60);
    }, 0);

    return Math.round(totalHours / withMergeTime.length);
  }

  private buildMonthlyStats(
    prs: PullRequest.PRItem[],
  ): PullRequest.MonthlyCount[] {
    const now = new Date();
    const months: PullRequest.MonthlyCount[] = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toISOString().slice(0, 7);
      months.push({ month, opened: 0, merged: 0 });
    }

    for (const pr of prs) {
      const month = pr.createdAt.slice(0, 7);
      const entry = months.find((m) => m.month === month);
      if (!entry) continue;

      entry.opened++;
      if (pr.mergedAt) entry.merged++;
    }

    return months;
  }
}
