const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InventarioSchema = new Schema({

    restaurante: { 
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'restaurante'
    },
    items: {
        type: [mongoose.Schema.ObjectId],
        required: true,
        ref: 'inventarioItems'
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

module.exports = mongoose.model('inventario', InventarioSchema);

