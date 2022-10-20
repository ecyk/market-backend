const responseHandler = (req, res, next) => {
    if (res.locals.data) {
      return res
        .status(res.locals.status)
        .json({ status_code: "SUCCESS", data: res.locals.data });
    }
    return next();
};

module.exports = { responseHandler };
