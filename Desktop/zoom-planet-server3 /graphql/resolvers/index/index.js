const restaurantResolver = require('../restaurantResolver');
const stockResolver = require('../stockResolver');
const stockItemResolver = require('../stockItemResolver');
const inventarioResolver = require('../inventarioResolver');
const inventarioItemsResolver = require('../inventarioItemsResolver');

const rootResolver = {
    ...restaurantResolver,
    ...stockResolver,
    ...stockItemResolver,
    ...inventarioResolver,
    ...inventarioItemsResolver
}

module.exports = rootResolver;
