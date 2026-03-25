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
  async run({ userId }: Repo.Params): Promise<Repo.Response> {
    this.log("info", "Starting process list-repos");

    const account = await db.query.accounts.findFirst({
      where(fields, { eq }) {
        return eq(fields.userId, userId);
      },
    });

    if (!account) {
      throw new BadRequestError("Error!!!");
    }

    const repos = await this.github.fetch({
      userId,
      token: account.accessToken!,
      endpoint: "users/repos",
      args: [{}],
    });

    return repos;
  }
}
