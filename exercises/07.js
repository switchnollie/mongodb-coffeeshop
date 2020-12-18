products = db.products.find({}).sort({ price: 1 });

// Alternative:
// products = db.products.aggregate([{ $sort: { price: 1 } }]);

printCursor(products);
