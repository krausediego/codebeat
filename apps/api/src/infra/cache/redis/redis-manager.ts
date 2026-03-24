import Redis from "ioredis";

import { ILoggingManager } from "@/infra";

import { ICacheManager } from "..";

export class RedisManager implements ICacheManager {
  private readonly redis: Redis;

  public static readonly instance: Record<string, RedisManager> = {};

  private constructor(
    private readonly logger: ILoggingManager,
    private readonly port: number,
    private readonly host: string,
    private readonly options: Record<string, any>,
    mockRedisTest?: Redis
  ) {
    if (!mockRedisTest) {
      this.redis = new Redis(this.port, this.host, { ...this.options });
    } else {
      this.redis = mockRedisTest;
    }
  }

  public static getInstance(
    instanceName: string,
    logger: ILoggingManager,
    port: number,
    host: string,
    options: Record<string, any>,
    mockRedisTest?: Redis
  ): RedisManager {
    if (!RedisManager.instance[instanceName]) {
      RedisManager.instance[instanceName] = new RedisManager(
        logger,
        port,
        host,
        options,
        mockRedisTest
      );
    }

    return RedisManager.instance[instanceName];
  }

  public getNativeConnection(): Redis {
    return this.redis;
  }

  public async disconnect(): Promise<boolean> {
    this.logger.debug("[cache]: Redis shutdown...");
    const quited = await this.redis.quit();
    return quited === "OK";
  }

  async get(
    key: string,
    traceId: string,
    hideData = true
  ): Promise<null | string | Record<string, any>> {
    try {
      const res = await this.redis.get(key);

      if (!res) {
        this.logger.debug({ traceId, data: res }, "[cache]: Redis - GET");
        return null;
      }

      try {
        const parsedValue = JSON.parse(res);
        const data = hideData ? "<hidden>" : res;
        this.logger.debug({ traceId, data }, "[redis]: Cache - GET");

        return parsedValue;
      } catch (error) {
        this.logger.warn({ traceId, error }, "[cache]: Redis - GET");
        return res;
      }
    } catch (error) {
      this.logger.warn({ traceId, error }, "[cache]: Redis - GET");
      return null;
    }
  }

  async setEx(
    key: string,
    value: string | Record<string, any>,
    ttl: number,
    traceId: string,
    hideData = true
  ): Promise<void> {
    try {
      const parsedValue =
        typeof value !== "string" ? JSON.stringify(value) : value;

      await this.redis.set(key, parsedValue, "EX", ttl);

      const data = hideData ? "<hidden>" : parsedValue;
      this.logger.debug({ traceId, data, ttl }, "[redis]: Cache - SET EX");
    } catch (error) {
      this.logger.warn({ traceId, error }, "[cache]: Redis - SET EX");
    }
  }

  async incr(key: string, traceId: string): Promise<number> {
    try {
      const res = await this.redis.incr(key);

      if (!res) {
        this.logger.debug({ traceId, data: res }, "[cache]: Redis - INCR");
        return 0;
      }

      this.logger.debug({ traceId, data: res }, "[cache]: Redis - INCR");
      return res;
    } catch (err) {
      this.logger.warn({ traceId, error: err }, "[cache]: Redis - INCR");
      return 0;
    }
  }

  async incrBy(
    key: string,
    quantity: number,
    traceId: string
  ): Promise<number> {
    try {
      const res = await this.redis.incrby(key, quantity);

      if (!res) {
        this.logger.debug({ traceId, data: res }, "[cache]: Redis - INCRBY");
        return 0;
      }

      this.logger.debug({ traceId, data: res }, "[cache]: Redis - INCRBY");
      return res;
    } catch (err) {
      this.logger.warn({ traceId, error: err }, "[cache]: Redis - INCRBY");
      return 0;
    }
  }

  async decr(key: string, traceId: string): Promise<number> {
    try {
      const res = await this.redis.decr(key);

      if (!res) {
        this.logger.debug({ traceId, data: res }, "[cache]: Redis - DECR");
        return 0;
      }

      this.logger.debug({ traceId, data: res }, "[cache]: Redis - DECR");
      return res;
    } catch (err) {
      this.logger.warn({ traceId, error: err }, "[cache]: Redis - DECR");
      return 0;
    }
  }

  async decrBy(
    key: string,
    quantity: number,
    traceId: string
  ): Promise<number> {
    try {
      const res = await this.redis.decrby(key, quantity);

      if (!res) {
        this.logger.debug({ traceId, data: res }, "[cache]: Redis - DECRBY");
        return 0;
      }

      this.logger.debug({ traceId, data: res }, "[cache]: Redis - DECRBY");
      return res;
    } catch (err) {
      this.logger.warn({ traceId, error: err }, "[cache]: Redis - DECRBY");
      return 0;
    }
  }

  async del(key: Array<string | Buffer>, traceId: string): Promise<void> {
    try {
      const res = await this.redis.del(key);

      if (!res) {
        this.logger.debug({ traceId, data: res }, "[cache]: Redis - DEL");
        return;
      }

      this.logger.debug({ traceId }, "[redis]: Cache - DEL");
    } catch (err) {
      this.logger.warn({ traceId, error: err }, "[cache]: Redis - DEL");
    }
  }

  async keys(key: string, traceId: string): Promise<string[]> {
    try {
      const res = await this.redis.keys(key);

      if (!res) {
        this.logger.debug({ traceId, data: res }, "[cache]: Redis - KEYS");
      }

      this.logger.debug({ traceId }, "[redis]: Cache - KEYS");
      return res;
    } catch (err) {
      this.logger.warn({ traceId, error: err }, "[cache]: Redis - KEYS");
      return [];
    }
  }

  async checkConnection(): Promise<boolean> {
    const ping = await this.redis.ping();
    return ping === "PONG";
  }
}
