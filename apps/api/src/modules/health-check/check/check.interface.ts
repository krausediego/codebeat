import type { CheckSchema } from ".";

export interface ICheck {
  run(params: Check.Params): Promise<Check.Response>;
}

export namespace Check {
  export type Params = {
    traceId: string;
  };

  export type Response = CheckSchema.GetResponse;
}
