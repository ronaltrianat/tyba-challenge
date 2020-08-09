const bcrypt = require("bcrypt");
const md5 = require("md5");
const messages = require("./handleMessages");
const usersModel = require("../../../mongodb/models/usersModel");

const USER_REGISTER_OK = { code: 0 };
const SALT_ROUNDS = 10;

module.exports.create = async function create(req) {
  let response = {};
  try {
    await usersModel.create({
      _id: md5(`${req.idType}-${req.id}`),
      password: bcrypt.hashSync(req.password, SALT_ROUNDS),
      id: req.id,
      idType: req.idType,
    });
    response = {
      sucess: true,
      message: messages.getMessage(USER_REGISTER_OK),
    };
  } catch (error) {
    console.error(error);
    response = { sucess: false, message: messages.getMessage(error) };
  }
  return response;
};
