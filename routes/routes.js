const express = require("express");

const router = express.Router();

router.use("/admin", require("./admin.routes"));
router.use("/users", require("./user.routes"));
router.use("/places", require("./place.routes"));
router.use("/vaccines", require("./vaccine.routes"));
router.use("/vaccines/lots", require("./vaccineLot.routes"));

module.exports = router;
