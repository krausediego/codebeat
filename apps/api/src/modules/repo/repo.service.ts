import { setTraceId } from "@/helpers";
import { BadRequestError, db, type ILoggingManager } from "@/infra";
import { BaseService, IGithub } from "@/modules/shared";
import type { Repo, IRepo } from ".";

export class RepoService extends BaseService implements IRepo {
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly github: IGithub,
  ) {
    super(logger);
  }

  @setTraceId
  async run({ userId, token }: Repo.Params): Promise<Repo.Response> {
    this.log("info", "Starting process list-repos");

    const repos = await this.github.fetch({
      userId,
      token,
      endpoint: "users/repos",
      args: [{}],
      traceId: this.traceId,
    });

    return { data: repos };
  }
}
