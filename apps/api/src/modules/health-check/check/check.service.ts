import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService } from "@/modules/shared";
import type { Check, ICheck } from ".";

export class CheckService extends BaseService implements ICheck {
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run(params: Check.Params): Promise<Check.Response> {
    this.log("info", "Starting process check");

    return { message: "Tudo OK!" };
  }
}
