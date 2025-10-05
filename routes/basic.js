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

// GET /status
router.get("/status", (req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime().toFixed(2) // Uptime in seconds, rounded to 2 decimal places.
    });
  });

module.exports = router;
