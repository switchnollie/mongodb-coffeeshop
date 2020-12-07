productByOrderCount = db.orders.aggregate([
  {
    $unwind: "$products",
  },
  {
    $group: {
      _id: "$products.productId",
      sumOrdered: {
        $sum: "$products.quantity",
      },
    },
  },
]);

printCursor(productByOrderCount);
