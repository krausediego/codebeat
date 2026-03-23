import Elysia from "elysia";
import healthCheck from "./routes/v1/health-check";

const app = new Elysia({ prefix: "/api/v1" }).use(healthCheck);

export type AppType = typeof app;
