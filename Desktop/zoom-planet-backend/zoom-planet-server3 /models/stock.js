const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({
   
    items: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'stockItems'
    },
    title: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('stock', StockSchema);

