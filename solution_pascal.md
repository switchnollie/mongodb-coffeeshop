# 	Exercise 4: MongoDB

You want to develop a site that allows users to order different coffees from all around the world. You want your users to easily navigate through the wide range of different coffees. Of course, you want to scale large and chose MongoDB to store your application data. You chose to work with denormalized data to improve reading speed of your database. The following use cases should be implemented by your backend. Write the corresponding MongoDB commands.

### Database schema

1. When registering, each user needs to provide a username, an email address and optionally a phone number. Moreover, each user is stored in the database with a unique id.

2. To receive packages each user supplies an address. The address contains a street and number, the post code as well as the city name.

   ~~~json
   // User
   {
       "id": String,
       "username": String,
       "email": String,
       "phone": String,
       "address": {
           "street": String,
           "number": Number,
           "postCode": Number,
           "city": String,
       }
   }
   ~~~

   

3. Each available coffee is stored with a unique product id, its name, and the strength of the coffee. Moreover, each product has a price, a supplier and contains the information whether the coffee is currently in stock.

   ~~~json
   // Product
   {
       "id": String,
       "name": String,
       "strength": String,
       "price": Number,
       "supplier": Reference,
       "inStock": Boolean,  
   }
   ~~~

   

4. Each supplier consists of a unique supplier id, a name and an address.

   ~~~json
   // Supplier
   {
       "id": String,
       "name": String,
       "address": {
           "street": String,
           "number": Number,
           "postCode": Number,
           "city": String,
       }
   }
   ~~~

5. When ordering a product, the order is saved containing the user that placed the order, the ordered products and the ordered quantities for each product, as well as the price of the complete order. To avoid redundancy, save the orders normalized and reference the user and products via their ids.

   ~~~json
   // Order
   {
       "id": String,
       "user": Reference,
       "products": [
           {
            	"productId": Reference,
               "quantity": Number,
           },
       ],
       "totalPrice": Number,
   }
   ~~~

### Insert data

...

### Basic queries

6. Query all documents in the collection users.

~~~sql
db.users.find( {} )
~~~

7. Output all products sorted ascending by price.

~~~sql
db.products.find( {} ).sort( { price: 1 } )
~~~

8. Query all coffees/products with the strength ’mild’.

~~~sql
db.products.find( { strength: "mild" } )
~~~

9. Query all users that have not given a phone number.

~~~sql
db.users.find( { phone: {$exists: false} } )
~~~

10. Query all products that cost not more than 20€, are currently available, and do not come from the supplier Nestle.

    ~~~sql
    db.products.find(
        {
        price: {$lt: 20},
        inStock: {$eq: true},
        supplier: {$ne: "Nestle"},
        }
    )
    ~~~

11. Query all orders containing more than one product, and only list the user-id, all product-ids and the price of the order.

    ~~~sql
    db.orders.find( 
        { 
        "products.1": {$exists: true},
        },
        {
        	user: 1,
        	totalPrice: 1,
        	"products.productId": 1,
        }
    )
    ~~~

12. Change the email address of the user ’Max Musterman’ to ’max@muster.com’.

    ~~~sql
    db.users.updateOne(
    	{
       	username: "Max Musterman",
        },
        {
        $set: {
        	email: "max@muster.com",
        }
        }
    )
    ~~~

### Aggregation

13. Find all products from the supplier ’Dallmayr’.

    ~~~sql
    db.products.aggregate([
    	{ $match: { supplier: "Dallmayr" } }  
    ])
    ~~~

14. Query all products and rename the following fields to any other value of your liking: name (of the product), price and name of the supplier. Output only those three fields.

    ~~~sql
    db.products.aggregate([
        {
        $project: {
        	_id: 0,
        	what: "$name",
        	the: "$price",
        	fuck: "$supplier"
        }
        }
    ])
    ~~~

15. Find the order with the max price.

    ~~~sql
    db.orders.aggregate([
        {
        $group: { _id: null, max: {$max: "$totalPrice"}}
        }
    ])
    ~~~

16. Find the highest ever ordered quantity of a product.

    ~~~sql
    db.orders.aggregate([
        {
        $group: { _id: null, max: {$max: "$products.quantity"}}
        }
    ])
    ~~~

17. Create a new field ‘hasNumber’ containing a Boolean value representing whether the user has given a phone number or not.

    ~~~sql
    db.users.aggregate([
      {
        $set: {
          hasNumber: {
            $cond: { if: { $eq: ["$phone", undefined] }, then: false, else: true },
          }
        }
      }
    ])
    ~~~

18. Query all orders from the users with the Id 1 or 2. Output the total sum paid per user.

    ~~~sql
    db.orders.aggregate([
        {
        $project: {
        user: 1,
        sum: { $sum: "$totalPrice" },
        }
        },
        {
        $match: {
        	$or: [{user: {$eq: "1"}}, {user: {$eq: "2"}}],
        	}
        }
    ])
    ~~~

19. Count how often each product has been ordered.

    ~~~sql
    db.orders.aggregate([
        {
        $unwind: "$products"
        },
        {
        $group: {
        	_id: "$products.productId",
        	sum: { $sum: "$products.quantity" }
        }
        }
    ])
    ~~~

20. Query all orders. For each user list the total amount of orders, the average price per order, and all products/the Ids of these products ever ordered by this user. If a product occurs in more than one order it should only be listed once. Show only the users with an average price per order over 100€.

    ~~~sql
    db.orders.aggregate([
        {
        $unwind: "$products",
        },
        {
        $group: {
        	_id: "$user",
        	avgPrice: { $avg: "$totalPrice" },
        	products: { $addToSet: "$products.productId" },
        	countOrders: { $sum: 1 },
        }
        },
        {
        $match: {
        	avgPrice: { $gt: 100 }
        	}
        }
    ])
    ~~~
    
    COUNT FUNKTIONIERT NOCH NICHT RICHTIGs!