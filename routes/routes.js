const express = require("express");

const router = express.Router();

router.use("/admin", require("./admin.routes"));
router.use("/users", require("./user.routes"));
router.use("/places", require("./place.routes"));

module.exports = router;
