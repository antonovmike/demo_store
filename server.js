const express = require("express");
const app = express();
const PORT = 1337;

// Route imports
const basicRoutes = require("./routes/basic");
const logger = require("./middleware/logger");

// Middleware logging each request
app.use(logger);
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next(); // go to the next middleware
// });

// Connecting routes
app.use("/", basicRoutes);

// Middleware: 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

// Middleware: Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// Starting the server, if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
}

// export for testing
module.exports = app;
