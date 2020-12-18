maxQuantity = db.orders.aggregate([
  { $unwind: "$products" },
  { $group: { _id: null, maxQuantity: { $max: "$products.quantity" } } },
  { $project: { maxQuantity: 1, _id: 0 } },
]);

// Alternative ohne unwind:
// maxQuantity = db.orders.aggregate([
//   {
//   $group: { _id: null, max: {$max: "$products.quantity"}}
//   }
// ])

printCursor(maxQuantity);
