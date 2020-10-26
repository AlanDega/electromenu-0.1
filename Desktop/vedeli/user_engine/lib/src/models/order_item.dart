import 'package:user_engine/src/models/bag_option.dart';

class OrderItem {
  final String title;
  final int quantity;
  final double price;
  final List<BagOption> options;

  OrderItem({this.title, this.quantity, this.price, this.options});
}
