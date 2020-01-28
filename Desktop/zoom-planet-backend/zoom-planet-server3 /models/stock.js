const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({

    restaurant: { 
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'restaurant'
    },
    items: {
        type: [mongoose.Schema.ObjectId],
        required: false,
        ref: 'stockItems'
    },
    title: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('stock', StockSchema);

