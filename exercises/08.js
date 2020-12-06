coffees = db.products.find({ strength: "mild" });

while (coffees.hasNext()) {
  printjson(coffees.next());
}
