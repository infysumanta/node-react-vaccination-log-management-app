const express = require("express");
const { verifyToken, verifyAdminToken } = require("../middleware/verifyToken");
const router = express.Router();

const { admin } = require("./../controllers");

router.route("/").get(admin.helloAdmin);
router.route("/login").post(admin.login);

router.get("/summary", verifyAdminToken, admin.summary);

router.post("/check-token", verifyAdminToken, (_, res) => {
  res.status(200).json("Authorized");
});

module.exports = router;
