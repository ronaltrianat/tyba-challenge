const mongoose = require("mongoose");

const connect = async (config) => {
  await mongoose.connect(config.connectionString, config.options).then(
    () => {
      console.info(`Connected to database`);
    },
    (error) => {
      console.error(`Connection error: ${error.stack}`);
      process.exit(1);
    }
  );
};

module.exports = Object.assign({}, { mongoose, connect });
