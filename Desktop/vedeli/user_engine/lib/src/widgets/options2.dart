import 'package:flutter/material.dart';
import 'package:user_engine/src/models/option.dart';

import 'custom_text.dart';

List<Option> optionsList = [Option(title: 'test1', checked: true)];

class Options2 extends StatefulWidget {
  @override
  _Options2State createState() => _Options2State();
}

class _Options2State extends State<Options2> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 200,
          child: ListView.builder(
              itemCount: optionsList.length,
              itemBuilder: (_, index) {
                return Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(3),
                      border: Border.all(color: Colors.grey[300]),
                      color: Colors.grey[100],
                    ),
                    child: Row(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: CustomText(
                            text: optionsList[index].title,
                            size: 12,
                          ),
                        )
                      ],
                    ),
                  ),
                );
              }),
        )
      ],
    );
  }
}
