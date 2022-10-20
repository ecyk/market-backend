const itemModel= require('../models/itemModel');
const { BadRequest, Unauthorized } = require("../utils/errors/index");

class itemService {
      async getAll() {
        return await itemModel.find({});
      }

      async get(id) {
        const item = await itemModel.findOne({ id }).exec();
        if (!item) throw new Unauthorized("Item does not exist.");
        return item;
      }

}

module.exports.itemService = new itemService;
