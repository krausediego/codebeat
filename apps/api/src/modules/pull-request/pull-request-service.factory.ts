import { makeLogging } from "@/infra";
import { PullRequestService, type IPullRequest } from ".";
import { makeGithub } from "../shared";

export const makePullRequestService = (): IPullRequest => {
  return new PullRequestService(makeLogging(), makeGithub());
};
