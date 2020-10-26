import 'package:flutter/material.dart';
import 'package:user_engine/src/helpers/screen_navigation.dart';
import 'package:user_engine/src/models/products.dart';
import 'package:user_engine/src/screens/product_details.dart';

import '../helpers/style.dart';
import '../widgets/custom_text.dart';

List<Product> productsList = [
  Product(
      name: 'Ensalada Cesar',
      description: 'Ensalada con tips hechos con aguacate',
      price: 5.99,
      rating: 4.2,
      vendor: 'Frutalia',
      wishlist: true,
      image: 'salad1.png'),
  Product(
      name: 'Tacos',
      description: 'Orden de 5 tacos de pastor hechos con soya',
      price: 8.99,
      rating: 4.5,
      vendor: 'A darle',
      wishlist: false,
      image: '5.jpg'),
  Product(
      name: 'Cereal',
      description: 'Hecho con maíz 100% vegano',
      price: 5.99,
      rating: 4.2,
      vendor: 'Frutalia',
      wishlist: true,
      image: '1.jpg'),
];

class Featured extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: CustomText(
            text: 'Populares',
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
                  padding: EdgeInsets.fromLTRB(20, 50, 20, 50),
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
                      width: 200,
                      child: Column(
                        children: <Widget>[
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              SizedBox(
                                height: 4,
                              ),
                              Padding(
                                padding: const EdgeInsets.all(4.0),
                                child: Container(
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(20),
                                      color: white,
                                      boxShadow: [
                                        BoxShadow(
                                            color: Colors.grey[300],
                                            offset: Offset(1, 0.5),
                                            blurRadius: 1)
                                      ]),
                                  child: Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: productsList[index].wishlist
                                          ? Icon(
                                              Icons.favorite,
                                              size: 16,
                                              color: Colors.greenAccent[700],
                                            )
                                          : Icon(
                                              Icons.favorite_border,
                                              size: 16,
                                              color: Colors.greenAccent[700],
                                            )),
                                ),
                              )
                            ],
                          ),
                          Image.asset(
                            'images/${productsList[index].image}',
                            height: 140,
                            width: 140,
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(left: 8.0),
                                    child: Column(
                                      children: [
                                        CustomText(
                                          text: productsList[index].name,
                                          weight: FontWeight.w700,
                                        ),
                                        CustomText(
                                          text: productsList[index]
                                              .vendor
                                              .toString(),
                                          color: black,
                                          size: 12,
                                        ),
                                      ],
                                    ),
                                  ),
                                  SizedBox(
                                    width: 2,
                                  ),
                                ],
                              ),
                              SizedBox(
                                height: 10,
                              ),
                              CustomText(
                                text: '\$${productsList[index].price}',
                                size: 12,
                                color: Colors.grey[600],
                              )
                            ],
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
