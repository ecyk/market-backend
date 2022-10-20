const { Router } = require("express");
const { itemController } = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/", itemController.getAll);
itemRouter.get("/:id", itemController.get);

module.exports = { itemRouter };
