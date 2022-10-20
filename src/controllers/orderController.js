const { CREATED } = require("http-status");
const { orderService } = require("../services/orderService");
const { NotFound } = require("../utils/errors/index");

class orderController {
      async getAll(req, res, next) {
        try {
          const order = await orderService.getAll();
          res.locals.data = order;
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async create(req, res, next) {
        try {
          const { token } = req.query;
          const { items } = req.body;
          const order = await orderService.create(token, items);
          res.locals.data = "successfully ordered.";
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async get(req, res, next) {
        try {
          const { id } = req.params;
          const order = await orderService.get(id);
          res.locals.data = order;
          return next();
        } catch (error) {
          return next(error);
        }
      }
}

module.exports.orderController = new orderController;
