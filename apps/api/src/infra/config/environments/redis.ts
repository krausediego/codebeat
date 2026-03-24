import { z } from "zod";

const envSchema = z.object({
  REDIS_PORT: z.coerce.number(),
  REDIS_HOST: z.string(),
  REDIS_DB: z.coerce.number(),
  REDIS_PASS: z.string(),
});

const envRedis = envSchema.parse(Bun.env);

export { envRedis };
