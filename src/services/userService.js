const argon2 = require('argon2');
const { nanoid } = require("nanoid");
const jwt = require('jsonwebtoken');

const { userModel, validateUser } = require('../models/userModel');
const { BadRequest, Unauthorized } = require("../utils/errors/index");
const { mailer } = require("../mailer");
mailer.initMailer();

const { orderService } = require('./orderService');


class userService {
      async login(email, password) {
        const user = await userModel.findOne({ email }).exec();
        if (!user) throw new Unauthorized("User does not exist.");


        let token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);


        if(user && await argon2.verify(user.password, password)) {
           user.token = token;
        }
        else {
          throw new Unauthorized("The email address or password is incorrect. Please try again.");
        }

        if(!user.verified) {
          await mailer.sendVerificationMail(user.email, token);
          throw new Unauthorized("We've sent verification email, please verify your email account.");
        }

        return user;
      }

      async signup(fullName, email, password) {
        //await validateUser(fullName, email, password);
        const hash = await argon2.hash(password);
        return await userModel.create({ fullName, email, password: hash, verified: true });
      }

      async verify(token) {
        let user = await jwt.verify(token, process.env.JWT_SECRET);
        return await userModel.findOneAndUpdate({ _id: user.id }, { verified: true });
      }

      async token(email) {
        const user = await userModel.findOne({ email }).exec();
	console.log(user);
	;
        if (!user) throw new Unauthorized("User does not exist.");
        if(!user.verified) throw new Unauthorized("This email is not verified there is no way to recover this account :(.");

        let token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        await mailer.sendTokenMail(user.email, token);
      }

      async update(token, fullName, password) {
        let user = await jwt.verify(token, process.env.JWT_SECRET);

        fullName = (fullName || user.fullName);
        if(password) {
          password = await argon2.hash(password);
        } else {
          password = user.password;
        }

        return await userModel.findOneAndUpdate({ _id: user.id }, { fullName, password });
      }

      async getUserFromToken(token) {
        let user = await jwt.verify(token, process.env.JWT_SECRET);
        return await userModel.findOne({ _id: user.id });
      }

      async order(token, items) {
        let user = await this.getUserFromToken(token);
        let order = await orderService.create(items);

        await userModel.updateOne({ _id: user._id }, { $push: { orders: order } });
      }

      async like(token, item) {
        let user = await this.getUserFromToken(token);
        if(!(await userModel.updateOne({ _id: user._id }, {
          $pullAll: {
            likedItems: [item],
          },
        })).modifiedCount) {
          await userModel.updateOne({ _id: user._id }, { $push: { likedItems: item } });
          return "Item liked.";
        }
        return "Item disliked.";
      }
}

module.exports.userService = new userService;
