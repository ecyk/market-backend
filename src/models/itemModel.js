var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    url: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true }
}, { collection: 'items'});

module.exports = mongoose.model('Item', ItemSchema);
