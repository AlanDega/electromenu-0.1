const Stock = require('../../models/stock');
const Restaurant = require('../../models/restaurant');
const StockItem = require('../../models/stockItem');

module.exports = {
  // despues qui voy a tener que utlizizar el parametro requ para pedir el id del restaurnte del usuario
  createStockItem: async (args, req) => {
    // console.log('createStockReq', req)
    try {
        // otra opcion es hacer desde el inicio el resolver especializado de stockItems

        const stockItem = new StockItem({
                title: args.stockItem.title,
            });

        const result = await stockItem.save();            
        return { ...result._doc, _id: result.id };

    } catch (err) {
        throw err;
    }
  },

  deleteStockItem: async ({ id }) => {
    console.log('deleteITem')
    try {
        const item = await StockItem.findById(id);
        // Actualizar las dependencias y relaciones to false
        //await Food.updateMany({ restaurant: id }, { is_active: false })
        item.is_active = false;
        const result = await item.save();
        return { ...result._doc, _id: result.id };
    } catch (err) {
        throw err;
    }
}
}
