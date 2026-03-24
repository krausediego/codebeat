import { defineConfig } from "drizzle-kit";
import { envApp } from "./src/infra";

export default defineConfig({
  schema: "./src/infra/database/schema/**",
  out: "./src/infra/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: envApp.DATABASE_URL,
  },
  casing: "snake_case",
});
