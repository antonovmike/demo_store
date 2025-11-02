import express from "express";

const app = express();
const PORT = 1337;

// Route imports
import basicRoutes from "./routes/basic.js";
import usersRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

import logger from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import initDb from "./db/init.js";
import cors from 'cors';

// Enable CORS for specified origin and credentials to connect frontend and backend
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware logging each request
app.use(logger);

// Add a JSON parser to make POST requests work
app.use(express.json());

// Connecting routes
app.use("/", basicRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Starting the server, if not testing
(async () => {
  await initDb(); // Initialize the database schema
  if (import.meta.main) {
    app.listen(PORT, () => {
      console.log(`Server running at http://127.0.0.1:${PORT}`);
    });
  }
})();

// export for testing
export default app;