import type { ProfileSchema } from ".";

export interface IProfile {
  run(params: Profile.Params): Promise<Profile.Response>;
}

export namespace Profile {
  export type Params = {
    userId: string;
    token: string;
    traceId: string;
  };

  export type Response = ProfileSchema.GetResponse;
}
