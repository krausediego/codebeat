import type { IController } from "@/modules/shared";
import { CommitController, makeCommitService } from ".";

export const makeCommitController = (): IController => {
  return new CommitController(makeCommitService);
};
