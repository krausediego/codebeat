import { ILoggingManager } from "@/infra";
import { BaseService } from "../base.service";
import { Github, IGithub } from "./github.interface";
import { Octokit } from "@octokit/rest";
import { githubEndpoints } from "./github.endpoints";
import { ICacheManager } from "@/infra/cache";

export class GithubService extends BaseService implements IGithub {
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly cache: ICacheManager,
  ) {
    super(logger);
  }

  async graphql<T>(
    userId: string,
    token: string,
    query: string,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    const key = this.cacheKey({
      userId,
      endpoint: "graphql",
      params: variables,
    });
    const ttl = 60 * 60; // 1h

    const cached = await this.cache.get(key, this.traceId);
    if (cached) {
      this.log("info", "Cache hit: graphql", { userId });
      return cached as T;
    }

    this.log("info", "GraphQL fetch", { userId, variables });

    const octokit = this.octokit({ token });
    const data = await octokit.graphql<T>(query, {
      ...variables,
      headers: { authorization: `token ${token}` },
    });

    await this.cache.setEx(key, JSON.stringify(data), ttl, this.traceId);
    this.log("info", "GraphQL cached", { userId, ttl });

    return data;
  }

  async fetch<T extends Github.GithubEndpoint>({
    userId,
    token,
    endpoint,
    args,
  }: Github.FetchParams<T>): Promise<Github.FetchResponse<T>> {
    const params = args?.[0];
    const key = this.cacheKey({ userId, endpoint, params });
    const { ttl, fetch } = githubEndpoints[endpoint];

    this.log("info", `Github fetch: ${endpoint}`, { userId, params });

    const cached = await this.cache.get(key, this.traceId);
    if (cached) {
      this.log("info", `Cache hit: ${endpoint}`, { userId });
      return cached as any;
    }

    const octokit = this.octokit({ token });
    const { data } = await (fetch as any)(octokit, params);

    await this.cache.setEx(key, data, ttl, this.traceId);
    this.log("info", `Cached: ${endpoint}`, { userId, ttl });

    return data as Github.EndpointResult<T>;
  }

  async invalidate({
    userId,
    endpoint,
  }: Github.InvalidateParams): Promise<void> {
    if (endpoint) {
      const key = this.cacheKey({ userId, endpoint });
      await this.cache.del([key], this.traceId);
      this.log("info", `Cache invalidated: ${endpoint}`, { userId });
      return;
    }

    const keys = await this.cache.keys(`github:${userId}:*`, this.traceId);
    if (keys.length) await this.cache.del(keys, this.traceId);
    this.log("info", "All cache invalidated", { userId, count: keys.length });
  }

  private octokit({ token }: Github.OctokitParams) {
    return new Octokit({ auth: token });
  }

  private cacheKey({ userId, endpoint, params }: Github.CacheKeyParams) {
    const suffix = params ? `:${JSON.stringify(params)}` : "";
    return `github:${userId}:${endpoint}${suffix}`;
  }
}
