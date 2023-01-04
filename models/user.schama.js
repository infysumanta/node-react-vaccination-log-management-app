const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./model.options");

const userSchema = new Schema(
  {
    idNumber: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  schemaOptions
);

const User = mongoose.model("User", userSchema);

module.exports = User;
