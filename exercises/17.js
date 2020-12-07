// $set is the same as $addFields
users = db.users.aggregate([
  {
    $set: {
      hasPhone: {
        $cond: { if: { $eq: ["$phone", undefined] }, then: false, else: true },
      },
    },
  },
]);

printCursor(users);
