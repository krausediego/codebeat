import type { LanguagesSchema } from ".";

export interface ILanguages {
  run(params: Languages.Params): Promise<Languages.Response>;
}

export namespace Languages {
  export type Params = {
    userId: string;
    username: string;
    token: string;
    traceId: string;
  };

  export type Response = LanguagesSchema.GetResponse;

  export interface LanguageItem {
    name: string;
    bytes: number;
    percentage: number;
  }
}
