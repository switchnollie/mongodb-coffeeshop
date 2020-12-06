function printCursor(cursor) {
  while (cursor.hasNext()) {
    printjson(cursor.next());
  }
}
