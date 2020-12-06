products = db.products.aggregate([{ $sort: { price: 1 } }]);

printCursor(products);
