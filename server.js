import express from "express";

import basicRoutes from "./routes/basic.js";
import usersRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

import logger from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Enable CORS for specified origin and credentials to connect frontend and backend
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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

// export for testing
export default app;
