import type { IController } from "@/modules/shared";
import { RepoController, makeRepoService } from ".";

export const makeRepoController = (): IController => {
  return new RepoController(makeRepoService);
};
