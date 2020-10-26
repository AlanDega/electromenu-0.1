import 'package:flutter/material.dart';
import 'package:user_engine/src/models/restaurant.dart';
import 'package:user_engine/src/widgets/custom_text.dart';

import '../helpers/style.dart';

class RestaurantDetails extends StatefulWidget {
  final Restaurant restaurant;

  RestaurantDetails({@required this.restaurant});

  @override
  _RestaurantDetailsState createState() => _RestaurantDetailsState();
}

class _RestaurantDetailsState extends State<RestaurantDetails> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: white,
      appBar:
          AppBar(backgroundColor: white, title: CustomText(text: 'Taqueamor')),
      body: SafeArea(
        child: Column(
          children: [
            Container(
              height: 200,
              child: Stack(
                children: [
                  Container(
                    width: double.maxFinite,
                    child: Image.asset(
                      'images/${widget.restaurant.image}',
                      width: double.maxFinite,
                      fit: BoxFit.cover,
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      IconButton(
                        icon: Icon(
                          Icons.arrow_back_ios,
                          color: black,
                        ),
                        onPressed: () {
                          Navigator.pop(context);
                        },
                      ),
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Stack(
                          children: [
                            Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Stack(
                                children: [
                                  Image.asset(
                                    'images/bag.png',
                                    width: 24,
                                    height: 24,
                                  ),
                                ],
                              ),
                            ),
                            Positioned(
                              top: 22,
                              right: 6,
                              child: Container(
                                  decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(10),
                                      color: white,
                                      boxShadow: [
                                        BoxShadow(
                                            color: grey,
                                            offset: Offset(
                                              2,
                                              1,
                                            ),
                                            blurRadius: 3)
                                      ]),
                                  child: Padding(
                                    padding: const EdgeInsets.only(
                                        left: 4, right: 4),
                                    child: CustomText(
                                      text: '2',
                                      color: Colors.greenAccent[700],
                                      size: 10,
                                      weight: FontWeight.bold,
                                    ),
                                  )),
                            )
                          ],
                        ),
                      ),
                    ],
                  ),
                  Positioned(
                    right: 14,
                    bottom: 20,
                    child: Container(
                      decoration: BoxDecoration(
                        color: white,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                              color: grey, offset: Offset(2, 3), blurRadius: 3),
                        ],
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(6.0),
                        child: Icon(
                          Icons.favorite,
                          size: 22,
                          color: Colors.greenAccent[700],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: double.maxFinite,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: 10,
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: CustomText(
                      text: widget.restaurant.name,
                      size: 26,
                      weight: FontWeight.w300,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 14.0),
                    child: CustomText(
                      text:
                          '${widget.restaurant.expensiveness} · ${widget.restaurant.restauranttype} ',
                      size: 13,
                      color: black,
                      weight: FontWeight.w300,
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 14.0),
                    child: CustomText(
                      text: 'Costo de envío: MXN${widget.restaurant.sendfee}',
                      size: 13,
                      color: black,
                      weight: FontWeight.w300,
                    ),
                  ),
                  Divider(),
                ],
              ),
            ),
            SizedBox(
              height: 15,
            ),
            Container(
              height: 80,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CustomText(
                    text: 'Información del restaurante',
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          decoration: InputDecoration(
                            labelText: 'Amsterdam 132',
                            isDense: true,
                            prefixIcon: Icon(Icons.location_on),
                            labelStyle: TextStyle(
                              color: Colors.grey[500],
                              fontSize: 14,
                            ),
                          ),
                        ),
                      ),
                      Expanded(
                        child: FlatButton(
                          child: CustomText(
                            text: 'Más información',
                            color: Colors.greenAccent[700],
                            weight: FontWeight.w600,
                            size: 9,
                          ),
                        ),
                      )
                    ],
                  )
                ],
              ),
            ),
            SizedBox(
              height: 15,
            ),
            Row(
              children: [
                Expanded(
                    child: CustomText(
                  text: 'Menu',
                )),
                Expanded(
                  child: CustomText(
                    text: 'Search',
                  ),
                )
              ],
            ),
            Center(
              child: Card(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      children: [
                        CustomText(
                          text: 'title',
                        ),
                        CustomText(
                          text: 'price',
                        ),
                      ],
                    ),
                    CustomText(
                      text: 'image',
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
