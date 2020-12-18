# Mongo Coffee Shop (Big Data Exercise 4)

## Setup

- Node.js >= v14 is required (The scripts are using the Node.js MongoDB Driver API)
- Run `npm i` in this directory to install all required dependencies
- Make the node scripts executable `chmod -x run seedDb`

## Scripts

- Seeding can be executed with `./seedDb` and optionally the connection string as first and the database name as second argument
- Exercises can be executed with `./run <execiseNumber>` and optionally the connection string as first and the database name as second argument e.g. `./run 01`

- default values:
  - connection: `mongodb://localhost`
  - databaseName: `coffeeShop`

| Script Name            | Description                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `seedDb`               | Clears the collections and seeds the database that is provided as second argument or `coffeeshop` by default with sample Data |
| `run <exerciseNumber>` | Runs the example under `./examples/<exerciseNumber>.js`                                                                       |

## Database "Schema"

> MongoDB is schemaless, this is the intended Document Structure

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
  "strength": String, // "mild" | "stark"
  "price": Number,
  "supplier": String,
  "inStock": Boolean
}
```

### suppliers Collection

```js
{
  "_id": ObjectID,
  "name": String,
  "address": {
    "street": String,
    "houseNumber": number,
    "postCode": number,
    "city": String
  }
}
```

### orders Collection

```js
{
  "_id": ObjectID,
  "user": Reference,
  "products": [
    {
      "productId": Reference,
      "quantity": Number
    }
  ],
  "numberOfDistinctProducts": Number,
  "totalPrice": Number
}
```
