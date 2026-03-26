import { makeLogging } from "@/infra";
import { LanguagesService, type ILanguages } from ".";
import { makeGithub } from "../shared";

export const makeLanguagesService = (): ILanguages => {
  return new LanguagesService(makeLogging(), makeGithub());
};
