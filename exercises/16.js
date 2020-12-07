maxQuantity = db.orders.aggregate([
  { $unwind: "$products" },
  { $group: { _id: null, maxQuantity: { $max: "$products.quantity" } } },
  { $project: { maxQuantity: 1, _id: 0 } },
]);

printCursor(maxQuantity);
