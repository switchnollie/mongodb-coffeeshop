bigOrders = db.orders.find(
  {
    numberOfDistinctProducts: {
      $gte: 2,
    },
  },
  {
    user: true,
    products: {
      productId: true,
    },
    totalPrice: true,
  }
);

printCursor(bigOrders);
