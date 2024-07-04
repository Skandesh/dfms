const errorHandler = (err, req, res, next) => {
  res.status(500).json({ success: false, message: err });
};

module.exports = errorHandler;
