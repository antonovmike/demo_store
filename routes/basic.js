const express = require("express");
const router = express.Router();

// GET /ping
router.get("/ping", (req, res) => {
  res.send("pong");
});

// GET /hello
router.get("/hello", (req, res) => {
  res.send("Hello");
});

module.exports = router;
