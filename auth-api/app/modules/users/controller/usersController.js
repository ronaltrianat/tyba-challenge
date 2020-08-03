const usersService = require("../service/usersService");

exports.register = async function register(req, res, next) {
  try {
    let response = await usersService.create({ ...req.body });
    res.status(200).send(response);
  } catch (e) {
    return next(e);
  }
};