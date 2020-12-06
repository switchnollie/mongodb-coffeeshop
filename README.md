# Mongo Coffee Shop (Big Data Exercise 4)

## Setup

- Node.js >= v14 is required (The scripts are using the Node.js MongoDB Driver API)

## Scripts

- The first argument is always the connection string. If it is not provided, `mongdb://localhost` is used

| Script Name | Description                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `seedDb`    | Clears the collections and seeds the database that is provided as second argument or `coffeeshop` by default with sample Data |
