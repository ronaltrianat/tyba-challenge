const jwt = require("../util/token");
const config = require("../../../../config/config")();
const redis = require("../../../init/redis");
const messages = require("./handleMessages");
const usersModel = require("../../../common/mongodb/models/usersModel");
const util = require("../../../common/utils/util");
const { v4: uuid4 } = require("uuid");
const constants = require("../constants/authConstants");
const md5 = require("md5");
const bcrypt = require("bcrypt");

/**
 * Funcion encargada de realizar el login del usuario.
 * @param req : En este objeto viene los datos del usuario necesarios
 * para realizar el login (id, idType, password).
 */
module.exports.login = async function login(req) {
  try {
    let key = md5(`${req.body.idType}-${req.body.id}`);
    let user = await usersModel.findOne({ _id: key }).exec();

    if (!user) throw constants.USER_NOT_FOUND;
    if (!bcrypt.compareSync(req.body.password, user.password))
      throw constants.INVALID_PASSWORD;

    let uuid = uuid4();

    /*
    // TODO: pendiente agregar validacion de session ya activa.
    await redis.set(
      `${constants.USER_SESSION}:${key}`,
      {
        hashId: `${constants.USER_SESSION}:${uuid}`,
      },
      config.userSession.timeSession
    );
    */

    await redis.set(
      `${constants.USER_SESSION}:${uuid}`,
      {
        id: req.body.id,
        idType: req.body.idType,
      },
      config.userSession.timeSession
    );

    const token = jwt.createToken({ uuid: uuid });

    return {
      success: true,
      mensaje: messages.getMessage(constants.LOGIN_OK),
      token: token,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: messages.getMessage(error) };
  }
};

/**
 * Funcion encargada de realziar el logout del usuario.
 * @param {*} req La sesion se cierra a partir del header Authorization.
 */
module.exports.logout = async function logout(req) {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) throw constants.AUTH_HEADER_IS_REQUIRED;

    if (!authorization.startsWith(constants.BEARER_PREFIX))
      throw constants.AUTH_HEADER_IS_INVALID;

    let token = authorization.substring(
      constants.BEARER_PREFIX.length,
      authorization.length
    );

    let [jwtParameters, error] = await util.handle(jwt.verifyToken(token));

    if (jwtParameters && jwtParameters.uuid) {
      await redis.del(`${constants.USER_SESSION}:${jwtParameters.uuid}`);
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: messages.getMessage(error) };
  }
};

/**
 * Funcion encargada de validar la sesion de un usuario.
 * @param {*} req La sesion es validada a partir de header Authorization.
 */
module.exports.validateSession = async function validateSession(req) {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) throw constants.AUTH_HEADER_IS_REQUIRED;

    if (!authorization.startsWith(constants.BEARER_PREFIX))
      throw constants.AUTH_HEADER_IS_INVALID;

    let token = authorization.substring(
      constants.BEARER_PREFIX.length,
      authorization.length
    );

    let [jwtParameters, error] = await util.handle(jwt.verifyToken(token));
    if (error) throw constants.EXPIRED_USER_SESSION;

    let user = await redis.get(
      `${constants.USER_SESSION}:${jwtParameters.uuid}`
    );

    if (!user) throw constants.EXPIRED_USER_SESSION;

    redis.expire(
      `${constants.USER_SESSION}:${jwtParameters.uuid}`,
      config.userSession.timeSession
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: messages.getMessage(error) };
  }
};
