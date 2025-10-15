import { Injectable } from '@nestjs/common';
import Redis from 'ioredis'; // class
import type { Redis as RedisClient } from 'ioredis'; // type only

@Injectable()
export class RedisService {
  private readonly redisClient: RedisClient;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async addToBlacklist(token: string, expiry = 3600): Promise<void> {
    await this.redisClient.setex(token, expiry, 'blacklisted');
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const status = await this.redisClient.get(token);
    return status === 'blacklisted';
  }

  async removeFromBlacklist(token: string): Promise<void> {
    await this.redisClient.del(token);
  }
}

// @Injectable()
// export class RedisService {
//   private redisClient: RedisType;

//   constructor() {
//     // Configure your Redis connection
//     this.redisClient = new Redis({
//       host: 'localhost', // Your Redis host
//       port: 6379, // Your Redis port
//     });
//   }

//   // Add token to blacklist
//   async addToBlacklist(token: string, expiry: number = 3600): Promise<void> {
//     await this.redisClient.setex(token, expiry, 'blacklisted');
//   }

//   // Check if token is blacklisted
//   async isBlacklisted(token: string): Promise<boolean> {
//     const status = await this.redisClient.get(token);
//     return status === 'blacklisted';
//   }

//   // Remove token from blacklist
//   async removeFromBlacklist(token: string): Promise<void> {
//     await this.redisClient.del(token);
//   }
// }
