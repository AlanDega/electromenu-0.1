const Stock = require('../../models/stock');
const Restaurant = require('../../models/restaurant');
const StockItem = require('../../models/stockItem');

module.exports = {
  // despues qui voy a tener que utlizizar el parametro requ para pedir el id del restaurnte del usuario
  createStock: async (args, req) => {
    console.log(args.stock.stock_item.item)
    // console.log('createStockReq', req)
    try {
      // ESTO SERIA DEL INVENTARIO AL STOCK ITEM O STOCK QUE SON CASI LO MISMO SOLO ES OTRA REF
        const restaurant = await Restaurant.findById(args.stock.restaurant);
        // otra opcion es hacer desde el inicio el resolver especializado de stockItem

        const stock = new Stock({
                restaurant: restaurant,
                // stock_item: 
                cantidad: args.stock.cantidad,
                cantidad_minima: args.stock.cantidad_minima
            });
        const result = await stock.save();    
        console.log('result', result)        
        // return { ...result._doc, _id: result.id };
        return result

    } catch (err) {
        throw err;
    }
  },

  getStocks: async (args,req ) => {
    console.log('stocks')
    try {
      const stocks = await Stock.find({ is_active: false});
      // return stocks.map(stock => {
      //   console.log('stock ' + stock.title)
      //   return stocks;
      // });
      return stocks;
    } catch (err) {
      console.log(err)
      throw err;
    }
  },

  getStock: async (args, req) => {
    console.log('getStock', args)
    try {
			const stock = await Stock.findById(args.id);
			if (!stock) throw new Error('stock does not exist')
      console.log(stock)
        return stock
			// return transformRestaurant(stock);
		} catch (err) {
			throw err;
		}
  },

  getStockItem: async (args) => {
    try{
      const stockItem = await StockItem.findById(args.id);
      if(!stockItem) throw new Error('stock item does not exist')
      console.log(stockItem)
        return stockItem
    } catch(err) {
      throw err;
    }
  }
}
