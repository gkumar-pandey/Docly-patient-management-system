const globalErrorHandlerMiddleware = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "something went wrong!" });
};

const pageNotFoundErrorHandlerMiddleware = (req, res) => {
  res.status(404).json({ error: "Route not found" });
};

module.exports = {
  globalErrorHandlerMiddleware,
  pageNotFoundErrorHandlerMiddleware,
};
