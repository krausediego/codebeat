export interface ICacheManager {
  get(
    key: string,
    traceId: string,
    hideData?: boolean
  ): Promise<null | string | Record<string, any>>;

  setEx(
    key: string,
    value: string | Record<string, any>,
    ttl: number,
    traceId: string,
    hideData?: boolean
  ): Promise<void>;

  incr(key: string, traceId: string): Promise<number>;

  incrBy(key: string, quantity: number, traceId: string): Promise<number>;

  decr(key: string, traceId: string): Promise<number>;

  decrBy(key: string, quantity: number, traceId: string): Promise<number>;

  del(key: Array<string | Buffer>, traceId: string): Promise<void>;

  keys(pattern: string, traceId: string): Promise<string[]>;

  checkConnection(): Promise<boolean>;

  disconnect(): Promise<boolean>;

  getNativeConnection(): unknown;
}
