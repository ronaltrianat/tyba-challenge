const redis = require("redis");

var redisClient = Object.create(null);

const start = (config) => {
  return new Promise((resolve, reject) => {
    redisClient = redis.createClient(config);
    redisClient.on("connect", () => resolve());
    redisClient.on("error", (err) => reject(err));
  });
};

const get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.hgetall(key, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const set = (key, body, expire) => {
  return new Promise((resolve, reject) => {
    redisClient.hmset(key, body, (err, value) => {
      if (err) reject(err);
      else {
        redisClient.expire(key, expire);
        resolve(value);
      }
    });
  });
};

const del = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const expire = (key, expire) => {
  redisClient.expire(key, expire);
};

module.exports = Object.assign({}, { get, set, del, expire, start });
