const jsonwebtoken = require("jsonwebtoken");
const { Admin, User } = require("../models");
const config = require("./../config");

const tokenDecode = (req) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const tokenDecoded = jsonwebtoken.verify(bearer, config.JWT_TOKEN);
      return tokenDecoded;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};

exports.verifyAdminToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const admin = await Admin.findById(tokenDecoded.id);
    if (!admin) return res.status(403).json("Not allowed!");
    req.admin = admin;
    next();
  } else {
    res.status(401).json("Unauthorized");
  }
};

exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  if (tokenDecoded) {
    const admin = await Admin.findById(tokenDecoded.id);
    const user = await User.findById(tokenDecoded.id);
    if (!admin && !user) return res.status(403).json("Not allowed!");
    req.admin = admin;
    req.user = user;
    next();
  } else {
    res.status(401).json("Unauthorized");
  }
};
