const Restaurant = require('../../models/restaurant');

module.exports = {
  restaurantByIds: async (args) => {
    console.log('foodByIds')
    try {
      const restaurants = await Restaurant.find({ _id: { $in: args.ids }, is_active: true });
      return restaurants
    } catch (err) {
      console.log(err)
      throw err;
    }
  },
  restaurants: async () => {
    console.log('restaurants')
    try {
      const restaurants = await Restaurant.find({ is_active: true });
      return restaurants
      
    } catch (err) {
      console.log(err)
      throw err;
    }
  },
  
  restaurantSearch: async (args, req) => {
    console.log('restaurantSearch')
    console.log('filter ' + args.filter)
    try {
      //const foods = await Food.find({ $text: {$search: args.filter}, is_active: true });
      const restaurants = await Restaurant.find({
        $or: [
          {title: { $regex: args.filter, $options: 'i'}},
          {description: { $regex: args.filter, $options: 'i'}},
        ],
        is_active: true
        });
      
      return foods.map(food => {
        return transformFood(food);
      });
    } catch (err) {
      console.log(err)
      throw err;
    }
  },
  createFood: async (args, req) => {
    console.log('createFood')
    const insertedIVariations = await Variation.insertMany(args.foodInput.variations)
    const insertedIds = insertedIVariations.filter(variations => variations.id)
    const food = new Food({
      title: args.foodInput.title,
      description: args.foodInput.description,
      category: args.foodInput.category,
      img_url: args.foodInput.img_url,
      variations: insertedIds
    });
    let createdFood;
    try {
      const result = await food.save();
      createdFood = transformFood(result);

      return createdFood;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },  
  editFood: async (args, req) => {
    
    console.log('EDITAR ID: ' + args.foodInput._id)
    console.log('CAT ID: ' + args.foodInput.category)

    const insertedIVariations = await Variation.insertMany(args.foodInput.variations)
    const insertedIds = insertedIVariations.filter(variations => variations.id)

    let food = await Food.findOne({ _id: args.foodInput._id })
    
    food.title = args.foodInput.title
    food.description = args.foodInput.description
    food.category = args.foodInput.category
    food.img_url = args.foodInput.img_url
    food.variations = insertedIds

    let updatedFood;
    try {
      const result = await food.save();
        console.log('GUARDADO: ' + result);      
      updatedFood = transformFood(result);
        console.log('GUARDADO TRANSFORM: ' + JSON.stringify(updatedFood));
      return updatedFood;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  likeFood: async (args, req) => {
    console.log(args)
    if (!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    try {
      const food = await Food.findById(args.foodId)
      const user = await User.findById(req.userId)
      if (!food || !user) {
        throw new Error('invalid request')
      }
      const index = user.likes.indexOf(args.foodId)
      
      let liked = false;
      if (index < 0) {
        user.likes.push(args.foodId)
        food.likes = Number(food.likes + 1)
        liked = true
      }
      else {
        user.likes.splice(index, 1)
        food.likes = Number(food.likes - 1)
        liked = false
      }
      await user.save()
      const result = await food.save()
      result.liked = liked 
      return transformFood(result)
    }
    catch (err) {
      throw err
    }
  },
  likedFood: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    try {
      const user = await User.findById(req.userId, 'likes')
      return transformFoods(user.likes)
      throw new Error('done')
    }
    catch (err) {
      throw err
    }
  },
  deleteFood: async ({ id }) => {
    console.log('deleteFood')
    try {
      const food = await Food.findById(id);
      food.is_active = false;
      const result = await food.save();
      return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
