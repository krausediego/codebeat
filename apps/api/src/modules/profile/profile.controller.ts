import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { IProfile, ProfileSchema } from ".";

type ProfileHandler = () => IProfile;

export class ProfileController implements IController {
  constructor(private readonly profileService: ProfileHandler) {}

  async handle({ data, locals }: Http.IRequest<ProfileSchema.GetParams>): Promise<Http.IResponse> {
    try {
      const content = await this.profileService().run({
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
