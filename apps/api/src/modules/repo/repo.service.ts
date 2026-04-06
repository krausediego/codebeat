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

    const allRepos: Repo.GithubReposResponse = [];
    let page = 1;

    while (true) {
      const data = await this.github.fetch({
        userId,
        token,
        endpoint: "users/repos",
        args: [
          {
            per_page: 100,
            page,
            sort: "pushed",
            direction: "desc",
            affiliation: "owner,collaborator,organization_member",
            visibility: "all",
          },
        ],
        traceId: this.traceId,
      });

      allRepos.push(...data);

      if (data.length < 100) break;
      page++;
    }

    this.log("info", "All repos fetched", { userId, total: allRepos.length });

    return { data: allRepos, total: allRepos.length };
  }
}
