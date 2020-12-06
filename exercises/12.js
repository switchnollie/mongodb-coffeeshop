mutationResult = db.users.updateOne(
  {
    username: {
      $eq: "Max Musterman",
    },
  },
  {
    $set: {
      email: "max@muster.com",
    },
  }
);

printjson(mutationResult);
