"use strict";

const messages = {
  0: "Usuario registrado correctamente.",
  11000: "Usuario ya registrado.",
  default: "Nuestros sistemas estan fallando. Intenta mas tarde.",
};

module.exports.getMessage = function getMessage(req) {
  return req && messages.hasOwnProperty(req.code)
    ? messages[req.code]
    : messages["default"];
};
