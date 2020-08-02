const redis = require("redis");
const config = require("../../config/config")();

var redisClient;

if (!redisClient) {
  console.log("start redis connection");
  redisClient = redis.createClient(config);

  redisClient.on("connect", function () {
    console.log("Connected to redis");
  });

  redisClient.on("error", (err) => {
    console.log("Redis error: ", err);
    process.exit(1);
  });
}

const get = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.hgetall(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

const set = (key, body, expire) => {
  return new Promise((resolve, reject) => {
    redisClient.hmset(key, body, (err, value) => {
      if (err) {
        reject(err);
      } else {
        redisClient.expire(key, expire);
        resolve(value);
      }
    });
  });
};

const del = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};

module.exports = Object.assign({}, { get, set, del });
