class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.statusCode = status;
    this.status = `${status}`.startsWith(4) ? "Failed" : "Error";
    this.error = message;
    this.operational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
