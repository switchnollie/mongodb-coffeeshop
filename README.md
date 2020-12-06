# Mongo Coffee Shop (Big Data Exercise 4)

## Setup

- Node.js >= v14 is required (The scripts are using the Node.js MongoDB Driver API)

## Scripts

- The first argument is always the connection string. If it is not provided, `mongdb://localhost` is used

| Script Name | Description                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `seedDb`    | Clears the collections and seeds the database that is provided as second argument or `coffeeshop` by default with sample Data |

## Database "Schema"

- MongoDB is schemaless, this is the intended Document Structure

### users Collection

```js
{
  "_id": ObjectID,
  "username": String,
  "email": String,
  "phone": String, // optional
  "address": {
    "street": String,
    "houseNumber": number,
    "postCode": number,
    "city": String
  }
}
```

### products Collection

```js
{
  "_id": ObjectID,
  "name": String,
  "strength": Number,
  "price": Number,
  "supplier": {
    "_id": ObjectID,
    "name": String,
    "address": String
  },
  "inStock": Boolean
}
```

### suppliers Collection

```js
{
  "_id": ObjectID,
  "name": String,
  "address": String
}
```

### orders Collection

```js
{
  "_id": ObjectID,
  "user": Reference,
  "products": [
    {
      "id": Reference,
      "quantity": Number
    }
  ],
  "totalPrice": Number
}
```
