import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { ICommit, CommitSchema } from ".";

type CommitHandler = () => ICommit;

export class CommitController implements IController {
  constructor(private readonly commitService: CommitHandler) {}

  async handle({ locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.commitService().run({
        userId: locals.user.id,
        username: locals.user.username,
        token: locals.account.accessToken,
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
