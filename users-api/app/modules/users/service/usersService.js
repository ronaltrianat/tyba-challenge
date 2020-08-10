const bcrypt = require("bcrypt");
const md5 = require("md5");
const messages = require("./handleMessages");
const usersModel = require("../../../mongodb/models/usersModel");

const USER_REGISTER_OK = { code: 0 };
const USER_NOT_FOUND = { code: 999 };
const SALT_ROUNDS = 10;

module.exports.registerUser = async function registerUser(req) {
  let response = Object.create(null);
  try {
    await usersModel.create({
      _id: md5(`${req.idType}-${req.id}`),
      password: bcrypt.hashSync(req.password, SALT_ROUNDS),
      id: req.id,
      idType: req.idType,
    });
    response = {
      success: true,
      message: messages.getMessage(USER_REGISTER_OK),
    };
  } catch (error) {
    console.error(error);
    response = { success: false, message: messages.getMessage(error) };
  }
  return response;
};

module.exports.searchUser = async function searchUser(req) {
  let response = Object.create(null);
  try {
    let user = await usersModel
      .findOne({ _id: md5(`${req.idType}-${req.id}`) })
      .exec();
    response = user
      ? { success: true, user: user }
      : { success: false, message: messages.getMessage(USER_NOT_FOUND) };
  } catch (error) {
    console.error(error);
    response = { success: false, message: messages.getMessage(error) };
  }
  return response;
};
