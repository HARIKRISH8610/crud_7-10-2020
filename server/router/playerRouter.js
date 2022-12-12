const express = require("express");

const playerController = require("../controller/playerController");

const router = express.Router();

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
