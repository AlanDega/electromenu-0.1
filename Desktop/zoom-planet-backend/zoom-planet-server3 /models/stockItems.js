const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockItemsSchema = new Schema({
    stock: { 
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'stock'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'restaurant'
    },
    item: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('stockItems', StockItemsSchema);

