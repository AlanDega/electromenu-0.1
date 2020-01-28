const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventarioItemsSchema = new Schema({
    inventario: { 
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'inventario'
    },
    restaurante: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'restaurante'
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

module.exports = mongoose.model('inventarioItems', InventarioItemsSchema);

