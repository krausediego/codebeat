import type { IController } from "@/modules/shared";
import { CheckController, makeCheckService } from ".";

export const makeCheckController = (): IController => {
  return new CheckController(makeCheckService);
};
