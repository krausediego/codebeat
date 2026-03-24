import { envApp } from "../config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export const db = drizzle(envApp.DATABASE_URL, {
  schema,
  casing: "snake_case",
});
