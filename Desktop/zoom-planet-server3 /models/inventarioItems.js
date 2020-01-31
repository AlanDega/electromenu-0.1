const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventarioItemsSchema = new Schema({
    inventario: {
        type:Schema.Types.ObjectId,
        required: false,
        ref:'inventario',
    },
    restaurant: {
        type:Schema.Types.ObjectId,
        required: false,
        ref:'restaurant',
    },
    item: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref:'item'
    }],

    cantidad:{
        type: Number,
        required: false
    },

    is_active: {
        type: Boolean,
        required: false,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('inventarioItems', InventarioItemsSchema);

