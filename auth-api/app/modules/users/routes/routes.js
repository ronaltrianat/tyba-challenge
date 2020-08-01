const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

module.exports = function authRoutes(app) {
  router.post("/register", usersController.register);
  app.use("/api/users", router);
};
