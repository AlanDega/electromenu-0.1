
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
    },
    direccion: {
        type: String,
    },
    telefonos: {
        type: String,
    },
    gps_coords: {
        type: String,
    },
    img: {
        type: String,
    },
    
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('restaurant', RestaurantSchema);

