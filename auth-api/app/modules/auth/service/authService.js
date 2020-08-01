const jwt = require("jsonwebtoken");
const config = require("../../../../config/config")();
const messages = require("./handleMessages");
const usersModel = require("../../models/usersModel");

const USER_NOT_FOUND = { code: 999 };
const INVALID_PASSWORD = { code: 998 };
const LOGIN_OK = { code: 0 };

module.exports.login = async function login(req) {
  try {
    let user = await usersModel.findOne({ _id: req.idType + req.id }).exec();

    if (!user) {
      return { success: false, message: messages.getMessage(USER_NOT_FOUND) };
    }

    if (req.password !== user.password) {
      return { success: false, message: messages.getMessage(INVALID_PASSWORD) };
    }

    const payload = { check: true };
    const token = jwt.sign(payload, config.jwt.secretKey, {
      expiresIn: config.jwt.expiration,
    });

    return {
      success: true,
      mensaje: messages.getMessage(LOGIN_OK),
      token: token,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: messages.getMessage(error) };
  }
};

module.exports.logout = async function logout() {
  let response = { mensaje: "logout ok" };
  return response;
};
