usersWithoutPhone = db.users.find({ phone: { $exists: false } });

while (usersWithoutPhone.hasNext()) {
  printjson(usersWithoutPhone.next());
}
