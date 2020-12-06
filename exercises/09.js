usersWithoutPhone = db.users.find({ phone: { $exists: false } });

printCursor(usersWithoutPhone);
