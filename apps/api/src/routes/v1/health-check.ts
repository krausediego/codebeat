import Elysia from "elysia";
import { adaptRoute } from "../handlers";
import { checkSchema, makeCheckController } from "@/modules/health-check";

export default new Elysia({ prefix: "/health-check" }).get(
  "/",
  adaptRoute(makeCheckController()),
  {
    response: checkSchema.response,
    detail: checkSchema.detail,
  }
);
