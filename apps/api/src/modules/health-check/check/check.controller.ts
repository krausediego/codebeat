import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { ICheck, CheckSchema } from ".";

type CheckHandler = () => ICheck;

export class CheckController implements IController {
  constructor(private readonly checkService: CheckHandler) {}

  async handle({ locals }: Http.IRequest): Promise<Http.IResponse> {
    try {
      const content = await this.checkService().run({
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
