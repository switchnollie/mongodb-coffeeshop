renamed = db.products.aggregate([
  {
    $project: {
      _id: false,
      productName: "$name",
      productPrice: "$price",
      productSupplier: "$supplier",
    },
  },
]);

printCursor(renamed);
