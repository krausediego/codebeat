import { makeLogging, makeCacheManager } from "@/infra";
import { GithubService, IGithub } from ".";

export const makeGithub = (): IGithub => {
  return new GithubService(makeLogging(), makeCacheManager());
};
