import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import basicRoutes from "./routes/basic.js";
import usersRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";

import logger from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { getDirname } from "./utils/paths.js";

const __dirname = getDirname(import.meta.url);

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

// Serve avatars folder
app.use("/avatars", express.static(path.join(__dirname, "assets/avatars")));

// Error handling
app.use(notFound);
app.use(errorHandler);

// export for testing
export default app;
