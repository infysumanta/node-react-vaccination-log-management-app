const express = require("express");
const { verifyToken, verifyAdminToken } = require("../middleware/verifyToken");
const router = express.Router();

const { place } = require("./../controllers");

router
  .route("/")
  .post(verifyToken, place.create)
  .get(verifyAdminToken, place.getAll);

router
  .route("/:placeId")
  .get(verifyToken, place.getOne)
  .put(verifyToken, place.update)
  .delete(verifyToken, place.delete);

module.exports = router;
