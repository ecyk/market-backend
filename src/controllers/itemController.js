const { CREATED } = require("http-status");
const { itemService } = require("../services/itemService");
const { NotFound } = require("../utils/errors/index");

class itemController {
      async getAll(req, res, next) {
        try {
          const item = await itemService.getAll();
          res.locals.data = item;
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async get(req, res, next) {
        try {
          const { id } = req.params;
          const item = await itemService.get(id);
          res.locals.data = item;
          return next();
        } catch (error) {
          return next(error);
        }
      }
}

module.exports.itemController = new itemController;
