import { makeLogging } from "@/infra";
import { ProfileService, type IProfile } from ".";

export const makeProfileService = (): IProfile => {
  return new ProfileService(makeLogging());
};
