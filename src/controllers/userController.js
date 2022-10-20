const { CREATED } = require("http-status");
const { userService } = require("../services/userService");
const { NotFound } = require("../utils/errors/index");

class userContoller {
    async login(req, res, next) {
        try {
          const { email, password } = req.body;
          const user = await userService.login(email, password);
          res.locals.data = {
            fullName: user.fullName,
            token: user.token,
            likedItems: user.likedItems
          };
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async signup(req, res, next) {
        try {
          const { fullName, email, password } = req.body;
          const user = await userService.signup(fullName, email, password);
          res.locals.data = "User successfully registered.";
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async verify(req, res, next) {
        try {
          const { token } = req.query;
          const user = await userService.verify(token);
          res.locals.data = "Email successfully verified.";
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async token(req, res, next) {
        try {
          const { email } = req.query;
          const user = await userService.token(email);
          res.locals.data = "Token successfully sent.";
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async update(req, res, next) {
        try {
          const { token, fullName, password } = req.body;
          const user = await userService.update(token, fullName, password);
          res.locals.data = "User successfully updated.";
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async order(req, res, next) {
        try {
          const { token } = req.query;
          const { items } = req.body;
          const user = await userService.order(token, items);
          res.locals.data = "Successfully ordered.";
          return next();
        } catch (error) {
          return next(error);
        }
      }

      async like(req, res, next) {
        try {
          const { token } = req.query;
          const { item } = req.body;
          const user = await userService.like(token, item);
          res.locals.data = user;
          return next();
        } catch (error) {
          return next(error);
        }
      }
}

module.exports.userController = new userContoller;
