dallmayrProducts = db.products.aggregate([
  { $match: { supplier: "Dallmayr" } },
]);

printCursor(dallmayrProducts);
