const { Router } = require("express");
const { orderController } = require("../controllers/orderController");
const orderRouter = Router();

orderRouter.get("/", orderController.getAll);
//orderRouter.post("/", orderController.create)
orderRouter.get("/:id", orderController.get);

module.exports = { orderRouter };
