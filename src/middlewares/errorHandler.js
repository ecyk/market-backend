const { INTERNAL_SERVER_ERROR } = require("http-status");
const { MongoError } = require('mongoose').mongo;
const { JsonWebTokenError } = require('jsonwebtoken');
const { errors } = require("../utils/constants/errors");
const { BaseError } = require("../utils/errors/BaseError");

const errorHandler = (err, req, res, next) => {
  // let status_code = INTERNAL_SERVER_ERROR;
  // let type = errors.server;
  // let message = err.message;
    if (err instanceof BaseError) {
        return res
        .status(err.statusCode)
        .json({ status_code: "FAILED", type: err.type, message: err.message });
    }

    if(err instanceof MongoError) {
      let message = err.message;
      if(err.code == 11000) { // duplicate key error
        message = "User already exist.";
      }

      return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status_code: "FAILED", type: errors.server, message });
    }

    if(err instanceof JsonWebTokenError) {
      message = "token is invalid.";

      return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status_code: "FAILED", type: errors.server, message });
    }

    return res
    .status(INTERNAL_SERVER_ERROR)
    .json({ status_code: "FAILED", type: errors.server, message: err.message });
}

module.exports = { errorHandler };
