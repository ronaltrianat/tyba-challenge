"use strict";

const messages = {
  0: "Usuario autenticado exitosamente.",
  999: "Usuario no encontrado.",
  998: "La contraseña ingresada es invalida.",
  997: "the authorization header was not sent.",
  996: "the authorization header is invalid.",
  995: "expired user session.",
  default: "Nuestros sistemas estan fallando. Intenta mas tarde.",
};

module.exports.getMessage = function getMessage(req) {
  return req && messages.hasOwnProperty(req.code)
    ? messages[req.code]
    : messages["default"];
};
