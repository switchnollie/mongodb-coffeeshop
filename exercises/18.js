ordersOfUser1and2 = db.orders.aggregate([
  {
    $project: {
      user: true,
      sum: { $sum: "$totalPrice" },
    },
  },
  {
    $match: {
      $or: [{ user: { $eq: "1" } }, { user: { $eq: "2" } }],
    },
  },
]);

printCursor(ordersOfUser1and2);
