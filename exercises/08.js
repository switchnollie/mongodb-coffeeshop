coffees = db.products.find({ strength: "mild" });

printCursor(coffees);
