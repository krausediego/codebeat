import type { PullRequestSchema } from ".";

export interface IPullRequest {
  run(params: PullRequest.Params): Promise<PullRequest.Response>;
}

export namespace PullRequest {
  export type Params = {
    userId: string;
    username: string;
    token: string;
    traceId: string;
  };

  export type Response = PullRequestSchema.GetResponse;

  export interface PRItem {
    title: string;
    state: string;
    createdAt: string;
    mergedAt: string | null;
    closedAt: string | null;
    repo: string;
  }

  export interface MonthlyCount {
    month: string; // 'YYYY-MM'
    opened: number;
    merged: number;
  }
}
