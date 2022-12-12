const express = require("express");
const crudController = require("../controller/crudController");
const { upload } = require("../utils/fileUpload");

const router = express.Router();

router
  .route("/")
  .get(crudController.getAllCrud)
  .post(upload, crudController.profilePicName, crudController.createCrud);
router
  .route("/:id")
  .get(crudController.getOneCrud)
  .patch(upload, crudController.profilePicName, crudController.updateCrud)
  .delete(crudController.deleteCrud);

module.exports = router;
