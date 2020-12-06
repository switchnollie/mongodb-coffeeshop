products = db.products.aggregate([{ $sort: { price: 1 } }]);

while (products.hasNext()) {
  printjson(products.next());
}
