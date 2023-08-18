import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

const host = process.env.REDIS_HOST || 'localhost';
const port = process.env.REDIS_PORT || '6379';

let redisClient: RedisClientType;

export async function getCacheClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: `redis://${host}:${port}`,
    });
  }

  if (redisClient.isReady) {
    return redisClient;
  }
  try {
    await redisClient.connect();
  } catch (err) {
    console.log('redis', err);
  }

  return redisClient;
}

export async function endCacheClient() {
  const client = await getCacheClient();
  if (client.isOpen) {
    await client.disconnect();
  }
}
