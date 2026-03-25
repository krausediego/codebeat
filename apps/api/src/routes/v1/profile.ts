import Elysia from "elysia";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";
import { makeProfileController, profileSchema } from "@/modules/profile";

export default new Elysia({ prefix: "/profile" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makeProfileController()), {
    auth: true,
    response: profileSchema.response,
    detail: profileSchema.detail,
  });
