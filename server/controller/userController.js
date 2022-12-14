const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  factoryCreateOne,
  factoryGetAll,
  factoryGetOne,
  factoryUpdateOne,
  factoryDeleteOne,
} = require("./factoryController");

exports.getAllUser = factoryGetAll(User);
exports.getOneUser = factoryGetOne(User);
exports.updateOneUser = factoryUpdateOne(User);
exports.deleteOneUser = factoryDeleteOne(User);

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});
