var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    items: [
        {
            _id : false,
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            count: { type: Number, required: true }
        }
    ]
}, { collection: 'orders'});

module.exports = mongoose.model('Order', OrderSchema);
