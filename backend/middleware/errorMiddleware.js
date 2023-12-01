const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  res.status(500);
  res.json({
    message: error.message,
  });
};

module.exports = {
  errorHandler,
};
