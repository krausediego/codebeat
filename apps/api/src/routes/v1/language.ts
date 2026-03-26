import Elysia from "elysia";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";
import { languagesSchema, makeLanguagesController } from "@/modules/languages";

export default new Elysia({ prefix: "/language" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeLanguagesController()), {
    auth: true,
    response: languagesSchema.response,
    detail: languagesSchema.detail,
  });
