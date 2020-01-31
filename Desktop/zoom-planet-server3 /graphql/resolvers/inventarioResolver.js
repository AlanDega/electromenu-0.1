const Stock = require('../../models/stock');
const Restaurant = require('../../models/restaurant');
const Inventario = require('../../models/inventario');
const InventarioItems = require('../../models/inventarioItems');

module.exports = {

createInventario: async (args, req) => {
    console.log('args',args.inventario)
    // console.log('createStockReq', req)
    try {
      // ESTO SERIA DEL INVENTARIO AL STOCK ITEM O STOCK QUE SON CASI LO MISMO SOLO ES OTRA REF
        const restaurant = await Restaurant.findById(args.inventario.restaurant);
        // const items = await InventarioItems.insertMany([{item:"wes"},{item:"waq"}]);

        // otra opcion es hacer desde el inicio el resolver especializado de stockItem

        const inventario = new Inventario({
                restaurant: restaurant,
            });
        const result = await inventario.save();    
        console.log('result', result)        
        return { ...result._doc, _id: result.id };
        // return result

    } catch (err) {
        throw err;
    }
  }
}