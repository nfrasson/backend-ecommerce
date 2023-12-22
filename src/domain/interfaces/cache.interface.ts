export interface ICacheRepository {
  get(key: string): Promise<string>;
  set(key: string, body: string | object, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
}
