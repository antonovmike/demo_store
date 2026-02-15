import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import basicRoutes from "./routes/basic.js";
import usersRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

import logger from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Enable CORS for specified origin and credentials to connect frontend and backend
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// Middleware logging each request
app.use(logger);

// Add a JSON parser to make POST requests work
app.use(express.json());

// Connecting routes
app.use("/", basicRoutes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/reset-password", usersRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// export for testing
export default app;
