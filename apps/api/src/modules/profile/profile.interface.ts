import type { ProfileSchema } from ".";

export interface IProfile {
  run(params: Profile.Params): Promise<Profile.Response>;
}

export namespace Profile {
  export type Params = ProfileSchema.GetParams & {
    traceId: string;
  };

  export type Response = ProfileSchema.GetResponse;
}
