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
- PostgreSQL
- JWT Authentication
- Jest + Supertest (for testing)

**Frontend:**
- React (Vite)
- React Router (HashRouter)
- Context API (Auth + Cart)

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/antonovmike/demo_store.git
cd demo_store
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Initialize the database
```bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

### 4.1 Start the backend
```bash
npm start
```

### 4.2 Run tests
```bash
npm test
```

### 5. Setup the frontend
```bash
cd demo-store-client
npm install
npm run dev
```
Frontend runs at: 
http://localhost:5173

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

### GET /ping
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

### GET /hello
Simple hello endpoint.
Request:
```bash
GET /hello
```
Response:
```bash
"Hello"
```

### GET /status
Check server health and uptime.
Request:
```bash
GET /status
```
Response:
```json
{ "status": "ok", "uptime": "123.45" }
```

## Authentication Flow

Register a new user (/users/register)
Login to receive a JWT token (/users/login)
Profile page fetches user info from /users/me
Token is stored in localStorage and sent with each request automatically.

## Cart Functionality

Add products from the Products page.
Cart data persists via localStorage.
Edit quantity or remove items.
View total amount dynamically.
Files:
src/context/CartContext.jsx
src/components/CartPage.jsx

## Features Implemented

✅ User registration & login
✅ JWT authentication
✅ Protected /users/me route
✅ Product list with demo items
✅ Add to cart
✅ Cart persistence via localStorage
✅ Cart management (update, remove, clear)

## Project Milestones (Chapter List)

| Step | Branch / Folder                                                   | Description                       |
| ---- | ----------------------------------------------------------------- | --------------------------------- |
| 1    | [step_1](https://github.com/antonovmike/demo_store/tree/step_1)   | Demo server on Node.js            |
| 2    | [step_2](https://github.com/antonovmike/demo_store/tree/step_2)   | Users and Authorization           |
| 3    | [step_3](https://github.com/antonovmike/demo_store/tree/step_3)   | Add JWT                           |
| 4    | [step_4](https://github.com/antonovmike/demo_store/tree/step_4)   | Add Database                      |
| 5    | [step_5](https://github.com/antonovmike/demo_store/tree/step_5)   | Add ORM                           |
| 6    | [step_6](https://github.com/antonovmike/demo_store/tree/step_6)   | Basic logic (Products CRUD API)   |
| 7    | [step_7](https://github.com/antonovmike/demo_store/tree/step_7)   | Authentication for CRUD products  |
| 8    | [step_8](https://github.com/antonovmike/demo_store/tree/step_8)   | Move roles to a separate table    |
| 9    | [step_9](https://github.com/antonovmike/demo_store/tree/step_9)   | React frontend + fix profile page |
| 10   | [step_10](https://github.com/antonovmike/demo_store/tree/step_10) | Add Cart                          |
