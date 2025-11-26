# User Manual

## Table of Contents

1. [Introduction](#introduction)
2. [System Requirements](#system-requirements)
3. [Configuration](#configuration)
4. [Installation](#installation)
5. [Testing](#testing)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Authentication Flow](#authentication-flow)
9. [Cart Functionality](#cart-functionality)
10. [Features Implemented](#features-implemented)
11. [Project Milestones](#project-milestones)

## Introduction

Welcome to the user manual for the Demo Store application. This manual provides step-by-step instructions on how to download, install, configure, run, and test the application. The Demo Store application is a minimal full-stack application built with Node.js, Express, Sequelize, React, and Vite.

## System Requirements

Before proceeding with the installation, make sure you have the following system requirements:

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- PostgreSQL (version 12 or higher)
- Git

## Configuration

Before running the application, you need to configure the database connection. Follow these steps:

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file. Check “.env.example” for example and insert your actual credentials.

## Installation

Follow these steps to install the Demo Store application:

1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/antonovmike/demo_store.git
   cd demo_store
   ```

2. Install the backend dependencies:
   ```bash
   npm install
   ```

3. Install the frontend dependencies:
   ```bash
   cd demo-store-client
   npm install
   ```

3. Initialize the database:
Create a new datebase:
   ```bash
   sudo -u postgres psql
   CREATE DATABASE demo_store;
   CREATE DATABASE demo_store_test;
   ```
   ```bash
   npm run db:migrate
   npm run db:seed:all
   ```

## Testing

To run the tests, follow these steps:

1. Run server tests then client tests in sequence:
   ```bash
   npm test
   ```

2. Run server tests:
   ```bash
   npm run test:root
   ```

2. Run the client tests:
   ```bash
   npm run test:client
   ```

## Running the Application

To run the application, follow these steps:

1. Start the backend:
   ```bash
   npm start
   ```

2. Open a new terminal window. Start the frontend:
   ```bash
   cd  demo-store-client
   npm run dev
   ```

## API Endpoints

The Demo Store application provides the following API endpoints:

### GET /ping

Check the basic server response.

Request:
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
curl http://127.0.0.1:1337/hello
```

Response:
```bash
"Hello"
```

### GET /status

Check server health and uptime.

Request:
```bash
curl http://127.0.0.1:1337/status
```

Response:
```json
{
  "status": "ok",
  "uptime": "123.45"
}
```

## Authentication Flow

Follow these steps to perform the authentication flow:

1. Register a new user:
   - Open the frontend application in your web browser.
   - Navigate to the "Register" page.
   - Fill in the registration form with your details.
   - Click the "Register" button.

2. Login to receive a JWT token:
   - Navigate to the "Login" page.
   - Fill in the login form with your credentials.
   - Click the "Login" button.

3. Profile page fetches user info from /users/me:
   - After successful login, the user is redirected to the profile page.
   - The profile page fetches the user's information from the `/users/me` endpoint.

4. Token is stored in localStorage and sent with each request automatically.

## Cart Functionality

Follow these steps to use the cart functionality:

1. Add products to the cart:
   - Navigate to the "Products" page.
   - Select the products you want to add to the cart.
   - Click the "Add to Cart" button.

2. Cart data persists via localStorage:
   - The cart data is stored in the browser's localStorage, so it will persist even if you refresh the page.

3. Edit quantity or remove items:
   - Navigate to the "Cart" page.
   - Modify the quantity of the items in the cart or remove items as needed.
   - The total amount will be dynamically updated.

## Features Implemented

✅ User registration & login

✅ JWT authentication

✅ Protected /users/me route

✅ Product list with demo items

✅ Add to cart

✅ Cart persistence via localStorage

✅ Cart management (update, remove, clear)

## Project Milestones

| Step | Branch                                                          | Description                       |
| ---- | --------------------------------------------------------------- | --------------------------------- |
|  1 | [step_1](https://github.com/antonovmike/demo_store/tree/step_1)   | Demo server on Node.js            |
|  2 | [step_2](https://github.com/antonovmike/demo_store/tree/step_2)   | Users and Authorization           |
|  3 | [step_3](https://github.com/antonovmike/demo_store/tree/step_3)   | Add JWT                           |
|  4 | [step_4](https://github.com/antonovmike/demo_store/tree/step_4)   | Add Database                      |
|  5 | [step_5](https://github.com/antonovmike/demo_store/tree/step_5)   | Add ORM                           |
|  6 | [step_6](https://github.com/antonovmike/demo_store/tree/step_6)   | Basic logic (Products CRUD API)   |
|  7 | [step_7](https://github.com/antonovmike/demo_store/tree/step_7)   | Authentication for CRUD products  |
|  8 | [step_8](https://github.com/antonovmike/demo_store/tree/step_8)   | Move roles to a separate table    |
|  9 | [step_9](https://github.com/antonovmike/demo_store/tree/step_9)   | React frontend + fix profile page |
| 10 | [step_10](https://github.com/antonovmike/demo_store/tree/step_10) | Add Cart                          |
| 11 | [step_11](https://github.com/antonovmike/demo_store/tree/step_11) | Implement Redux                   |
