const express = require("express");
const { verifyAdminToken } = require("../middleware/verifyToken");
const router = express.Router();

const { vaccineLot } = require("./../controllers");

router
  .route("/")
  .post(verifyAdminToken, vaccineLot.create)
  .get(verifyAdminToken, vaccineLot.getAll);

router
  .route("/:vaccineLotId")
  .get(verifyAdminToken, vaccineLot.getOne)
  .put(verifyAdminToken, vaccineLot.update)
  .delete(verifyAdminToken, vaccineLot.delete);

module.exports = router;
