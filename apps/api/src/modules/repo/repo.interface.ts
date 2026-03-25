import type { RepoSchema } from ".";

export interface IRepo {
  run(params: Repo.Params): Promise<Repo.Response>;
}

export namespace Repo {
  export type Params = {
    userId: string;
    token: string;
    traceId: string;
  };

  export type Response = RepoSchema.GetResponse;
}
