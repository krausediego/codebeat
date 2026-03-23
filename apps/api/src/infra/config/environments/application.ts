import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  WEB_BASE_URL: z.url(),
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
});

const envApp = envSchema.parse(Bun.env);

export { envApp };
