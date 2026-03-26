import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { ILanguages, LanguagesSchema } from ".";

type LanguagesHandler = () => ILanguages;

export class LanguagesController implements IController {
  constructor(private readonly languagesService: LanguagesHandler) {}

  async handle({ locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.languagesService().run({
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
