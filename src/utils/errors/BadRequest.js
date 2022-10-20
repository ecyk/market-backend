const httpStatus = require('http-status');
const { errors } = require("../constants/errors");
const { BaseError } = require("./BaseError");

class BadRequest extends BaseError {
  constructor(message) {
    super(errors.validation, httpStatus.BAD_REQUEST, message || httpStatus['400_MESSAGE']);
  }
}

module.exports = { BadRequest };
