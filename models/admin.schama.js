const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { schemaOptions } = require("./model.options");

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  schemaOptions
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
