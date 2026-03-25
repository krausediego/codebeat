import { RestEndpointMethodTypes } from "@octokit/rest";
import { Github } from ".";

export const githubEndpoints = {
  "users/authenticated": {
    ttl: 60 * 60 * 24, // 24h
    fetch: (
      octokit: Github.OctokitInstance,
      params?: RestEndpointMethodTypes["users"]["getAuthenticated"]["parameters"],
    ) => octokit.rest.users.getAuthenticated({ ...params }),
  },
  "users/repos": {
    ttl: 60 * 60 * 6, // 6h
    fetch: (
      octokit: Github.OctokitInstance,
      params?: RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["parameters"],
    ) =>
      octokit.rest.repos.listForAuthenticatedUser({ per_page: 100, ...params }),
  },
  "search/commits": {
    ttl: 60 * 60,
    fetch: (
      octokit: Github.OctokitInstance,
      params: RestEndpointMethodTypes["search"]["commits"]["parameters"],
    ) =>
      octokit.rest.search.commits({
        ...params,
        q: params.q,
        per_page: 100,
        sort: "author-date",
        order: "desc",
        page: params.page ?? 1,
        headers: {
          Accept: "application/vnd.github.cloak-preview+json",
        },
      }),
  },
};
