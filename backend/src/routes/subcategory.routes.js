const express = require("express");
const {
  getAllSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subcategory.controllers");
const { isAuthorized } = require("../utils/isAuthorized");

const router = express.Router();

// Get all subcategories
router.get("/", isAuthorized, getAllSubCategories);

// Add a new subcategory
router.post("/", isAuthorized, addSubCategory);

// Update a subcategory
router.put("/", isAuthorized, updateSubCategory);

// Delete a subcategory
router.delete("/", isAuthorized, deleteSubCategory);

module.exports = router;
