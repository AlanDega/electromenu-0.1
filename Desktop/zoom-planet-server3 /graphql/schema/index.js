const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Restaurant {
  _id: ID!
  title: String!
  description: String
  direccion: String
  telefonos: String
  gps_coords: String
  img: String
  is_active: Boolean
  createdAt: String!
  updatedAt: String!
}

input OrderInput {
  food:String!
  quantity:Int!
}

input RestaurantInput{
  _id:String
  title:String!
  description: String
  direccion: String
  telefonos: String
  gps_coords: String
  img: String
  is_active: Boolean
}

type Order {
  _id: ID!
# items:[Item!]!
  createdAt: String!
  updatedAt: String!
}

type Stock{
  _id:ID
  #aquí se hace la ref al objeto para obtener esta info
  stock_item:StockItem
  restaurant:Restaurant
  cantidad:Int
  cantidad_minima:Int
  is_active:Boolean
  createdAt:String!
  updatedAt:String!
}

# hace ref al typo para que se pueda conectar con otros elementos 
type StockItem {
  _id:ID
  item:String!
  description:String
  cantidad_minima:Int
  is_active:Boolean
  createdAt:String!
  updatedAt:String!
}

type RecetaItem {
  _id:ID!
  quantity:Int!
  is_active:Boolean!
  createdAt: String!
  updatedAt: String!
}

type Inventario {
  _id:ID!
  restaurant:Restaurant
  items:[InventarioItems]
  title:String
  is_active:Boolean!
  createdAt:String!
  updatedAt:String!
}

type InventarioItems {
  _id:ID!
  inventario:Inventario
  restaurant:Restaurant
  item:InventarioItem
  cantidad:Int
  is_active:Boolean
  createdAt:String!
  updatedAt:String!
}

type InventarioItem {
  _id:ID!
  title:String
  is_active:Boolean
  createdAt:String!
  updatedAt:String!
}


input StockInput {
  _id: String
  stock_item:StockItemInput
  restaurant:RestaurantInput
  cantidad:Int
  cantidad_minima:Int
  is_active: Boolean
}

input StockItemInput {
  _id:String
  item: String!
  is_active: Boolean
}


input InventarioInput {
  restaurant: String
  items: InventarioItemsInput
  title:String
  description:String
  is_active:Boolean

}

input InventarioItemsInput {
  inventario: String
  item: [InventarioItemInput]
  cantidad:Int
  is_active:Boolean
}

input InventarioItemInput {
  title: String
  is_active:Boolean
}


type RootQuery {
  getAllRestaurants: [Restaurant!]!
  getRestaurant(id:String): Restaurant!
  getStocks: [Stock!]!
  getStock(id:String): Stock!
  getStockItem(id:String): StockItem!
  orders(offset:Int): [Order!]!
}

type RootMutation {
  createRestaurant(restaurant:RestaurantInput): Restaurant!
  deleteRestaurant(id:String): Restaurant!
  createInventario(inventario:InventarioInput): Inventario!
  createInventarioItems(items:InventarioItemsInput): InventarioItems!
  createInventarioItem(item:InventarioItemInput): InventarioItem!
  createOrder(orderInput:OrderInput): Order!
  createStockItem(item:StockItemInput): StockItem!
  deleteStockItem(id:String): StockItem!
  createStock(stock:StockInput): Stock!

}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
