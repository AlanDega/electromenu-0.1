import 'package:carousel_pro/carousel_pro.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:user_engine/src/helpers/screen_navigation.dart';
import 'package:user_engine/src/screens/bag.dart';
import 'package:user_engine/src/widgets/categories.dart';
import 'package:user_engine/src/widgets/featured_products.dart';
import 'package:user_engine/src/widgets/near_restaurants.dart';
import 'package:user_engine/src/widgets/restaurants.dart';

import '../helpers/style.dart';
import '../widgets/custom_text.dart';
import '../widgets/small_floating_button.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: white,
      appBar: AppBar(
        backgroundColor: white,
        title: CustomText(text: 'Hacienda Xalpa 135'),
        actions: [IconButton(icon: Icon(Icons.arrow_drop_down_circle))],
      ),
      body: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          ListView(
            children: <Widget>[
              Container(
                height: 200,
                child: Carousel(
                  images: [
                    AssetImage(
                      'images/carousel1.png',
                    ),
                    AssetImage('images/carousel2.png'),
                    AssetImage('images/carousel2.png'),
                  ],
                  dotBgColor: Colors.transparent,
                  dotColor: grey,
                  dotIncreasedColor: Colors.greenAccent[700],
                  autoplay: true,
                  boxFit: BoxFit.contain,
                ),
              ),
              SizedBox(
                height: 5,
              ),
              Categories(),
              SizedBox(
                height: 20,
              ),
              Featured(),
              SizedBox(
                height: 0,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: CustomText(
                  text: 'Recomendados para ti',
                  color: black,
                  size: 18,
                  weight: FontWeight.w300,
                ),
              ),
              SizedBox(
                height: 5,
              ),
              // Recomendados
              Padding(
                padding: const EdgeInsets.all(2.0),
                child: Stack(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(0),
                      child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.asset('images/food.jpg')),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          SmallButton(Icons.favorite),
                        ],
                      ),
                    ),
                    Positioned.fill(
                        child: Align(
                      alignment: Alignment.bottomCenter,
                      child: Container(
                        height: 100,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.only(
                            bottomLeft: Radius.circular(20),
                            bottomRight: Radius.circular(20),
                          ),
                          gradient: LinearGradient(
                            begin: Alignment.bottomCenter,
                            end: Alignment.topCenter,
                            colors: [
                              Colors.black.withOpacity(0.8),
                              Colors.black.withOpacity(0.7),
                              Colors.black.withOpacity(0.6),
                              Colors.black.withOpacity(0.4),
                              Colors.black.withOpacity(0.1),
                              Colors.black.withOpacity(0.05),
                              Colors.black.withOpacity(0.025),
                            ],
                          ),
                        ),
                      ),
                    )),
                    Positioned.fill(
                        child: Align(
                      alignment: Alignment.bottomCenter,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Padding(
                            padding: const EdgeInsets.fromLTRB(12, 8, 8, 8),
                            child: RichText(
                              text: TextSpan(children: [
                                TextSpan(
                                    text: 'Hot cakes \n',
                                    style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold)),
                                TextSpan(
                                    text: 'por: ',
                                    style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.w300)),
                                TextSpan(
                                    text: 'Vegetali \n',
                                    style: TextStyle(fontSize: 16))
                              ], style: TextStyle(color: white)),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: RichText(
                              text: TextSpan(children: [
                                TextSpan(
                                    text: '\$25.00 \n',
                                    style: TextStyle(
                                        fontSize: 22,
                                        fontWeight: FontWeight.bold)),
                              ], style: TextStyle(color: white)),
                            ),
                          ),
                        ],
                      ),
                    )),
                  ],
                ),
              ),
              SizedBox(
                height: 40,
              ),
              // Cerca de ti Component
              //Cerca de ti Title
              NearRestaurants(),

              SizedBox(
                height: 20,
              ),
              Restaurants()
            ],
          ),
          // Bag
          GestureDetector(
            onTap: () {
              changeScreen(context, Bag());
            },
            child: Container(
                height: 50.0,
                color: Colors.greenAccent[700],
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(left: 8.0),
                        child: CustomText(
                          text: '\$ 125',
                          color: white,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(right: 8.0),
                        child: CustomText(
                          text: 'Ver la Bolsa',
                          color: white,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 0, 8, 4),
                        child: Image.asset(
                          'images/bag.png',
                          width: 24,
                          height: 24,
                          color: white,
                        ),
                      )
                    ])),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        color: white,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Padding(
                padding: const EdgeInsets.all(8.0),
                child: Icon(
                  Icons.home,
                  color: Colors.greenAccent[700],
                )),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Icon(
                Icons.receipt,
                color: grey,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Icon(
                Icons.account_circle,
                color: grey,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
