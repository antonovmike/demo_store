const express = require("express");
const app = express();
const PORT = 1337;

// Route imports
const basicRoutes = require("./routes/basic");
const usersRoutes = require("./routes/userRoutes");

const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const initDb = require("./db/init");

// Middleware logging each request
app.use(logger);

// Add a JSON parser to make POST requests work
app.use(express.json());

// Connecting routes
app.use("/", basicRoutes);
app.use("/users", usersRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Starting the server, if not testing
(async () => {
  await initDb(); // Initialize the database schema
  if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server running at http://127.0.0.1:${PORT}`);
    });
  }
})();

// export for testing
module.exports = app;
