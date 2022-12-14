const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, "UserName is required"],
    // unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: ["head-coach", "coach", "captain", "player"],
    default: "player",
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
    minlength: 8,
  },
  confrimPassword: {
    type: String,
    required: [true, "confrimPassword is required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password and confrim password is not same",
    },
    select: false,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExp: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confrimPassword = undefined;
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  dbPassword
) {
  return await bcrypt.compare(enteredPassword, dbPassword);
};

userSchema.methods.checkPasswordChanged = async function (
  passwordChangedAt,
  decodedTime
) {
  if (!passwordChangedAt) return true;
  return passwordChangedAt < decodedTime;
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetTokenExp = new Date(Date.now() + 5 * 60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
