const jwt = require("jsonwebtoken");
const config = require("../../../../config/config")();

exports.createToken = (payload) =>
  jwt.sign(payload, config.jwt.secretKey, {
    expiresIn: config.jwt.expiration,
  });

exports.verifyToken = (token) => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.jwt.secretKey, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );
};
