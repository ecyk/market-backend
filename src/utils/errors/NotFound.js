const httpStatus = require('http-status');
const { errors } = require("../constants/errors");
const { BaseError } = require("./BaseError");

class NotFound extends BaseError {
    constructor(message) {
      super(errors.not_found, httpStatus.NOT_FOUND, message || httpStatus['404_MESSAGE']);
    }
  }

module.exports = { NotFound };
