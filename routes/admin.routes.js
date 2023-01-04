const express = require("express");
const router = express.Router();

const { admin } = require("./../controllers");

router.route("/").get(admin.helloAdmin);

module.exports = router;
