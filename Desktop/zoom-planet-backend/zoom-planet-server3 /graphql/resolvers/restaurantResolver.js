const Restaurant = require('../../models/restaurant');
const Stock = require('../../models/stock');
const { transformRestaurant } = require('./merge');
const mongoose = require('mongoose');


module.exports = {
  createRestaurant: async (args, req) => {
    console.log('createRestaurant', args)
    try {

      const stock = new Stock({
          title: args.restaurant.stock.title
      })
        const restaurant = new Restaurant({
                title: args.restaurant.title,
                stock: stock
            });
        const result = await restaurant.save();            
        return { ...result._doc, _id: result.id };

    } catch (err) {
        throw err;
    }
  },

  getRestaurant: async (args, req) => {
    console.log('getRestaurant', args)
    try {
			const restaurant = await Restaurant.findById(args.id);
			if (!restaurant) throw new Error('restaurant does not exist')
			console.log(restaurant)
			return transformRestaurant(restaurant);
		} catch (err) {
			throw err;
		}
  }
} 
