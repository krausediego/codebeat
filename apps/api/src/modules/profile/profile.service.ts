import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService } from "@/modules/shared";
import type { Profile, IProfile } from ".";
import * as schema from "@/infra/database/schema";

export class ProfileService extends BaseService implements IProfile {
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run(params: Profile.Params): Promise<Profile.Response> {
    this.log("info", "Starting process profile");

    return {};
  }
}
