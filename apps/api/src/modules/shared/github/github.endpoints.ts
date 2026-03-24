import { RestEndpointMethodTypes } from "@octokit/rest";
import { Github } from ".";

export const githubEndpoints = {
  "users/authenticated": {
    ttl: 60 * 60 * 24, // 24h
    fetch: (octokit: Github.OctokitInstance) =>
      octokit.rest.users.getAuthenticated(),
  },
  "users/repos": {
    ttl: 60 * 60 * 6, // 6h
    fetch: (
      octokit: Github.OctokitInstance,
      params?: RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["parameters"],
    ) =>
      octokit.rest.repos.listForAuthenticatedUser({ per_page: 100, ...params }),
  },
};
