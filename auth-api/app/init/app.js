const express = require("express");
const bodyParser = require("body-parser");

const start = (options) => {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());

    // routes
    const authRouter = require("../modules/auth/routes/routes");
    const usersRouter = require("../modules/users/routes/routes");
    authRouter(app);
    usersRouter(app);

    const server = app.listen(options.port, () => resolve(server));
  });
};

module.exports = Object.assign({}, { start });
