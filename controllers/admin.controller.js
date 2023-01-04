const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Admin } = require("./../models");
const config = require("./../config");

exports.helloAdmin = (req, res) => {
  res.send("Hello Admin");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username: username });
    if (admin && (await bcrypt.compare(admin.password, password))) {
      const token = await jwt.sign({ id: admin.id }, config.JWT_TOKEN, {
        expiresIn: "30d",
      });
      res.status(200).json({ admin, token });
    }
    return res.status(401).send("Wrong Username");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
