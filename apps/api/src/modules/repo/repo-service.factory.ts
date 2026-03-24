import { makeLogging } from "@/infra";
import { RepoService, type IRepo } from ".";
import { makeGithub } from "@/modules/shared";

export const makeRepoService = (): IRepo => {
  return new RepoService(makeLogging(), makeGithub());
};
