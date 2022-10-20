const orderModel = require('../models/orderModel');
const { userModel } = require('../models/userModel');
const { BadRequest, Unauthorized } = require("../utils/errors/index");

class orderService {
      async getAll() {
        return await orderModel.find({});
      }

      async create(items) {
        return await orderModel.create({ items });
      }

      async get(id) {
        const order = await orderModel.findOne({ _id: id }).exec();
        if (!order) throw new Unauthorized("Order does not exist.");
        return order;
      }

}

module.exports.orderService = new orderService;
