const Stock = require('../../models/stock');
const Restaurant = require('../../models/restaurant');
const InventarioItems = require('../../models/inventarioItems');
const Item = require('../../models/inventarioItem');
const Inventario = require('../../models/inventario');

module.exports = {

createInventarioItems: async (args, req) => {
  console.log('args',args.items.item)
  //esITEMS!
    // console.log(args.stock.stock_item.item)
    // console.log('createStockReq', req)
    try {

      // ESTO SERIA DEL INVENTARIO AL STOCK ITEM O STOCK QUE SON CASI LO MISMO SOLO ES OTRA REF
        const inventario = await Inventario.findById(args.items.inventario);
        const item = await Item.insertMany([{title:"miitem"},{title:"2"}])
        // otra opcion es hacer desde el inicio el resolver especializado de stockItem

        const inventarioItems = new InventarioItems({
                inventario: inventario,
                item: item
            });
        const result = await inventarioItems.save();    
        console.log('result', result)   

        // return { ...result._doc, _id: result.id };
        return result

    } catch (err) {
        throw err;
    }
  }
}