const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockItemSchema = new Schema({
    stock: { 
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'stock'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'restaurant'
    },
    item: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: false
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('stockItem', StockItemSchema);

