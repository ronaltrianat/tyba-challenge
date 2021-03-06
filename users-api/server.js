"use strict";

const app = require("./app/app");
const config = require("./config/config")();
const mongodb = require("./app/mongodb/mongodb");

const start = async () => {
  try {
    console.log("start mongodb connection");
    await mongodb.connect(config.mongodb);

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
