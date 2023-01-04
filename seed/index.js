const bcrypt = require("bcryptjs");
const { Admin } = require("../models");
const config = require("../config");

const username = config.DEFAULT_ADMIN_USERNAME;
const password = config.DEFAULT_ADMIN_PASSWORD;

exports.createAdmin = async () => {
  try {
    const admin = await Admin.findOne({ username: username });
    if (admin !== null) return true;

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username: username,
      password: hasedPassword,
    });
    await newAdmin.save();
    console.log("=============================");
    console.log("Admin Account Created with");
    console.log(`Username => ${username}`);
    console.log(`Username => ${password}`);
    console.log("=============================");
  } catch (error) {
    console.log(error);
  }
};
