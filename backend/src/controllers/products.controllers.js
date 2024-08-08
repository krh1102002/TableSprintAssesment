const Product = require("../db/models/product.models");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { productName, subCategoryId, categoryId } = req.body;
    const product = await Product.create({
      productName,
      subCategoryId,
      categoryId,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Add product error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id, productName, subCategoryId, categoryId, status } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.productName = productName;
    product.subCategoryId = subCategoryId;
    product.categoryId = categoryId;
    product.status = status;
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
