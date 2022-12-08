const multer = require("multer");

const Crud = require("../model/crudModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const ObjectId = require("mongoose").Types.ObjectId.isValid;

exports.getAllCrud = catchAsync(async (req, res, next) => {
  const data = await Crud.find(req.query);
  if (!data || data?.length === 0) {
    return next(new AppError(`No data found`, 404));
  }
  res.status(200).json({
    success: true,
    result: data.length,
    data,
  });
});

exports.getOneCrud = catchAsync(async (req, res, next) => {
  if (!ObjectId(req.params.id)) {
    return next(
      new AppError(
        `Given ID is not valid ObjectId ( ${req.params.id} ), try with different id`,
        400
      )
    );
  }
  const data = await Crud.findById(req.params.id);
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

exports.createCrud = catchAsync(async (req, res, next) => {
  // multer storage
  const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({
    storage: Storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image")) return cb(null, true);
      cb(new AppError("Please give a valid image file", 400));
    },
    limits: {
      files: 1,
      fileSize: 2000000,
    },
  }).single("profilePic");

  upload(req, res, async (err) => {
    if (err) return next(new AppError(err, 400));
    console.log(req.body);
    let profilePic = null;
    console.log(req.file);
    if (req.file?.filename) {
      profilePic = {
        data: req.file.filename,
        contentType: req.file.mimetype,
      };
    }
    const data = await Crud.create({
      ...req.body,
      profilePic,
    });
    if (!data) {
      return next(new AppError(`Enter a valid data`, 400));
    }
    res.status(201).json({
      success: true,
      data,
    });
  });
});
