const express = require("express");
const app = express();
const PORT = 1337;

// Route imports
const basicRoutes = require("./routes/basic");

// Connecting routes
app.use("/", basicRoutes);

// Starting the server, if not testing
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
  });
}

// export for testing
module.exports = app;
