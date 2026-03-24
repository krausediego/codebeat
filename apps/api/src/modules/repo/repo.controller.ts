import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IRepo } from ".";

type RepoHandler = () => IRepo;

export class RepoController implements IController {
  constructor(private readonly listReposService: RepoHandler) {}

  async handle({ data, locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.listReposService().run({
        userId: locals.user.id,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
