import Elysia from "elysia";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";
import { commitSchema, makeCommitController } from "@/modules/commit";

export default new Elysia({ prefix: "/commit" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeCommitController()), {
    auth: true,
    response: commitSchema.response,
    detail: commitSchema.detail,
  });
