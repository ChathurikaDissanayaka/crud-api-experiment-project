import Product from "../models/product.model.js";
import logger from "../config/logger.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    logger.info("Fetched products successfully");
    res.status(200).json(products);
  } catch (error) {
    logger.error("Error fetching products");
    res.status(500).json({ message: error.message });
  }
};

// Get a product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    logger.info("Fetched product successfully");
    res.status(200).json(product);
  } catch (error) {
    logger.error("Error fetching product");
    res.status(500).json({ message: error.message });
  }
};

// Add a new product
export const createProduct = async (req, res) => {
  try {
    if (!req.body.name || !req.body.quantity || !req.body.price) {
      logger.error("Missing one or more required fields");
      return res.status(400).send({
        message: "Missing one or more required fields",
      });
    }

    const newProduct = {
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
    };

    const product = await Product.create(newProduct);
    logger.info("Added product successfully");
    res.status(200).json(product);
  } catch (error) {
    logger.error("Error adding product");
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      logger.error("Error fetching product");
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    logger.info("Updated product successfully");
    res.status(200).json(updatedProduct);
  } catch (error) {
    logger.error("Error updating product");
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      logger.error("Error fetching product");
      return res.status(404).json({ message: "Product not found" });
    }
    logger.info("Deleted product successfully");
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    logger.error("Error deleting product");
    res.status(500).json({ message: error.message });
  }
};
