const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({

    restaurant: {
        type:Schema.Types.ObjectId,
        required: false,
        ref:'restaurant',
    },
    stock_item: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'stockItem'
    },

    cantidad:{
        type: Number,
        required: false
    },
    cantidad_minima:{
        type:Number,
        required: false

    },

    is_active: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('stock', StockSchema);

