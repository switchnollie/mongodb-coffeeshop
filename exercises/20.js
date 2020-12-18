/* Problem: Nicht alle Produkte werden zurückgegeben, 
$map wird nur auf dem ersten, inneren Array von products aufgerufen.
*/
ordersByUser = db.orders.aggregate([
  {
    $group: {
      _id: "$user",
      ordersCount: {
        $sum: 1,
      },
      avgOrderPrice: {
        $avg: "$totalPrice",
      },
      products: {
        $addToSet: "$products",
      },
    },
  },
  {
    $set: {
      products: {
        $map: {
          input: "$products",
          as: "product",
          in: { $first: "$$product.productId" },
        },
      },
    },
  },
  {
    $match: {
      avgOrderPrice: { $gte: 100 },
    },
  },
]);

// Ansatz 2 - Problem: $sum mit $unwind führt zum Summieren der Produkte, nicht der Bestellungen
// ordersByUser = db.orders.aggregate([
//   {
//     $unwind: "$products",
//   },
//   {
//     $group: {
//       _id: "$user",
//       avgPrice: { $avg: "$totalPrice" },
//       products: { $addToSet: "$products.productId" },
//       countOrders: { $sum: 1 },
//     },
//   },
//   {
//     $match: {
//       avgPrice: { $gt: 100 },
//     },
//   },
// ]);

printCursor(ordersByUser);
