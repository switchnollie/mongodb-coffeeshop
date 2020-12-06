conn = Mongo(connection);
db = conn.getDB(databaseName);
print(db.getCollectionNames());
