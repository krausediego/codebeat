import type { IController } from "@/modules/shared";
import { LanguagesController, makeLanguagesService } from ".";

export const makeLanguagesController = (): IController => {
  return new LanguagesController(makeLanguagesService);
};
