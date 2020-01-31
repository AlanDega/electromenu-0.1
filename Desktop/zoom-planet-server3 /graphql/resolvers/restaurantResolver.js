const Restaurant = require('../../models/restaurant');
const Stock = require('../../models/stock');
const { transformRestaurant } = require('./merge');


module.exports = {
  createRestaurant: async (args, req) => {
    console.log('createRestaurant', args)
    try {

     
        const restaurant = new Restaurant({
                title: args.restaurant.title,
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
  },

  getAllRestaurants: async(args) => {
    try {
      const restaurants = await Restaurant.find({ is_active: true });
      return restaurants.map(restaurant => {
          return transformRestaurant(restaurant);
      });
  } catch (err) {
      throw err;
  }
  },
  
  deleteRestaurant: async ({ id }) => {
    console.log('deleteRestaurant')
    try {
        const restaurant = await Restaurant.findById(id);
        // Actualizar las dependencias y relaciones to false
        //await Food.updateMany({ restaurant: id }, { is_active: false })
        restaurant.is_active = false;
        const result = await restaurant.save();
        return { ...result._doc, _id: result.id };
    } catch (err) {
        throw err;
    }
},
} 
