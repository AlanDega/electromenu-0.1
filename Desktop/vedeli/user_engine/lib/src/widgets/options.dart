import 'package:flutter/material.dart';

enum SingingCharacter { ConQueso, SinQueso }

class Options extends StatefulWidget {
  @override
  _OptionsState createState() => _OptionsState();
}

class _OptionsState extends State<Options> {
  SingingCharacter _character = SingingCharacter.ConQueso;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        RadioListTile<SingingCharacter>(
          title: const Text('Con queso'),
          value: SingingCharacter.ConQueso,
          groupValue: _character,
          onChanged: (SingingCharacter value) {
            setState(() {
              _character = value;
            });
          },
        ),
        RadioListTile<SingingCharacter>(
          title: const Text('Sin queso'),
          value: SingingCharacter.SinQueso,
          groupValue: _character,
          onChanged: (SingingCharacter value) {
            setState(() {
              _character = value;
            });
          },
        ),
      ],
    );
  }
}
