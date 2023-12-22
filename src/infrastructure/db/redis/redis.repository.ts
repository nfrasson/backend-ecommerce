import { createClient } from "redis";
import { Injectable } from "@nestjs/common";
import { ICacheRepository } from "@domain/interfaces/cache.interface";

@Injectable()
export class RedisRepository implements ICacheRepository {
  private client: any;

  constructor() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
    await this.client.connect();
  }

  async get(key: string): Promise<string> {
    const value = await this.client.get(key);
    return value;
  }

  async set(key: string, body: string | object, ttl?: number): Promise<void> {
    const formattedBody =
      typeof body === "string" ? body :JSON.stringify(body);

    if (ttl) {
      await this.client.set(key, formattedBody, "EX", ttl.toString());
    } else {
      await this.client.set(key, formattedBody);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
