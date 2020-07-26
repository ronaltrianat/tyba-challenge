const jwt = require("jsonwebtoken");
const config = require("../../../../config/config")();

module.exports.login = async function login(props) {
  let response = {};
  if (props.usuario === "user" && props.contrasena === "123456") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, config.jwtSecretKey, {
      expiresIn: 1440,
    });
    response = {
      mensaje: "Autenticación correcta",
      token: token,
    };
  } else {
    response = { mensaje: "Usuario o contraseña incorrectos" };
  }
  return response;
};

module.exports.logout = async function logout() {
  let response = { mensaje: "logout ok" };
  return response;
};
