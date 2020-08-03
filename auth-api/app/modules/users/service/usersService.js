const messages = require("./handleMessages");
const usersModel = require("../../../common/mongodb/models/usersModel");

const USER_REGISTER_OK = { code: 0 };

module.exports.create = async function create(req) {
  let response = {};
  try {
    await usersModel.create({ _id: req.idType + req.id, ...req });
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
