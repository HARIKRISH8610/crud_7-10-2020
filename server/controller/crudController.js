const Crud = require("../model/crudModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  factoryGetAll,
  factoryGetOne,
  factoryCreateOne,
  factoryUpdateOne,
  factoryDeleteOne,
} = require("./factoryController");

exports.getAllCrud = factoryGetAll(Crud, "players");

exports.getOneCrud = factoryGetOne(Crud, "players");

exports.profilePicName = catchAsync(async (req, res, next) => {
  if (req.file?.path) {
    var fullUrl = req.protocol + "://" + req.get("host");
    req.body.profilePic = `${fullUrl}/${req.file.path}`;
  } else {
    req.body.profilePic = null;
  }
  next();
});

exports.createCrud = factoryCreateOne(Crud);
exports.updateCrud = factoryUpdateOne(Crud);
exports.deleteCrud = factoryDeleteOne(Crud);
