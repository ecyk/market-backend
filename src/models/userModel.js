var mongoose = require('mongoose');
const Joi = require('joi');

var UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
    orders: [
        {
            _id : false,
            type: mongoose.Schema.Types.ObjectId, ref: 'Order'
        }
    ],
    likedItems: [
        {
            _id : false,
            type: mongoose.Schema.Types.ObjectId, ref: 'Item'
        }
    ]
}, { collection: 'users' });

var userModel = mongoose.model('User', UserSchema);

const User = Joi.object({
    fullName: Joi.string()
    .min(6).message("fullName must be at least 6 characters")
    .max(30).message("fullName must be at most 30 characters")
    .required(),

    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).message("email is not valid"),

    password: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,24}$')).message("password is not valid")
});

async function validateUser(fullName, email, password) {
    return await User.validateAsync({ fullName, email, password });
}

module.exports = { userModel, validateUser };
