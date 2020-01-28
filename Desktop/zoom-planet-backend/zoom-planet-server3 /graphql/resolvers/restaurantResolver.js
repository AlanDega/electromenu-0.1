const Restaurant = require('../../models/restaurant');
const Stock = require('../../models/stock');
const { transformRestaurant } = require('./merge');
const mongoose = require('mongoose');


module.exports = {
  createRestaurant: async (args, req) => {
    console.log('createRestaurant', req)
    try {

        const restaurant = new Restaurant({
                title: args.restaurant.title,
                stock:args.restaurant.stock
            });
        const result = await restaurant.save();            
        return { ...result._doc, _id: result.id };

    } catch (err) {
        throw err;
    }
  },
}
