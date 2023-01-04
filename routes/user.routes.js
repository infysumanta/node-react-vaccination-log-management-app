const express = require("express");
const { verifyToken, verifyAdminToken } = require("../middleware/verifyToken");
const router = express.Router();

const { user } = require("./../controllers");

router
  .route("/")
  .post(verifyAdminToken, user.create)
  .get(verifyAdminToken, user.getAll);

router
  .route("/:userId")
  .get(verifyAdminToken, user.getOne)
  .put(verifyAdminToken, user.update)
  .delete(verifyAdminToken, user.delete);

module.exports = router;
