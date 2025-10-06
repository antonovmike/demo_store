# demo_store
Training demo project of online store on Node.js + React

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
  -d '{"username":"alice","password":"123456"}'
```
Response
```json
{ "message": "Login successful (JWT will be added later)" }
```
