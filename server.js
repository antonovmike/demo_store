const express = require("express");
const app = express();
const PORT = 1337;

// Route imports
const basicRoutes = require("./routes/basic");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Middleware logging each request
app.use(logger);

// Connecting routes
app.use("/", basicRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Starting the server, if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
}

// export for testing
module.exports = app;
