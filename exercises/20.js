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
        $push: "$products",
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

printCursor(ordersByUser);
