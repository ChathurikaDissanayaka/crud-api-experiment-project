import express from "express";
import mongoose from "mongoose";
import productRoute from "./routes/product.route.js";

const PORT = process.env.PORT || 4000;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello!");
});

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server Running on port: ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed...");
    console.error(err);
  });
