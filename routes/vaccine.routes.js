const express = require("express");
const { verifyAdminToken } = require("../middleware/verifyToken");
const router = express.Router();

const { vaccine } = require("./../controllers");

router
  .route("/")
  .post(verifyAdminToken, vaccine.create)
  .get(verifyAdminToken, vaccine.getAll);

router
  .route("/:placeId")
  .get(verifyAdminToken, vaccine.getOne)
  .put(verifyAdminToken, vaccine.update)
  .delete(verifyAdminToken, vaccine.delete);

module.exports = router;
