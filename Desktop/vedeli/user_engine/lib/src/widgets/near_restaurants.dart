import 'package:flutter/material.dart';
import 'package:user_engine/src/helpers/screen_navigation.dart';
import 'package:user_engine/src/models/products.dart';
import 'package:user_engine/src/screens/product_details.dart';
import 'package:user_engine/src/widgets/small_floating_button.dart';

import '../helpers/style.dart';
import '../widgets/custom_text.dart';

List<Product> productsList = [
  Product(
      name: 'Snacks',
      price: 5.99,
      rating: 4.2,
      vendor: 'Frutalia',
      wishlist: true,
      sendfee: '30 MXN',
      image: 'cerca1.jpeg'),
  Product(
      name: 'Tacos',
      price: 8.99,
      rating: 4.5,
      vendor: 'Itakis',
      wishlist: false,
      sendfee: '30 MXN',
      image: 'cerca2.jpeg'),
  Product(
      name: 'Cereal',
      price: 5.99,
      rating: 4.2,
      vendor: 'wasabi',
      wishlist: true,
      sendfee: '30 MXN',
      image: 'cerca3.jpeg'),
];

class NearRestaurants extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: CustomText(
            text: 'Cerca de ti',
            size: 18,
            color: black,
            weight: FontWeight.w300,
          ),
        ),
        Container(
          height: 360,
          child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: productsList.length,
              itemBuilder: (_, index) {
                return Padding(
                  padding: EdgeInsets.fromLTRB(15, 50, 15, 50),
                  child: GestureDetector(
                    onTap: () {
                      changeScreen(context,
                          ProductDetails(product: productsList[index]));
                    },
                    child: Container(
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(9),
                          color: white,
                          boxShadow: [
                            BoxShadow(
                                color: Colors.green[100],
                                offset: Offset(3, 20),
                                blurRadius: 30)
                          ]),
                      height: 240,
                      width: 260,
                      child: Column(
                        children: <Widget>[
                          Stack(
                            children: [
                              ClipRRect(
                                  borderRadius: BorderRadius.only(
                                      topLeft: Radius.circular(3),
                                      topRight: Radius.circular(3)),
                                  child: Image.asset(
                                    'images/${productsList[index].image}',
                                    height: 140,
                                    width: 260,
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
                            width: 300,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CustomText(
                                    text: productsList[index].vendor.toString(),
                                    weight: FontWeight.w400,
                                    size: 18,
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(left: 8.0),
                                  child: CustomText(
                                    text: '\$\$\$ · Snacks',
                                    color: grey,
                                    size: 14,
                                  ),
                                ),
                                SizedBox(
                                  height: 5,
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(left: 8.0),
                                  child: Chip(
                                    label: Text(
                                      'Costo de Envío:  ${productsList[index].sendfee}',
                                      style: TextStyle(fontSize: 12),
                                    ),
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
              }),
        ),
      ],
    );
  }
}
