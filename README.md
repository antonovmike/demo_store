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
{
  "status": "ok",
  "uptime": "123.45"  // server uptime in seconds
}
```
