const jwt = require("jsonwebtoken");
const config = require("../../../../config/config")();
const redis = require("../../../init/redis");
const messages = require("./handleMessages");
const usersModel = require("../../models/usersModel");
const { v4: uuid4 } = require("uuid");
const authConstants = require("../constants/authConstants");

module.exports.login = async function login(req) {
  try {
    let user = await usersModel
      .findOne({ _id: `${req.body.idType}${req.body.id}` })
      .exec();

    if (!user) throw authConstants.USER_NOT_FOUND;
    if (req.body.password !== user.password)
      throw authConstants.INVALID_PASSWORD;

    let uuid = uuid4();

    await redis.set(
      `${authConstants.USER_SESSION}:${uuid}`,
      {
        id: req.body.id,
        idType: req.body.idType,
      },
      config.userSession.timeSession
    );

    const payload = { uuid: uuid };
    const token = jwt.sign(payload, config.jwt.secretKey, {
      expiresIn: config.jwt.expiration,
    });

    return {
      success: true,
      mensaje: messages.getMessage(authConstants.LOGIN_OK),
      token: token,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: messages.getMessage(error) };
  }
};

module.exports.logout = async function logout(req) {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) throw authConstants.AUTH_HEADER_IS_REQUIRED;

    if (!authorization.startsWith(authConstants.BEARER_PREFIX))
      throw authConstants.AUTH_HEADER_IS_INVALID;

    let token = authorization.substring(
      authConstants.BEARER_PREFIX.length,
      authorization.length
    );

    let decoded = jwt.decode(token);
    if (decoded && decoded.uuid) {
      await redis.del(`${authConstants.USER_SESSION}:${decoded.uuid}`);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: messages.getMessage(error) };
  }
};
