const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventarioSchema = new Schema({

    restaurant: {
        type:Schema.Types.ObjectId,
        required: false,
        ref:'restaurant',
    },
    items: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'inventarioItems'
    },

    title:{
        type: String,
        required: false
    },
    cantidad_minima:{
        type:Number,
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

module.exports = mongoose.model('inventario', InventarioSchema);

