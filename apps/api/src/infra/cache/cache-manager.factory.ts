import { envRedis, makeLogging } from "@/infra";

import { ICacheManager } from "./cache.interface";
import { RedisManager } from "./redis";

export const makeCacheManager = (): ICacheManager => {
  return RedisManager.getInstance(
    "APP",
    makeLogging(),
    envRedis.REDIS_PORT,
    envRedis.REDIS_HOST,
    {
      lazyConnect: true,
      db: envRedis.REDIS_DB,
      password: envRedis.REDIS_PASS,
    }
  );
};
