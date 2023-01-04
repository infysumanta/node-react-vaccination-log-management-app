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

// add vaccinated to user
router.post("/vaccinated", verifyAdminToken, user.checkinPlace);

router.get("/:userId/place", verifyToken, user.getAllPlace);

router.post("/checkin-place", verifyToken, user.checkinPlace);
// place that user visited
router.get("/:userId/place-visited", verifyToken, user.placeVisited);
module.exports = router;
