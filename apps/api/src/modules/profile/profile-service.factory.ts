import { makeLogging } from "@/infra";
import { ProfileService, type IProfile } from ".";
import { makeGithub } from "../shared";

export const makeProfileService = (): IProfile => {
  return new ProfileService(makeLogging(), makeGithub());
};
