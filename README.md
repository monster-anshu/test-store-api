# Store-Api

## Features
- JWT based authentication 
- Two roles -> user and admin 
- An admin can add, update and delete products and their prices 
- A user can see all products listed with their prices and name 
- A user can get product detail by id also 

## Uses and end-points 

To install run following commands or paste in terminal :
```bash
git clone https://github.com/monster-anshu/Store-Api.git
cd Store-Api
npm install
npm start

```

### For Admin
| Method | Api | Uses |
| :--- | :----: | ---: |
| POST | localhost/api/auth/admin/login       | Login and get authentication token  |
| POST | localhost/api/auth/admin/getadmin       | Get admin deatails  |
| POST | localhost/api/product     | Add a product  |
| DELETE | localhost/api/product/:id       | Delete a product By Product ID  |
| DELETE | localhost/api/product/id/:id       | Delete a product By Object ID  |
| PUT | localhost/api/product/:id       | Update a product By Product ID  |
| PUT | localhost/api/product/id/:id       | Update a product By Object ID  |
| GET | localhost/api/product/admin/id      | Get all product |
| GET | localhost/api/product/admin/:id    | Get product By Product ID |


### For User
| Method | Api | Uses |
| :--- | :----: | ---: |
| POST | localhost/api/auth/login       | Login and get authentication token  |
| POST | localhost/api/auth/getuser       | Get user deatails  |
| GET | localhost/api/product/      | Get all product |
| GET | localhost/api/product/:id    | Get product By Product ID |

- Localhost can be changed according to the users need 
