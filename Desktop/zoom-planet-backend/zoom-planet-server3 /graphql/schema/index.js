const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Restaurante {
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

type Inventario {
  _id:ID!
  restaurante:Restaurante!
  items:[InventarioItems!]!
  title:String!
  description:String
  is_active:Boolean!
  createdAt:String!
  updatedAt:String!
}

type InventarioItems {
  _id:ID!
  inventario:Inventario!
  restaurante:Restaurante!
  item:String!
  cantidad:Int!
  is_active:Boolean!
  createdAt:String!
  updatedAt:String!
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

input InventarioInput {
  _id:String
  title: String!
  cantidad_minima: Int!
}

input InventarioItemInput {
  _id:String
  title: String!
  cantidad_minima: Int!
}

type RootQuery {
  inventarios: [inventario!]!
  restaurants:[Restaurant!]!

}

type RootMutation {
  createInventario(inventario: InventarioInput): Inventario!
  createInventarioItems(item: InventarioItemInput): [InventarioItems!]
  createRestaurant(restaurant:RestaurantInput): Restaurant!

}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
