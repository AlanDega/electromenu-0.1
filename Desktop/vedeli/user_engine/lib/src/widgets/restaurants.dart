import 'package:flutter/material.dart';
import 'package:user_engine/src/helpers/screen_navigation.dart';
import 'package:user_engine/src/helpers/style.dart';
import 'package:user_engine/src/models/restaurant.dart';
import 'package:user_engine/src/screens/restaurant_details.dart';
import 'package:user_engine/src/widgets/custom_text.dart';
import 'package:user_engine/src/widgets/small_floating_button.dart';

List<Restaurant> restaurantsList = [
  Restaurant(
    name: 'Taqueamor',
    liked: false,
    expensiveness: '\$\$',
    sendfee: 32,
    restauranttype: 'Snacks',
    image: 'restaurant1.jpg',
  ),
  Restaurant(
    name: 'Fidalu',
    liked: false,
    expensiveness: '\$',
    sendfee: 32,
    restauranttype: 'Italiano',
    image: 'restaurant2.jpg',
  ),
  Restaurant(
    name: 'Tortugasa',
    liked: false,
    expensiveness: '\$\$',
    sendfee: 32,
    restauranttype: 'Tortas',
    image: 'restaurant3.jpg',
  ),
];

class Restaurants extends StatefulWidget {
  @override
  _RestaurantsState createState() => _RestaurantsState();
}

class _RestaurantsState extends State<Restaurants> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: ListView.builder(
        scrollDirection: Axis.vertical,
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: restaurantsList.length,
        itemBuilder: (_, index) {
          return Padding(
            padding: EdgeInsets.fromLTRB(9, 20, 9, 20),
            child: GestureDetector(
              onTap: () {
                changeScreen(context,
                    RestaurantDetails(restaurant: restaurantsList[index]));
              },
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(9),
                  color: white,
                ),
                height: 260,
                child: Column(
                  children: <Widget>[
                    Stack(
                      children: [
                        ClipRRect(
                            borderRadius: BorderRadius.circular(3),
                            child: Image.asset(
                              'images/${restaurantsList[index].image}',
                              height: 140,
                              width: double.maxFinite,
                              fit: BoxFit.cover,
                            )),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              SmallButton(Icons.favorite),
                            ],
                          ),
                        ),
                      ],
                    ),
                    Container(
                      width: double.maxFinite,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.only(top: 8.0),
                            child: CustomText(
                              text: '${restaurantsList[index].name}',
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 4.0),
                            child: CustomText(
                              text: '\$\$\$ · Snacks',
                              color: grey,
                              size: 14,
                            ),
                          ),
                          SizedBox(
                            height: 5,
                          ),
                          Chip(
                            label: Text(
                              'Costo de Envío:  ${restaurantsList[index].sendfee}',
                              style: TextStyle(fontSize: 12),
                            ),
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
