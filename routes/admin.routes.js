const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const router = express.Router();

const { admin } = require("./../controllers");

router.route("/").get(admin.helloAdmin);
router.route("/login").post(admin.login);

module.exports = router;
