const authService = require("../service/authService");

exports.login = async function login(req, res, next) {
  try {
    let response = await authService.login(req);
    res.status(200).send(response);
  } catch (e) {
    return next(e);
  }
};

exports.logout = async function logout(req, res, next) {
  try {
    let response = await authService.logout(req);
    res.status(200).send(response);
  } catch (e) {
    return next(e);
  }
};
