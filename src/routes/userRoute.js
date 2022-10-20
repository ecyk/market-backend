const { Router } = require("express");
const { userController } = require("../controllers/userController");
const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signup);
userRouter.get("/verify", userController.verify);
userRouter.get("/token", userController.token);
userRouter.post("/update", userController.update);
userRouter.post("/order", userController.order);
userRouter.post("/like", userController.like);

module.exports = { userRouter };
