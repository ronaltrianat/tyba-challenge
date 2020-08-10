const usersService = require("../service/usersService");

exports.registerUser = async function registerUser(req, res, next) {
  let response = await usersService.registerUser({ ...req.body });
  res.status(200).send(response);
};

exports.searchUser = async function searchUser(req, res, next) {
  let response = await usersService.searchUser({ ...req.body });
  res.status(200).send(response);
};