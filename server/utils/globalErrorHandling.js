const operationalError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.error,
  });
};

const validationError = (err, res) => {
  let array = [];
  const key = Object.keys(err.errors);
  for (let i = 0; i < key.length; i++) {
    array.push(err.errors[key[i]].message);
  }
  res.status(400).json({
    status: "validation error",
    message: array,
    requiredField: Object.keys(err.errors),
    stack: err.errors,
  });
};

const duplicateKey = (err, res) => {
  res.status(400).json({
    status: "failed",
    message: `${
      Object.keys(err.keyValue)[0]
    } should be unique it already used by someone`,
  });
};
const fieldSignError = (err, res) => {
  res.status(400).json({
    status: "failed",
    message: `In Api query given fields is not valid`,
  });
};

const defaultError = (err, res) => {
  res.status(400).json(err);
};

module.exports = (err, req, res, next) => {
  // console.log("global error handler", { ...err });
  const error = { ...err };
  if (err.operational) return operationalError(error, res);
  if (err.code === 11000) return duplicateKey(error, res);
  if (err.code === 31253) return fieldSignError(error, res);
  if (err?._message?.endsWith("validation failed"))
    return validationError(error, res);

  defaultError(error, res);
};
