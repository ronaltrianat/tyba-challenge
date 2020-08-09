const mongoose = require("../mongodb").mongoose;

const Schema = mongoose.Schema;

const users = new Schema({
  _id: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  idType: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("users", users);
