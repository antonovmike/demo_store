const express = require("express");
const app = express();
const PORT = 1337;

// Route /ping
app.get("/ping", (req, res) => {
  res.send("pong");
});

// Route /hello
app.get("/hello", (req, res) => {
  res.send("Hello");
});

// Starting the server, if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
}

// export for testing
module.exports = app;
