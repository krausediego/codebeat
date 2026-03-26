import type { IController } from "@/modules/shared";
import { PullRequestController, makePullRequestService } from ".";

export const makePullRequestController = (): IController => {
  return new PullRequestController(makePullRequestService);
};
