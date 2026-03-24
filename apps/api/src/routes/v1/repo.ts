import Elysia from "elysia";
import { adaptRoute } from "../handlers";
import { repoSchema, makeRepoController } from "@/modules/repo";
import { betterAuthPlugin } from "../plugins";

export default new Elysia({ prefix: "/repos" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeRepoController()), {
    auth: true,
    response: repoSchema.response,
    detail: repoSchema.detail,
  });
