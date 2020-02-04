export const createInventario = `
mutation CreateInventario($inventarioInput:InventarioInput!){
  createInventario(
    inventarioInput:$inventarioInput
    ){
      _id
      restaurant
      items{
        _id
        item
        cantidad
      }
      title
      description
    }
  }`

export const editInventario = `
    mutation EditInventario($inventarioInput:InventarioInput!){
        editInventario(
            inventarioInput:$inventarioInput
        ){
          _id
          restaurant
          items{
            _id
            item
            cantidad
          }
          title
          description
        }
         
      }`

export const deleteInventario = `
mutation DeleteInventario($id:String!){
  deleteInventario(id:$id){
    _id
  }
}`

export const getInventarios = `query Inventarios{
  inventarios{
    title
  }
}`

export const createFood = `
  mutation CreateFood($foodInput:FoodInput!){
      createFood(
          foodInput:$foodInput
      ){
        _id
        title
        img_url
        description
        variations{
          _id
          title
          price
          addons{
            _id
            title
            description
            quantity_minimum
            quantity_maximum
            options{
              _id
              title
              price
            }
          }
        }
        category{
          _id
          title
      }
      }
    }`
    
export const getFoods = `query Foods{

    foods{
      _id
      title
      description
      img_url
      variations{
        _id
        title
        price
        addons{
          _id
          title
          description
          quantity_minimum
          quantity_maximum
          options{
            _id
            title
            price
          }
        }
      }
      category{
          _id
          title
      }
    }
  }`



export const editFood = `
    mutation EditFood($foodInput:FoodInput!){
        editFood(
            foodInput:$foodInput
        ){
          _id
          title
          img_url
          description
          variations{
            _id
            title
            price
            addons{
              _id
              title
              description
              quantity_minimum
              quantity_maximum
              options{
                _id
                title
                price
              }
            }
          }
          category{
            _id
            title
        }
        }
      }`

export const deleteFood = `
      mutation DeleteFood($id:String!){
        deleteFood(id:$id){
          _id
        }
      }`


export const getCategories = `query Categories{categories{
        _id
        title
        description
        img_menu
      }}`
export const createCategory = `
mutation CreateCategory($title:String!,$description:String!,$img_menu:String){
  createCategory(category:{title:$title,description:$description,img_menu:$img_menu}){_id}
}`

export const editCategory = `
      mutation EditCategory( $_id:String,$title:String!,$description:String!,$img_menu:String){
        editCategory(category:{_id:$_id,title:$title,description:$description,img_menu:$img_menu}){_id}
      }`

export const deleteCategory = `
      mutation DeleteCategory($id:String!){
        deleteCategory(id:$id){
          _id
        }
      }`

export const getRestaurants = `query Restaurants{restaurants{
        _id
        title
        description
        img
}}`      

export const getPromociones = `query Promociones{promociones{
        _id
        title
        description
        img
}}`      
export const createPromocion = `
  mutation CreatePromocion($title: String!, $description: String, $direccion: String,
    $img: String,
    $is_active: Boolean) {
      
    createPromocion(promocion: {
      title: $title,
      description: $description,
      img: $img,
      is_active: $is_active
    }) {
    _id
  }
}`
export const editPromocion = `
  mutation EditPromocion($_id: String, $title: String!, $description: String, $img: String, $is_active: Boolean) {

    editPromocion(promocion: {
      _id: $_id,
      title: $title,
      description: $description,
      img: $img,
      is_active: $is_active
    }) {
      _id
    }
}`

export const deletePromocion = `
  mutation DeletePromocion($id:String!){
    deletePromocion(id:$id){
      _id
    }
}`


export const createRestaurant = `
  mutation CreateRestaurant($title: String!, $description: String, $direccion: String, $telefonos: String,
    $gps_coords: String,
    $img: String,
    $is_active: Boolean) {
      
    createRestaurant(restaurant: {
      title: $title,
      description: $description,
      direccion: $direccion,
      telefonos: $telefonos,
      gps_coords: $gps_coords,
      img: $img,
      is_active: $is_active
    }) {
    _id
  }
}`
export const editRestaurant = `
  mutation EditRestaurant($_id: String, $title: String!, $description: String, $direccion: String, $telefonos: String,
    $gps_coords: String,
    $img: String,
    $is_active: Boolean) {
    editRestaurant(restaurant: {
      _id: $_id,
      title: $title,
      description: $description,
      direccion: $direccion,
      telefonos: $telefonos,
      gps_coords: $gps_coords,
      img: $img,
      is_active: $is_active
    }) {
      _id
    }
}`

