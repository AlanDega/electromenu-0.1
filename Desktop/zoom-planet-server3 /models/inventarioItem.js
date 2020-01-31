const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title:{
        type: String,
        required:false
    },

    is_active: {
        type: Boolean,
        required: false,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('item', ItemSchema);

