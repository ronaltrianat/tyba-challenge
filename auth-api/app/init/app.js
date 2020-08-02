const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");
const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

// routes
const authRouter = require("../modules/auth/routes/routes");
const usersRouter = require("../modules/users/routes/routes");

const start = (options) => {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());

    authRouter(app);
    usersRouter(app);

    const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, { start });
