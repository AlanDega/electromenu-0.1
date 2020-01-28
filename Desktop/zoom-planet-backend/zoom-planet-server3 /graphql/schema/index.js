const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Restaurant {
  _id: ID!
  title: String!
  stock: Stock
  description: String
  direccion: String
  telefonos: String
  gps_coords: String
  img: String
  is_active: Boolean
  createdAt: String!
  updatedAt: String!
}

type Stock {
  _id:ID!
  items:[StockItems]
  title:String!
  description:String
  is_active:Boolean!
  createdAt:String!
  updatedAt:String!
}

type StockItems {
  _id:ID!
  item:String!
  cantidad:Int!
  is_active:Boolean!
  createdAt:String!
  updatedAt:String!
}

type Item {
  _id:ID!
  quantity:Int!
  is_active:Boolean!
  createdAt: String!
  updatedAt: String!
}

type Order {
  _id: ID!
  items:[Item!]!
  createdAt: String!
  updatedAt: String!
}

input RestaurantInput{
  _id:String
  title:String!
  stock: StockInput
  description: String
  direccion: String
  telefonos: String
  gps_coords: String
  img: String
  is_active: Boolean
}

input StockInput {
  _id:String
  title: String!
  cantidad_minima: Int
}
input StockItemInput {
  _id:String
  title: String!
  cantidad_minima: Int!
}

input OrderInput {
  food:String!
  quantity:Int!
}

type RootQuery {
  stocks: [Stock!]!
  restaurants: [Restaurant!]!
  orders(offset:Int): [Order!]!
  getRestaurant(id:String): Restaurant!
}

type RootMutation {
  createOrder(orderInput: OrderInput): Order!
  createStock(stock: StockInput): Stock!
  createStockItems(item: StockItemInput): [StockItems!]
  createRestaurant(restaurant:RestaurantInput): Restaurant!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
