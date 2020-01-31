
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({

    title: { 
        type: String,
        required: true,
    },
    stock: { 
        type: Schema.Types.ObjectId,
        required: false,
        ref:'stock'
    },
    description: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: false

    },
    telefonos: {
        type: String,
        required: false

    },
    gps_coords: {
        type: String,
        required: false

    },
    img: {
        type: String,
        required: false

    },
    
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('restaurant', RestaurantSchema);