export const deleteRestaurant = `
  mutation DeleteRestaurant($id:String!){
    deleteRestaurant(id:$id){
      _id
    }
}`

export const createInventory = `
  mutation CreateInventory(
    $title: String!,
    $description: String
    $is_active: Boolean) {
      
    createInventory(
      inventory: {
        title: $title,
        is_active: $is_active
    }) {
    _id
  }
}`

export const editInventory = `
  mutation EditInventory(
    $_id: String,
    $title: String!,
    $is_active: Boolean) {
    editInventory( 
      inventory: {
        _id: $_id,
        title: $title,
        is_active: $is_active
      })
    {
      _id
  }
}`




export const getOrders = `query Orders($page:Int){
  allOrders(page:$page){
    _id
    delivery_address
    delivery_charges
    order_amount
    paid_amount
    payment_method
    order_id
    user{
      _id
      name
      email
      phone
    }
    items{
      _id
      food{
        _id
        title
        description
        img_url
      }
      variation{
        _id
        title
        price
      }
      addons{
        _id
        title
        description
        quantity_minimum
        quantity_maximum
        options{
          _id
          title
          price
        }
      }
      quantity
    }
    reason
    status
    payment_status
    order_status
    createdAt
    review{
      _id
      rating
      description
    }
    rider{
      _id
      name
    }
  }
}`

export const getDashboardTotal = `query GetDashboardTotal($startingDate: String, $endingDate: String){
  getDashboardTotal(starting_date: $startingDate, ending_date: $endingDate){
    total_orders
    total_users
    total_sales
  }
}`
export const getDashboardSales = `query GetDashboardSales($startingDate: String, $endingDate: String){
  getDashboardSales(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      amount
    }
  }
}`
export const getDashboardOrders = `query GetDashboardOrders($startingDate: String, $endingDate: String){
  getDashboardOrders(starting_date: $startingDate, ending_date: $endingDate){
    orders{
      day
      count
    }
  }
}`

export const getDashboardData = `query GetDashboardData($startingDate: String, $endingDate: String){
  getDashboardData(starting_date: $startingDate, ending_date: $endingDate){
    total_orders
    total_users
    total_sales
    orders{
      day
      count
      amount
    }
  }
}`

export const getConfiguration = `query GetConfiguration{
  configuration{
    _id
    order_id_prefix
    email
    password
    enable_email
    client_id
    client_secret
    sandbox
    publishable_key
    secret_key
    delivery_charges
    currency
    currency_symbol
  }
}`

export const saveOrderConfiguration = `mutation SaveOrderConfiguration($configurationInput:OrderConfigurationInput!){
  saveOrderConfiguration(configurationInput:$configurationInput){
    _id
    order_id_prefix
  }
}`
export const saveEmailConfiguration = `mutation SaveEmailConfiguration($configurationInput:EmailConfigurationInput!){
  saveEmailConfiguration(configurationInput:$configurationInput){
    _id
    email
    password
    enable_email
  }
}`
export const saveMongoConfiguration = `mutation SaveMongoConfiguration($configurationInput:MongoConfigurationInput!){
  saveMongoConfiguration(configurationInput:$configurationInput){
    _id
    mongodb_url
  }
}`

export const savePaypalConfiguration = `mutation SavePaypalConfiguration($configurationInput:PaypalConfigurationInput!){
  savePaypalConfiguration(configurationInput:$configurationInput){
    _id
    client_id
    client_secret
    sandbox
  }
}`

export const saveStripeConfiguration = `mutation SaveStripeConfiguration($configurationInput:StripeConfigurationInput!){
  saveStripeConfiguration(configurationInput:$configurationInput){
    _id
    publishable_key
    secret_key
  }
}`
export const saveDeliveryConfiguration = `mutation SaveDeliveryConfiguration($configurationInput:DeliveryConfigurationInput!){
  saveDeliveryConfiguration(configurationInput:$configurationInput){
    _id
    delivery_charges
  }
}`
export const saveCurrencyConfiguration = `mutation SaveCurrencyConfiguration($configurationInput:CurrencyConfigurationInput!){
  saveCurrencyConfiguration(configurationInput:$configurationInput){
    _id
    currency
    currency_symbol
  }
}`

