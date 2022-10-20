const httpStatus = require('http-status');
const { errors } = require("../constants/errors");
const { BaseError } = require("./BaseError");

class Unauthorized extends BaseError {
    constructor(message) {
      super(errors.not_authenticated, httpStatus.UNAUTHORIZED, message || httpStatus['401_MESSAGE']);
    }
  }

module.exports = { Unauthorized };
