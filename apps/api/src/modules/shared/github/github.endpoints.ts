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
  "repos/languages": {
    ttl: 60 * 60 * 6, // 6h
    fetch: (
      octokit: Github.OctokitInstance,
      params: RestEndpointMethodTypes["repos"]["listLanguages"]["parameters"],
    ) =>
      octokit.rest.repos.listLanguages({
        ...params,
      }),
  },
  "search/pull-requests": {
    ttl: 60 * 60 * 2, // 2h
    fetch: (
      octokit: Github.OctokitInstance,
      params: RestEndpointMethodTypes["search"]["issuesAndPullRequests"]["parameters"],
    ) =>
      octokit.rest.search.issuesAndPullRequests({
        ...params,
        per_page: 100,
        sort: "created",
        order: "desc",
      }),
  },
};
