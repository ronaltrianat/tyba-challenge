const express = require("express");
const router = express.Router();
const usersController = require("../modules/users/controller/usersController");

module.exports = function usersRoutes(app) {
  router.post("/register-user", usersController.registerUser);
  router.post("/search-user", usersController.searchUser);
  app.use("/users", router);
};
