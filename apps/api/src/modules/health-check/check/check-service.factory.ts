import { makeLogging } from "@/infra";
import { CheckService, type ICheck } from ".";

export const makeCheckService = (): ICheck => {
  return new CheckService(makeLogging());
};
