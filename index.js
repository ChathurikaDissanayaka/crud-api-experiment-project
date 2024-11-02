import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";
import cors from "cors";
import logger from "./config/logger.js";
import requestLogger from "./middleware/requestLogger.js";

const PORT = process.env.PORT || 4000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use(requestLogger);

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello!");
});

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    logger.info("Database connected.");
    app.listen(PORT, () => {
      logger.info(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Database connection failed.");
    console.log(err);
  });
