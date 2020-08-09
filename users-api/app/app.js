const express = require("express");
const bodyParser = require("body-parser");

const usersRouter = require("./routes/usersRoutes");

const start = async (options) => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  usersRouter(app);
  return app.listen(options.port);
};

module.exports = Object.assign({}, { start });
