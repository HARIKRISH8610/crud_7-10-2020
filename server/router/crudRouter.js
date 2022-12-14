const express = require("express");
const crudController = require("../controller/crudController");
const { upload } = require("../utils/fileUpload");

/**
 * @swagger
 * components:
 *  schemas:
 *    crud:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - age
 *        - phoneNumber
 *      properties:
 *       name:
 *        type: string
 *        description: Name of the crud
 *       age:
 *        type: number
 *        description: Age of the person
 *       email:
 *        type: string
 *        description: email
 *       phoneNumber:
 *        type: number
 *        description: phone number
 *       profilePic:
 *        type: string
 *        description: profile picture
 *       players:
 *         type : ObjectId
 *         format: ObjectId
 *         description: add players
 */

/**
 * @swagger
 * /api/v1/crud:
 *  get:
 *    summary: Returns list of crud
 *    responses:
 *      200:
 *        description: the list of the crud
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/crud'
 */

const router = express.Router();

router
  .route("/")
  .get(crudController.getAllCrud)
  .post(
    upload,
    crudController.profilePicName,
    crudController.playersEdit,
    crudController.createCrud
  );
router
  .route("/:id")
  .get(crudController.getOneCrud)
  .patch(
    upload,
    crudController.profilePicName,
    crudController.playersEdit,
    crudController.updateCrud
  )
  .delete(crudController.deleteCrud);

module.exports = router;
