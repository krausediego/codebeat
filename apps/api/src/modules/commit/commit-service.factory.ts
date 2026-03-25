import { makeLogging } from "@/infra";
import { CommitService, type ICommit } from ".";
import { makeGithub } from "../shared";

export const makeCommitService = (): ICommit => {
  return new CommitService(makeLogging(), makeGithub());
};
