ordersOfUser1and2 = db.orders.aggregate([
  {
    $match: {
      $or: [{ user: { $eq: "1" } }, { user: { $eq: "2" } }],
    },
  },
]);

printCursor(ordersOfUser1and2);
