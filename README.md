# demo_store
A minimal full-stack **Demo Store** application built with **Node.js + Express + Sequelize** on the backend and **React + Vite** on the frontend.

This project demonstrates:
- Authentication with JWT  
- User roles and profile management  
- Product list and basic API  
- Shopping cart with persistent state (localStorage)

## Tech Stack

**Backend:**
- Node.js, Express
- Sequelize ORM
- SQLite / PostgreSQL
- JWT Authentication
- Mocha + Chai + Supertest (for testing)

**Frontend:**
- React (Vite)
- React Router (HashRouter)
- Tailwind CSS
- Context API (Auth + Cart)

## Install dependencies
```bash
npm install
```
## Start server
```bash
npm start
```
## Run tests
```bash
npm test
```
## Create a test database
```bash
sudo su postgres
psql
CREATE DATABASE demo_store;
CREATE DATABASE demo_store_test;
\l
\c demo_store_test
```
## ORM
Creating [Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-model-and-migration) Model (and Migration) via CLI
```bash
npx sequelize-cli model:generate --name User --attributes username:string,password_hash:text
```

## Managing ORM
For development
```bash
npx sequelize-cli db:migrate --env development
```
For test environment
```bash
NODE_ENV=test npx sequelize-cli db:migrate
```

## API Endpoints

## GET /ping
Check basic server response.
Request:
```bash
GET /ping
```
Example with curl:
```bash
curl http://127.0.0.1:1337/ping
```
Response:
```bash
"pong"
```

## GET /hello
Simple hello endpoint.
Request:
```bash
GET /hello
```
Response:
```bash
"Hello"
```

## GET /status
Check server health and uptime.
Request:
```bash
GET /status
```
Response:
```json
{ "status": "ok", "uptime": "123.45" }
```

## Users

Registration → POST /users/register
```bash
curl -X POST http://127.0.0.1:1337/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"Alice","password":"123456"}'
```
Response
```json
{ "id": 1, "username": "Alice" }
```
Login → POST /users/login
```bash
curl -X POST http://127.0.0.1:1337/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"Alice","password":"123456"}'
```
Response
```json
{ "token": "your_token" }
```
Request with token
```bash
curl -X GET http://127.0.0.1:1337/users/me \
  -H "Authorization: Bearer your_token"
```
Response
```json
{ "id": 1, "username": "Alice" }
```
Request with no token
```bash
curl -X GET http://127.0.0.1:1337/users/me
```
Response
```json
{ "error": "Authorization header missing" }
```

## Step 6 — Products CRUD API
Add the products table and REST API /products:
`GET /products` — list of all products
`GET /products/:id` — specific product
`POST /products` — create a new product
`PUT /products/:id` — update a product
`DELETE /products/:id` — delete a product

## Create Product Model and Migration
```bash
npx sequelize-cli model:generate --name Product --attributes name:string,price:float,description:text
```

## Products
GET products
```bash
curl -X GET http://127.0.0.1:1337/products/
```
GET product by id
```bash
curl -X GET http://127.0.0.1:1337/products/1
```
Add new product
```bash
curl -X POST http://127.0.0.1:1337/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Donut","price":"123456","description":"Best donut ever"}'
```
Update product by id
```bash
curl -X PUT http://127.0.0.1:1337/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Donut","price":"123456","description":"Probably the best donut ever"}'
```
Delete product by id
```bash
curl -X DELETE http://127.0.0.1:1337/products/1
```

## Step 7 — Products CRUD API
Create users roles (regular user and admin) as a column in Users table.

## Step 8 — Products CRUD API
Move roles to a new table.