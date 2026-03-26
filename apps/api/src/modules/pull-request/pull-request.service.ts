import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService, IGithub } from "@/modules/shared";
import type { PullRequest, IPullRequest } from ".";
import * as schema from "@/infra/database/schema";

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

    const [opened, merged, closed] = await Promise.all([
      this.fetchPRs({
        userId,
        token,
        username,
        filter: "author",
        state: "open",
      }),
      this.fetchPRs({
        userId,
        token,
        username,
        filter: "author",
        state: "merged",
      }),
      this.fetchPRs({
        userId,
        token,
        username,
        filter: "author",
        state: "closed",
      }),
    ]);

    this.log("info", "PRs fetched", {
      open: opened.length,
      merged: merged.length,
      closed: closed.length,
    });

    const avgMergeTimeHours = this.calculateAvgMergeTime(merged);
    const last12Months = this.buildMonthlyStats([
      ...opened,
      ...merged,
      ...closed,
    ]);

    return {
      total: opened.length + merged.length + closed.length,
      open: opened.length,
      merged: merged.length,
      closed: closed.length,
      avgMergeTimeHours,
      last12Months,
    };
  }

  private async fetchPRs({
    userId,
    token,
    username,
    state,
  }: {
    userId: string;
    token: string;
    username: string;
    filter: string;
    state: "open" | "merged" | "closed";
  }): Promise<PullRequest.PRItem[]> {
    const stateQuery = state === "merged" ? "is:merged" : `is:${state}`;
    const q = `author:${username} type:pr ${stateQuery}`;

    const pages = await Promise.all(
      [1, 2].map((page) =>
        this.github.fetch({
          userId,
          token,
          endpoint: "search/pull-requests",
          args: [{ q, page }],
        }),
      ),
    );

    return pages.flatMap((p) =>
      p.items.map((item) => ({
        title: item.title,
        state: item.state,
        createdAt: item.created_at,
        mergedAt: (item as any).pull_request?.merged_at ?? null,
        closedAt: item.closed_at ?? null,
        repo: item.repository_url.split("/").slice(-2).join("/"),
      })),
    );
  }

  private calculateAvgMergeTime(merged: PullRequest.PRItem[]): number | null {
    const withMergeTime = merged.filter((pr) => pr.mergedAt);
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
      const month = date.toISOString().slice(0, 7); // 'YYYY-MM'
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
