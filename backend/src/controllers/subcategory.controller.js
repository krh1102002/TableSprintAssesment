const SubCategory = require("../db/models/subCategory.models");

exports.getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.findAll();
    res.status(200).json(subcategories);
  } catch (error) {
    console.error("Fetch subcategories error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId, image, sequence } = req.body;
    const subcategory = await SubCategory.create({
      subCategoryName,
      categoryId,
      image,
      sequence,
    });
    res.status(201).json(subcategory);
  } catch (error) {
    console.error("Add subcategory error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { id, subCategoryName, categoryId, image, status, sequence } =
      req.body;
    const subcategory = await SubCategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    subcategory.subCategoryName = subCategoryName;
    subcategory.categoryId = categoryId;
    subcategory.image = image;
    subcategory.status = status;
    subcategory.sequence = sequence;
    await subcategory.save();
    res.status(200).json(subcategory);
  } catch (error) {
    console.error("Update subcategory error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const subcategory = await SubCategory.findByPk(id);
    if (!subcategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    await subcategory.destroy();
    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    console.error("Delete subcategory error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
