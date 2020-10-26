import 'package:flutter/material.dart';
import 'package:user_engine/src/models/option.dart';
import 'package:user_engine/src/models/products.dart';
import 'package:user_engine/src/widgets/custom_text.dart';
import 'package:user_engine/src/widgets/options.dart';

import '../helpers/style.dart';

List<Option> optionsList = [
  Option(title: 'Con queso', checked: false),
  Option(title: 'Sin queso', checked: true)
];

class ProductDetails extends StatefulWidget {
  final Product product;

  ProductDetails({@required this.product});
  @override
  _ProductDetailsState createState() => _ProductDetailsState();
}

class _ProductDetailsState extends State<ProductDetails> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: white,
      body: SafeArea(
        child: ListView(
          children: [
            Stack(
              children: [
                Image.asset(
                  'images/${widget.product.image}',
                  width: double.maxFinite,
                  height: 200,
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
                                  padding:
                                      const EdgeInsets.only(left: 4, right: 4),
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
                Container(
                  child: Positioned(
                    right: 14,
                    bottom: 10,
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
                ),
              ],
            ),
            Divider(),
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 6, 0, 0),
              child: CustomText(
                text: widget.product.name,
                size: 20,
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 6, 0, 0),
              child: CustomText(
                text: widget.product.description,
                size: 14,
                color: grey,
              ),
            ),
            SizedBox(
              height: 15,
            ),
            Container(
              height: 46,
              alignment: AlignmentDirectional.bottomStart,
              color: Colors.grey[200],
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: CustomText(text: 'Instrucciones Especiales', size: 16),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(8, 0, 8, 0),
              child: TextField(
                // obscureText: true,
                decoration: InputDecoration(
                  labelStyle: TextStyle(color: Colors.grey[400], fontSize: 14),
                  labelText: 'Escribe aquí tus instrucciones',
                ),
                cursorColor: Colors.greenAccent[700],
              ),
            ),
            SizedBox(
              height: 20,
            ),
            Options(),
            SizedBox(
              height: 30,
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(right: 16.0),
                    child: RawMaterialButton(
                      onPressed: () {},
                      elevation: 2.0,
                      fillColor: Colors.white,
                      child: Icon(
                        Icons.remove,
                        size: 32.0,
                        color: Colors.grey[500],
                      ),
                      padding: EdgeInsets.all(15.0),
                      shape: CircleBorder(),
                    ),
                  ),
                  CustomText(text: '0'),
                  Padding(
                    padding: const EdgeInsets.only(left: 16.0),
                    child: RawMaterialButton(
                      onPressed: () {},
                      elevation: 2.0,
                      fillColor: Colors.white,
                      child: Icon(
                        Icons.add,
                        size: 32.0,
                        color: Colors.greenAccent[700],
                      ),
                      padding: EdgeInsets.all(15.0),
                      shape: CircleBorder(),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(
              height: 30,
            ),
            Container(
              width: double.maxFinite,
              decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey[300]),
                  color: Colors.grey[200]),
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: GestureDetector(
                  onTap: () {},
                  child: Container(
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: Colors.greenAccent[700],
                        borderRadius: BorderRadius.circular(3),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                        child: CustomText(
                          text: 'Agrega 1 al carrito · \$ 60',
                          color: white,
                          size: 18,
                          weight: FontWeight.w600,
                        ),
                      )),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
