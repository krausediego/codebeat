import Elysia from "elysia";
import healthCheck from "./routes/v1/health-check";
import repo from "./routes/v1/repo";

const app = new Elysia({ prefix: "/api/v1" }).use(healthCheck).use(repo);

export type AppType = typeof app;
