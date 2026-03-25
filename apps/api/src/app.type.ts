import Elysia from "elysia";
import healthCheck from "./routes/v1/health-check";
import repo from "./routes/v1/repo";
import profile from "./routes/v1/profile";

const app = new Elysia({ prefix: "/api/v1" })
  .use(healthCheck)
  .use(repo)
  .use(profile);

export type AppType = typeof app;
