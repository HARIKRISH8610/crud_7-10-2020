const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const createTokenSent = (model, res, statusCode) => {
  const createToken = jwt.sign({ id: model._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookiesOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookiesOption.secure = true;

  res.cookie("jwt_cookies", createToken, cookiesOption);

  model.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token: createToken,
    data: model,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  createTokenSent(user, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email and password should  not be empty", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("Email or password incorrect", 400));
  }
  createTokenSent(user, res, 200);
});

exports.protection = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return next(
      new AppError(
        "This API is authenticated, please provide a valid token!!",
        403
      )
    );
  }

  const tokenKey = token.split(" ")[1];
  const checkJwt = jwt.verify(tokenKey, process.env.JWT_SECRET);
  //check user is present
  const currentUser = await User.findById(checkJwt.id).select(
    "+passwordChangedAt"
  );
  if (!currentUser) {
    return next(
      new AppError(
        "This user is not belongs to this token, login again !!",
        401
      )
    );
  }

  //check currently changed password
  if (
    !(await currentUser.checkPasswordChanged(
      Math.floor(new Date(currentUser.passwordChangedAt) / 1000),
      checkJwt.iat
    ))
  ) {
    return next(
      new AppError(
        "Currently user changed the password Enter a new token or login again !!",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

exports.apiAccessProtect = (roles) =>
  catchAsync(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You are not able to access this Api for a security reason!!",
          403
        )
      );
    }
    next();
  });

//---------update password-------------//

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confrimNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confrimNewPassword) {
    return next(
      new AppError(
        "currentPassword, newPassword and confrimNewPassword should not be empty",
        400
      )
    );
  }

  const currentUser = await User.findById(req.user._id).select("+password");

  if (
    !(await currentUser.checkPassword(currentPassword, currentUser.password))
  ) {
    return next(
      new AppError(
        "Your current password is incorrect, give a correct password !!",
        400
      )
    );
  }

  currentUser.password = newPassword;
  currentUser.confrimPassword = confrimNewPassword;
  console.log(currentUser);
  await currentUser.save();

  createTokenSent(currentUser, res, 200);
});

//-----------forgot password----------//

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("email should not be empty !!", 400));
  }
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("No user found with this email !!", 400));
  }
  const resetToken = await user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      resetToken: resetToken,
      message: `Uses this /api/v1/user/resetPassword/${resetToken} to reset the password`,
    },
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { resetToken } = req.params;
  const { newPassword, confrimNewPassword } = req.body;
  const hashToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetTokenExp: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Your token is not valid or expired !!", 400));
  }
  if (!newPassword || !confrimNewPassword) {
    return next(
      new AppError("newPassword and confrimNewPassword is required", 400)
    );
  }
  user.password = newPassword;
  user.confrimPassword = confrimNewPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExp = undefined;

  await user.save();

  createTokenSent(user, res, 200);
});
