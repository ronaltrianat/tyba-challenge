"use strict";

const app = require("./app/init/app");
const config = require("./config/config")();
const db = require("./app/init/db");

const start = async () => {
  try {
    console.log("start db connection");
    await db.connect(config.db);
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
  }
};

// start microservice
start();
