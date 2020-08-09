const express = require("express");
const router = express.Router();
const usersController = require("../modules/users/controller/usersController");

module.exports = function usersRoutes(app) {
  router.post("/register", usersController.register);
  app.use("/users", router);
};
