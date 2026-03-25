import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService, IGithub } from "@/modules/shared";
import type { Profile, IProfile } from ".";

export class ProfileService extends BaseService implements IProfile {
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly github: IGithub,
  ) {
    super(logger);
  }

  @setTraceId
  async run({ userId, token }: Profile.Params): Promise<Profile.Response> {
    this.log("info", "Starting process profile");

    const profile = await this.github.fetch({
      userId,
      token,
      endpoint: "users/authenticated",
      args: [{}],
      traceId: this.traceId,
    });

    return profile;
  }
}
