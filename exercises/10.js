// $ne query selector means "not equal"
expensiveProductsNoNestle = db.products.find({
  price: { $gt: 20 },
  supplier: { $ne: "Nestle" },
  inStock: { $eq: true },
});

printCursor(expensiveProductsNoNestle);
