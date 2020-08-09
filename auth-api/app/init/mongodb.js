const mongoose = require("mongoose");

const connect = async (config) => {
  await mongoose
    .connect(config.connectionString, config.options)
    .catch((error) => {
      throw error;
    });
};

module.exports = Object.assign({}, { mongoose, connect });
