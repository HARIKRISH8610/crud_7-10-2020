const express = require("express");
const {
  deleteOneUser,
  getAllUser,
  getOneUser,
  updateOneUser,
  getMe,
} = require("../controller/userController");

const {
  signup,
  login,
  protection,
  apiAccessProtect,
  updateMyPassword,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:resetToken").patch(resetPassword);

//production for below api only
router.use(protection);
router.route("/me").get(getMe);
router.route("/updateMyPassword").patch(updateMyPassword);

// access permission for below api only
router.use(apiAccessProtect(["captain", "player"]));

router.route("/").get(getAllUser);

router.route("/:id").get(getOneUser).patch(updateOneUser).delete(deleteOneUser);

module.exports = router;
