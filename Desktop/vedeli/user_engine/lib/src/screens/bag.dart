import 'package:flutter/material.dart';
import 'package:user_engine/src/helpers/style.dart';
import 'package:user_engine/src/models/bag_option.dart';
import 'package:user_engine/src/models/order_item.dart';
import 'package:user_engine/src/models/products.dart';
import 'package:user_engine/src/widgets/custom_text.dart';

List<OrderItem> orderItems = [
  OrderItem(title: 'Taco de pollo', quantity: 1, price: 25, options: [
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
  ]),
  OrderItem(title: 'Quesadilla', quantity: 1, price: 25, options: [
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
    BagOption(
      title: '¿Extras? ',
      selectedvalue: '· Sin cubiertos desechables',
    ),
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
  ]),
  OrderItem(title: 'Papadilla', quantity: 1, price: 25, options: [
    BagOption(
      title: '¿Extras? ',
      selectedvalue: '· Sin cubiertos desechables',
    ),
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
  ]),
  OrderItem(title: 'Papadilla', quantity: 1, price: 25, options: [
    BagOption(
      title: '¿Extras? ',
      selectedvalue: '· Sin cubiertos desechables',
    ),
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
    BagOption(
      title:
          '¿Deseas cubiertos desechables? (Ayúdanos a cuidar el medio ambiente)',
      selectedvalue: '· Sin cubiertos desechables',
    ),
  ]),
];

class Bag extends StatefulWidget {
  @override
  _BagState createState() => _BagState();
}

