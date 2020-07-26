const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

module.exports = function authRoutes(app) {
  router.post('/login', authController.login);
  router.post('/logout', authController.logout);
  app.use('/api/auth', router);
};