export const adminLogin = `mutation AdminLogin($email:String!,$password:String!){
  adminLogin(email:$email,password:$password){
    userId
    token
    name
    email
  }
}`

export const updateOrderStatus = `mutation UpdateOrderStatus($id:String!,$status:String!){
  updateOrderStatus(id:$id,status:$status){
    _id
    order_status
  }
}
`
export const updateStatus = `mutation UpdateStatus($id:String!,$status:Boolean!,$reason:String){
  updateStatus(id:$id,status:$status,reason:$reason){
    _id
    status
    reason
  }
}
`

export const uploadToken = `mutation UploadToken($pushToken:String!){
  uploadToken(pushToken:$pushToken){
    _id
    push_token
  }
}`

export const getUsers = `query{
  users{
    _id
    name
    email
    phone
    location{
      longitude
      latitude
      delivery_address
    }
  }
}`


export const resetPassword = `mutation ResetPassword($password:String!,$token:String!){
  resetPassword(password:$password,token:$token){
    result
  }
}`

export const createRider = `
mutation CreateRider($riderInput:RiderInput!){
    createRider(
        riderInput:$riderInput
    ){
    _id
    name
    username
    password
    phone
    image
    available
    }
  }`

export const getRiders = `query{
  riders{
    _id
    name
    username
    password
    phone
    image
    available
  }
}`

export const getAvailableRiders = `query{
  availableRiders{
    _id
    name
    username
    phone
    image
    available
  }
}`

export const editRider = `
    mutation EditRider($riderInput:RiderInput!){
        editRider(
          riderInput:$riderInput
        ){
          _id
          name
          username
          phone
          image
        }
      }`
export const deleteRider = `
      mutation DeleteRider($id:String!){
        deleteRider(id:$id){
          _id
        }
      }`

export const toggleAvailablity = `
      mutation ToggleRider($id:String){
        toggleAvailablity(id:$id){
          _id
        }
}`

export const pageCount = `
query{
  pageCount
}
`

export const assignRider = ` mutation AssignRider($id:String!,$riderId:String!){
  assignRider(id:$id,riderId:$riderId){
    _id
    rider{
      _id
      name
    }
  }
}`

export const getOrderStatuses = `query{
  getOrderStatuses
}
`

export const getPaymentStatuses = `query{
  getPaymentStatuses
}`

export const updatePaymentStatus = `mutation UpdatePaymentStatus($id:String!,$status:String!){
  updatePaymentStatus(id:$id,status:$status){
    _id
    payment_status
    paid_amount
  }
}
`

export const createOptions = `mutation CreateOptions($optionInput:[OptionInput]){
  createOptions(optionInput:$optionInput){
    _id
    title
    description
    price
  }
}`

export const getOptions = `query Options{
  options {
    _id
    title
    description
    price
  }
}
`

export const createAddons = `mutation CreateAddons($addonInput:[AddonInput]){
  createAddons(addonInput:$addonInput){
    _id
    title
    description
    options{
      _id
      title
      description
      price
    }
    quantity_minimum
    quantity_maximum
  }
}`
export const editAddon = `mutation editAddon($addonInput:AddonInput){
  editAddon(addonInput:$addonInput){
    _id
    title
    description
    options{
      _id
      title
      description
      price
    }
    quantity_minimum
    quantity_maximum
  }
}`

export const getAddons = `query Addons{
  addons{
  _id
  title
  description
  options{
    _id
    title
    description
    price
  }
  quantity_minimum
  quantity_maximum
}}`

export const deleteAddon = `
      mutation DeleteAddon($id:String!){
        deleteAddon(id:$id)
      }`

export const deleteOption = `
      mutation DeleteOption($id:String!){
        deleteOption(id:$id)
      }`
export const editOption = `mutation editOption($optionInput:OptionInput){
  editOption(optionInput:$optionInput){
          _id
          title
          description
          price
        }
      }`