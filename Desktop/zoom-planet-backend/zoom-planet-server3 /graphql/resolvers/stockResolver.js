const Stock = require('../../models/stock');
const Restaurant = require('../../models/restaurant');

module.exports = {
  // despues qui voy a tener que utlizizar el parametro requ para pedir el id del restaurnte del usuario
  createStock: async (args) => {
    console.log('createStock')
    try {

        const stock = new Stock({
                title: args.stock.title,
                restaurant: args.stock.restaurant,
            });
        const result = await stock.save();            
        return { ...result._doc, _id: result.id };

    } catch (err) {
        throw err;
    }
  },
}
