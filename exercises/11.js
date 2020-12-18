// With denormalized numberOfDistinctProducts field:
// bigOrders = db.orders.find(
//   {
//     numberOfDistinctProducts: {
//       $gt: 1,
//     },
//   },
//   {
//     user: true,
//     products: {
//       productId: true,
//     },
//     totalPrice: true,
//   }
// );

bigOrders = db.orders.find(
  {
    "products.1": { $exists: true },
  },
  {
    _id: false,
    user: true,
    totalPrice: true,
    "products.productId": true,
  }
);

printCursor(bigOrders);
