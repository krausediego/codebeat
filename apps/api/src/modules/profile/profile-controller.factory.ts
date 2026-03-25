import type { IController } from "@/modules/shared";
import { ProfileController, makeProfileService } from ".";

export const makeProfileController = (): IController => {
  return new ProfileController(makeProfileService);
};
