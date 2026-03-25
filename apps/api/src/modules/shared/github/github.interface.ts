import { Octokit } from "@octokit/rest";
import { githubEndpoints } from "./github.endpoints";

export interface IGithub {
  fetch<T extends Github.GithubEndpoint>(
    params: Github.FetchParams<T>,
  ): Promise<Github.FetchResponse<T>>;
  graphql<T>(
    userId: string,
    token: string,
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T>;
  invalidate(params: Github.InvalidateParams): Promise<void>;
}

export namespace Github {
  export type GithubEndpoint = keyof typeof githubEndpoints;

  export type EndpointResult<T extends GithubEndpoint> = Awaited<
    ReturnType<(typeof githubEndpoints)[T]["fetch"]>
  >["data"];

  export type OctokitInstance = InstanceType<typeof Octokit>;

  export type EndpointParams<T extends GithubEndpoint> = Parameters<
    (typeof githubEndpoints)[T]["fetch"]
  >[1];

  export type OctokitParams = {
    token: string;
  };

  export type CacheKeyParams = {
    userId: string;
    endpoint: string;
    params?: Record<string, any>;
  };

  export type FetchParams<T extends GithubEndpoint> = {
    userId: string;
    token: string;
    endpoint: T;
    args?: EndpointParams<T> extends undefined
      ? []
      : [params: EndpointParams<T>];
    traceId?: string;
  };

  export type FetchResponse<T extends GithubEndpoint> = EndpointResult<T>;

  export type InvalidateParams = {
    userId: string;
    endpoint?: GithubEndpoint;
  };
}
