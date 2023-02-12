const errorHandler = (err, req, res, next) => {
  const errorCode = err.statusCode || 500;

  res.status(errorCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
