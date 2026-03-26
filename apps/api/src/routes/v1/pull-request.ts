import Elysia from "elysia";
import { adaptRoute } from "../handlers";
import { betterAuthPlugin } from "../plugins";
import {
  makePullRequestController,
  pullRequestSchema,
} from "@/modules/pull-request";

export default new Elysia({ prefix: "/pull-request" })
  .use(betterAuthPlugin)
  .get("/", adaptRoute(makePullRequestController()), {
    auth: true,
    response: pullRequestSchema.response,
    detail: pullRequestSchema.detail,
  });
