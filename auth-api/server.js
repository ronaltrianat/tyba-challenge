"use strict";

const app = require("./app/init/app");
const config = require("./config/config")();
const redis = require("./app/init/redis");

const start = async () => {
  try {
    console.log("start redis connection");
    await redis.start(config.redis);

    console.log("start server");
    let server = await app.start({ port: config.server.port });

    console.log(
      `Server started succesfully, running on port: ${config.server.port}.`
    );

    server.on("close", () => {
      console.log("close disconect");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// start microservice
start();
