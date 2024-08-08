const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("democrud", "postgres", "pgadmin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    const { Sequelize, DataTypes } = require("sequelize");
    const fs = require("fs");
    const path = require("path");

    const sequelize = new Sequelize("democrud", "postgres", "pgadmin", {
      host: "localhost",
      dialect: "postgres",
      logging: false,
    });

    // Import models
    const Category = require("./models/category.models")(sequelize, DataTypes);
    const SubCategory = require("./models/subCategory.models")(
      sequelize,
      DataTypes
    );
    const Product = require("./models/products.models")(sequelize, DataTypes);

    // Set up associations
    Category.hasMany(SubCategory, {
      foreignKey: "categoryId",
      as: "subCategories",
    });
    SubCategory.belongsTo(Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
    Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

    SubCategory.hasMany(Product, {
      foreignKey: "subCategoryId",
      as: "products",
    });
    Product.belongsTo(SubCategory, {
      foreignKey: "subCategoryId",
      as: "subCategory",
    });

    // Test database connection and sync models
    sequelize
      .authenticate()
      .then(() => {
        console.log("Database connected successfully.");
        return sequelize.sync({ alter: true }); // This will update tables if there are changes
      })
      .then(() => {
        console.log("Models synchronized with database.");
      })
      .catch((err) => console.error("Unable to connect to the database:", err));

    // Export sequelize instance and models
    module.exports = {
      sequelize,
      Category,
      SubCategory,
      Product,
    };
    sequelize.sync();
    console.log("Database connected successfully.");
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
