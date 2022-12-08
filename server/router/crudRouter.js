const express = require("express");
const crudController = require("../controller/crudController");

const router = express.Router();

router
  .route("/")
  .get(crudController.getAllCrud)
  .post(crudController.createCrud);
router.route("/:id").get(crudController.getOneCrud);

module.exports = router;
