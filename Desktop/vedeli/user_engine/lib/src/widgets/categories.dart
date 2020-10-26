import 'package:flutter/material.dart';
import 'package:user_engine/src/models/category.dart';

import '../helpers/style.dart';
import '../widgets/custom_text.dart';

List<Category> categoriesList = [
  Category(name: 'Ensaladas', image: 'ensalada.png'),
  Category(name: 'Tacos', image: 'taco.png'),
  Category(name: 'Hamburguesas', image: 'hamburguesa.png'),
  Category(name: 'Burritos', image: 'burrito.png'),
  Category(name: 'Sandwiches', image: 'sandwich.png')
];

class Categories extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: categoriesList.length,
        itemBuilder: (_, index) {
          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: <Widget>[
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    color: white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.green[100],
                        offset: Offset(4, 6),
                        blurRadius: 20,
                      )
                    ],
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(8),
                    child: Image.asset(
                      'images/${categoriesList[index].image}',
                      height: 25,
                      width: 25,
                    ),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                CustomText(
                  text: categoriesList[index].name,
                  size: 9,
                  color: Colors.grey[500],
                  weight: FontWeight.w400,
                )
              ],
            ),
          );
        },
      ),
    );
  }
}
