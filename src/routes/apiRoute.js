const { Router } = require("express");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { userRouter } = require("./userRoute");
const { itemRouter } = require("./itemRoute");
const { orderRouter } = require("./orderRoute");
const apiRouter = Router();

// authMiddleware
apiRouter.use("/users", userRouter);
apiRouter.use("/items", itemRouter);
apiRouter.use("/orders", orderRouter);

const itemModel = require("../models/itemModel");

apiRouter.use("/testitem", (req, res, next) => {
    console.log("test item");
    itemModel.create({ url: "www.google.com", title: "Elma", price: 1, type:"fruit" });
    itemModel.create({ url: "www.asd.com", title: "Armut", price: 2.3, type:"fruit" });
    itemModel.create({ url: "www.wadsd.com", title: "Karpuz", price: 4.2, type:"fruit" });
    itemModel.create({ url: "www.fdsf.com", title: "Kavun", price: 1.5, type:"fruit" });
    itemModel.create({ url: "www.gdfgdf.com", title: "Kiraz", price: 6.2, type:"fruit" });
    itemModel.create({ url: "www.wadsaf.com", title: "Portakal", price: 4.5, type:"fruit" });
    return next();
});

const orderModel = require("../models/orderModel");

apiRouter.use("/testorder", (req, res, next) => {
    console.log("test order");
    orderModel.create({ items: [{item:"61b47e4555ef006b425f9878", count: 2},{item:"61b47e4555ef006b425f9878", count: 25}] });
    return next();
});

const userModel = require("../models/userModel");

apiRouter.use("/testuser", (req, res, next) => {
    console.log("test user");
    userModel.create({ fullName: "a", email: "eddd", password: "2", role: "ad", verified: true,  orders: [ "61b484bbacbd7f929d782012",  "61b484bbacbd7f929d782012"]}, (err, results) => {
        console.log(err);
        console.log(results);
    });
    return next();
});

module.exports = { apiRouter };
