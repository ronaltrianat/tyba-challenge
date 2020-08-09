const usersService = require("../service/usersService");

exports.register = async function register(req, res, next) {
  let response = await usersService.create({ ...req.body });
  res.status(200).send(response);
};
