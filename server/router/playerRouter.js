const express = require("express");

const playerController = require("../controller/playerController");
const {
  protection,
  apiAccessProtect,
} = require("../controller/authController");

const router = express.Router();

router.use(protection, apiAccessProtect(["player"]));

router
  .route("/")
  .get(playerController.getAllPlayers)
  .post(playerController.createOnePlayer);
router
  .route("/:id")
  .get(playerController.getOnePlayer)
  .patch(playerController.updateOnePlayer)
  .delete(playerController.deleteOnePlayer);

module.exports = router;
