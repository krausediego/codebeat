import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService, IGithub } from "@/modules/shared";
import type { Languages, ILanguages } from ".";

export class LanguagesService extends BaseService implements ILanguages {
  constructor(
    protected readonly logger: ILoggingManager,
    private readonly github: IGithub,
  ) {
    super(logger);
  }

  @setTraceId
  async run({
    userId,
    username,
    token,
  }: Languages.Params): Promise<Languages.Response> {
    this.log("info", "Starting process languages", { username });

    const repos = await this.github.fetch({
      userId,
      token,
      endpoint: "users/repos",
      args: [
        {
          visibility: "all",
          affiliation: "owner,collaborator,organization_member",
          per_page: 100,
        },
      ],
    });

    this.log("info", "Repos fetched", { count: repos.length });

    const languageResults = await Promise.all(
      repos
        .filter((repo) => repo.language !== null)
        .map((repo) =>
          this.github
            .fetch({
              userId,
              token,
              endpoint: "repos/languages",
              args: [{ owner: username, repo: repo.name }],
            })
            .catch(() => ({}) as Record<string, number>),
        ),
    );

    const aggregated = new Map<string, number>();

    for (const result of languageResults) {
      for (const [lang, bytes] of Object.entries(result)) {
        aggregated.set(lang, (aggregated.get(lang) ?? 0) + bytes);
      }
    }

    const totalBytes = Array.from(aggregated.values()).reduce(
      (a, b) => a + b,
      0,
    );

    const languages: Languages.LanguageItem[] = Array.from(aggregated.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: Math.round((bytes / totalBytes) * 100 * 10) / 10,
      }));

    this.log("info", "Languages aggregated", {
      count: languages.length,
      totalBytes,
    });

    return { languages, totalBytes };
  }
}
