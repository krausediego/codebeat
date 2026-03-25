import type { CommitSchema } from ".";

export interface ICommit {
  run(params: Commit.Params): Promise<Commit.Response>;
}

export namespace Commit {
  export type Params = {
    userId: string;
    username: string;
    token: string;
    traceId: string;
  };

  export type Response = CommitSchema.GetResponse;

  export type PushEvent = {
    type: string;
    created_at: string | null;
    payload: {
      size?: number;
      commits?: { sha: string }[];
    };
  };

  export interface HeatmapDay {
    date: string; // 'YYYY-MM-DD'
    count: number;
  }

  export interface CommitItem {
    sha: string;
    commit: {
      author?: {
        date?: string;
      };
    };
  }

  export type ContributionsResponse = {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
            }[];
          }[];
        };
      };
    };
  };
}
