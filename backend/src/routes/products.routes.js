const express = require("express");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controllers");
const { isAuthorized } = require("../utils/isAuthorized");

const router = express.Router();

// Get all products
router.get("/", isAuthorized, getAllProducts);

// Add a new product
router.post("/", isAuthorized, addProduct);

// Update a product
router.put("/", isAuthorized, updateProduct);

// Delete a product
router.delete("/", isAuthorized, deleteProduct);

module.exports = router;
