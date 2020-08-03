const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

module.exports = function authRoutes(app) {
  router.post("/login", authController.login);
  router.post("/logout", authController.logout);
  router.post("/validate-session", authController.validateSession);
  app.use("/api/auth", router);
};
