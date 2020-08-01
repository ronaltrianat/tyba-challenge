"use strict";

const messages = {
  0: "Usuario autenticado exitosamente.",
  999: "Usuario no encontrado.",
  998: "La contraseña ingresada es invalida.",
  default: "Nuestros sistemas estan fallando. Intenta mas tarde.",
};

module.exports.getMessage = function getMessage(req) {
  return messages.hasOwnProperty(req.code)
    ? messages[req.code]
    : messages["default"];
};
