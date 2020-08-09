const express = require("express");
const router = express.Router();
const authController = require("../../modules/auth/controller/authController");

module.exports.authRoutes = (app) => {
  router.post("/login", authController.login);
  router.post("/logout", authController.logout);
  router.post("/validate-session", authController.validateSession);
  app.use("/auth", router);
};
