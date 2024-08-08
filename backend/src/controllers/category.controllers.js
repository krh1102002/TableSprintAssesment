const Category = require("../db/models/category.models");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fetch categories error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { categoryName, image, sequence } = req.body;
    const category = await Category.create({
      categoryName,
      image,
      sequence,
    });
    res.status(201).json(category);
  } catch (error) {
    console.error("Add category error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id, categoryName, image, status, sequence } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.categoryName = categoryName;
    category.image = image;
    category.status = status;
    category.sequence = sequence;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error("Update category error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
