users = db.users.find();

while (users.hasNext()) {
  printjson(users.next());
}
