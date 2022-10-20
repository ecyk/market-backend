const { OK } = require("http-status");

const initResponseHandler = (req, res, next) => {
  res.locals.status = OK;
  res.locals.data = null;
  return next();
};

module.exports = { initResponseHandler };
