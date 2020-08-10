const express = require("express");
const bodyParser = require("body-parser");

const authRouter = require("../modules/auth/routes/routes");

const start = async (options) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  authRouter(app);

  return app.listen(options.port);
};

module.exports = Object.assign({}, { start });
