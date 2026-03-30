import Elysia from "elysia";
import healthCheck from "./routes/v1/health-check";
import repo from "./routes/v1/repo";
import profile from "./routes/v1/profile";
import language from "./routes/v1/language";
import pullRequest from "./routes/v1/pull-request";
import commit from "./routes/v1/commit";

const app = new Elysia({ prefix: "/api/v1" })
  .use(healthCheck)
  .use(repo)
  .use(profile)
  .use(language)
  .use(pullRequest)
  .use(commit);
export type AppType = typeof app;
