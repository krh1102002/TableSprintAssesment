const express = require("express");
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controllers");
const { isAuthorized } = require("../utils/isAuthorized");

const router = express.Router();

// Get all categories
router.get("/", isAuthorized, getAllCategories);

// Add a new category
router.post("/", isAuthorized, addCategory);

// Update a category
router.put("/", isAuthorized, updateCategory);

// Delete a category
router.delete("/", isAuthorized, deleteCategory);

module.exports = router;
