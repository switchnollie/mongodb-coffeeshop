// Returns just the maximum price, not the order document
maxOrder = db.orders.aggregate([
  {
    $group: {
      _id: null,
      maxPrice: { $max: "$totalPrice" },
    },
  },
]);

printCursor(maxOrder);
