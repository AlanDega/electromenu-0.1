const DataLoader = require('dataloader');

const Restaurant = require('../../models/restaurant');

const restaurant = async restaurant => {
	try {
		const result = await Restaurant.findOne({ _id: restaurant })
		return {
			...result._doc,
			_id: result.id,
		};
	} catch (err) {
		throw err;
	}
}


const transformRestaurant = restaurant => {
	return {
		...restaurant._doc,
		_id: restaurant.id,
	};
};



exports.transformRestaurant = transformRestaurant;

