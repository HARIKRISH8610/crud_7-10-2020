const multer = require("multer");
const AppError = require("./AppError");
// multer storage
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports.upload = multer({
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
