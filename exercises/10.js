expensiveProductsNoNestle = db.products.find({
  price: { $gt: 20 },
  supplier: { $ne: "Nestle" },
  inStock: { $eq: true },
});

while (expensiveProductsNoNestle.hasNext()) {
  printjson(expensiveProductsNoNestle.next());
}
