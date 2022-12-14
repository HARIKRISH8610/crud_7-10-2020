const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/ApiFeatures");
const catchAsync = require("../utils/catchAsync");
const ObjectId = require("mongoose").Types.ObjectId.isValid;

exports.factoryGetAll = (Model, populate, key) =>
  catchAsync(async (req, res, next) => {
    const newData = new ApiFeatures(
      Model.find().populate(populate, key),
      req.query
    )
      .filter()
      .sort()
      .fields()
      .pagination();
    const data = await newData.query;
    if (!data || data?.length === 0) {
      return next(new AppError(`No data found`, 404));
    }
    res.status(200).json({
      success: true,
      result: data.length,
      data: data,
    });
  });

exports.factoryGetOne = (Model, populate) =>
  catchAsync(async (req, res, next) => {
    if (!ObjectId(req.params.id)) {
      return next(
        new AppError(
          `Given ID is not valid ObjectId ( ${req.params.id} ), try with different id`,
          400
        )
      );
    }
    const data = await Model.findById(req.params.id).populate(populate);
    if (!data) {
      return next(
        new AppError(
          `Their is no data with respect to this ID (${req.params.id})`,
          404
        )
      );
    }
    res.status(200).json({
      success: true,
      data,
    });
  });

exports.factoryCreateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);

    if (!data) {
      return next(new AppError(`Enter a valid data`, 400));
    }
    res.status(201).json({
      success: true,
      data,
    });
  });

exports.factoryUpdateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (!ObjectId(req.params.id)) {
      return next(
        new AppError(
          `Given ID is not valid ObjectId ( ${req.params.id} ), try with different id`,
          400
        )
      );
    }
    if (req.body === {}) {
      return next(new AppError(`Give any data to update`, 400));
    }

    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!data) {
      return next(new AppError("No data found with this ID", 400));
    }
    res.status(200).json({
      success: true,
      data,
    });
  });

exports.factoryDeleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndRemove(req.params.id);
    if (!data) {
      return next(new AppError("No data found with this ID", 400));
    }
    res.status(204).json({});
  });