class _BagState extends State<Bag> {
  final double subtotal = 182;
  Product product = Product(
      name: "Ensalada Cesar",
      price: 20.0,
      rating: 4.3,
      vendor: "Frutalia",
      wishlist: false,
      image: "salad1.png");
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: black),
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios,
            color: black,
          ),
          onPressed: null,
        ),
        backgroundColor: white,
        elevation: 0,
        centerTitle: true,
        title: CustomText(
          text: "Bolsa",
        ),
      ),
      backgroundColor: white,
      body: Padding(
        padding: const EdgeInsets.only(top: 30.0),
        child: ListView(
          children: <Widget>[
            // Title
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                CustomText(
                  text: 'Restaurante',
                  size: 24,
                  weight: FontWeight.w300,
                ),
                SizedBox(
                  height: 10,
                ),
                CustomText(
                  text: 'Hora de entrega estimada:',
                  size: 16,
                  color: Colors.grey[600],
                  weight: FontWeight.w400,
                ),
                CustomText(
                  text: '9:23 PM',
                  size: 16,
                  color: Colors.grey[600],
                  weight: FontWeight.w400,
                )
              ],
            ),
            SizedBox(
              height: 30,
            ),
            // Map
            Padding(
              padding: const EdgeInsets.fromLTRB(14, 0, 14, 0),
              child: Container(
                width: 100,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(3),
                    border: Border.all(color: black)),
                child: Image.network(
                  'https://storage.googleapis.com/support-forums-api/attachment/thread-9014924-11470506657998028469.JPG',
                  height: 150,
                ),
              ),
            ),
            SizedBox(
              height: 30,
            ),

            // Address
            Container(
              height: 100,
              width: double.maxFinite,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 16.0),
                    child: CustomText(
                      text: 'Hacienda Xalpa 135',
                      size: 16,
                      weight: FontWeight.w500,
                    ),
                  ),
                  Container(
                    width: double.maxFinite,
                    child: TextField(
                      decoration: InputDecoration(
                          isDense: true,
                          suffixIcon: Icon(
                            Icons.arrow_forward_ios,
                            size: 14,
                          ),
                          labelStyle: TextStyle(
                            color: Colors.grey[500],
                            fontSize: 14,
                          ),
                          labelText:
                              '    Coapa, Colonia, Delegación, Código Postal'),
                    ),
                  )
                ],
              ),
            ),
            SizedBox(
              height: 14,
            ),
            // Tu pedido CustomText
            Padding(
              padding: const EdgeInsets.only(left: 14.0),
              child: CustomText(
                text: 'Tu Pedido',
                size: 18,
                weight: FontWeight.w600,
              ),
            ),
            SizedBox(
              height: 16,
            ),
            // orderItems ListView
            Padding(
              padding: const EdgeInsets.only(left: 14.0),
              child: Container(
                child: ListView(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  children: List.generate(
                    orderItems.length,
                    (index) {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                  child: Row(children: [
                                Padding(
                                  padding: const EdgeInsets.only(right: 8.0),
                                  child: CustomText(
                                    text:
                                        'X${orderItems[index].quantity.toString()}',
                                    color: Colors.greenAccent[700],
                                  ),
                                ),
                                CustomText(
                                  text: orderItems[index].title,
                                  weight: FontWeight.w300,
                                ),
                              ])),
                              Padding(
                                padding: const EdgeInsets.only(right: 12.0),
                                child: CustomText(
                                  text:
                                      '\$ ${orderItems[index].price.toString()}',
                                  weight: FontWeight.w300,
                                ),
                              )
                            ],
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          ListView(
                            physics: const NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            children: List.generate(
                                orderItems[index].options.length, (index2) {
                              return Padding(
                                padding:
                                    const EdgeInsets.fromLTRB(32, 0, 20, 8),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    CustomText(
                                      text: orderItems[index]
                                          .options[index2]
                                          .title,
                                      size: 12,
                                      color: grey,
                                    ),
                                    CustomText(
                                      text: orderItems[index]
                                          .options[index2]
                                          .selectedvalue,
                                      size: 12,
                                      color: grey,
                                    )
                                  ],
                                ),
                              );
                            }),
                          ),
                          SizedBox(
                            height: 14,
                          )
                        ],
                      );
                    },
                  ),
                ),
              ),
            ),
            Divider(),
            //Agregar artículos chip
            Container(
              height: 40,
              child: Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 14.0),
                    child: Container(
                      height: 34,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: Colors.grey[300],
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(4.0),
                        child: Row(
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(left: 4.0),
                              child: Icon(
                                Icons.add,
                                size: 16,
                                color: Colors.greenAccent[700],
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.fromLTRB(4, 0, 4, 0),
                              child: CustomText(
                                text: 'Agregar artículos',
                                size: 13,
                                weight: FontWeight.w500,
                              ),
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                  Container(
                    width: 150,
                  )
                ],
              ),
            ),
            Divider(),
            // Note to restaurant input
            Padding(
              padding: const EdgeInsets.only(left: 14.0),
              child: TextField(
                decoration: InputDecoration(
                    labelStyle: TextStyle(
                        wordSpacing: 1,
                        color: Colors.grey[600],
                        fontSize: 13,
                        fontWeight: FontWeight.w400),
                    labelText:
                        '¿Quieres agregar una nota para el restaurante?'),
              ),
            ),
            SizedBox(
              height: 22,
            ),
            // Total
            Padding(
              padding: const EdgeInsets.fromLTRB(14, 0, 14, 0),
              child: Container(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        CustomText(
                          text: 'Subtotal',
                          size: 18,
                          weight: FontWeight.w300,
                        ),
                        CustomText(
                          text: '\$${subtotal}',
                          weight: FontWeight.w300,
                        )
                      ],
                    ),
                    SizedBox(
                      height: 16,
                    ),
                    CustomText(
                      text: 'Tarifas',
                      size: 18,
                      weight: FontWeight.w300,
                    ),
                    SizedBox(
                      height: 14,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        CustomText(
                          text: 'Pedido mediano',
                          weight: FontWeight.w300,
                          size: 14,
                          color: Colors.grey[600],
                        ),
                        CustomText(
                          text: '\$14.00',
                          size: 14,
                          color: Colors.grey[600],
                          weight: FontWeight.w300,
                        )
                      ],
                    ),
                    SizedBox(
                      height: 12,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        CustomText(
                          text: 'Entrega',
                          weight: FontWeight.w300,
                          size: 14,
                          color: Colors.grey[600],
                        ),
                        CustomText(
                          text: '\$34.00',
                          size: 14,
                          color: Colors.grey[600],
                          weight: FontWeight.w300,
                        )
                      ],
                    ),
                    SizedBox(
                      height: 12,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        CustomText(
                          text: 'Total',
                          weight: FontWeight.w600,
                          size: 15,
                          color: black,
                        ),
                        CustomText(
                          text: '\$230.00',
                          size: 15,
                          color: black,
                          weight: FontWeight.w600,
                        )
                      ],
                    ),
                    SizedBox(
                      height: 30,
                    ),
                    Container(
                      width: double.maxFinite,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              Image.asset(
                                'images/cash.png',
                                height: 16,
                              ),
                              Padding(
                                padding: const EdgeInsets.only(left: 16.0),
                                child: CustomText(
                                  text: 'Efectivo',
                                  size: 15,
                                  weight: FontWeight.w600,
                                ),
                              )
                            ],
                          ),
                          Icon(
                            Icons.arrow_forward_ios,
                            size: 16,
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    )
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 14.0),
              child: GestureDetector(
                onTap: () {},
                child: Container(
                  alignment: Alignment.center,
                  height: 50,
                  width: double.maxFinite,
                  color: Colors.greenAccent[700],
                  child: CustomText(
                    text: 'Pedir',
                    weight: FontWeight.w500,
                    size: 18,
                    color: white,
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
