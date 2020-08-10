const authService = require("../service/authService");

exports.login = async function login(req, res) {
  let response = await authService.login({ ...req.body });
  res.status(200).send(response);
};

exports.logout = async function logout(req, res) {
  let response = await authService.logout(req);
  res.status(200).send(response);
};

exports.validateSession = async function validateSession(req, res) {
  let response = await authService.validateSession(req);
  res.status(200).send(response);
};
