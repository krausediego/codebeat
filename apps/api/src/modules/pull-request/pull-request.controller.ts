import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IPullRequest, PullRequestSchema } from ".";

type PullRequestHandler = () => IPullRequest;

export class PullRequestController implements IController {
  constructor(private readonly pullRequestService: PullRequestHandler) {}

  async handle({ locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.pullRequestService().run({
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
