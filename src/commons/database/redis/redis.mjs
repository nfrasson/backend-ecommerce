import { createClient } from "redis";

let redisInstance = null;
const connectRedis = async () => {
  if (redisInstance) return redisInstance;

  console.log("CREATING_REDIS_CONNECTION");
  redisInstance = createClient({
    url: "redisurl",
    socket: {
      keepAlive: 50000,
      connectTimeout: 400,
      timeout: 300,
    },
  });
  const connect = redisInstance.connect();

  redisInstance.on("connect", () => console.log("@redis:connect"));
  redisInstance.on("ready", () => console.log("@redis:ready"));
  redisInstance.on("end", () => console.log("@redis:end"));
  redisInstance.on("reconnecting", () => console.log("@redis:reconnecting"));
  redisInstance.on("error", (err) => {
    if (err.message === "Connection timeout") {
      console.log("@redis:error", { message: err.message });
    } else {
      console.log("@redis:error", err, { message: err.message });
    }
  });

  await connect;
  return redisInstance;
};

const cacheGet = async (key) => {
  try {
    const redis = await connectRedis();
    const value = await redis.get(key);

    return value;
  } catch (error) {
    console.log("ERROR_IN_REDIS_GET", error, {});
    return null;
  }
};

const cacheSet = async (key, value, ttl = 86400) => {
  try {
    const redis = await connectRedis();

    if (ttl) {
      await redis.setEx(key, ttl, value);
    } else {
      await redis.set(key, value);
    }

    return value;
  } catch (error) {
    console.log("ERROR_IN_REDIS_SET", error, {});
    return null;
  }
};

const cacheExpire = async (key, ttl = 3600, mode = "GT") => {
  try {
    const redis = await connectRedis();

    await redis.expire(key, ttl, mode);
    return null;
  } catch (error) {
    console.log("ERROR_IN_REDIS_EXPIRE", error, {});
    return null;
  }
};

const cacheDelete = async (key) => {
  try {
    const redis = await connectRedis();
    await redis.del(key);

    return null;
  } catch (error) {
    console.log("ERROR_IN_REDIS_DEL", error);
    return null;
  }
};

export default {
  cacheGet,
  cacheSet,
  cacheExpire,
  cacheDelete,
};
