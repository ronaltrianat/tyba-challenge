const express = require("express");
const bodyParser = require("body-parser");

// routes
const authRouter = require("../modules/auth/routes/routes");
const usersRouter = require("../modules/users/routes/routes");

const start = async (options) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  authRouter(app);
  usersRouter(app);

  return app.listen(options.port);
};

module.exports = Object.assign({}, { start });
