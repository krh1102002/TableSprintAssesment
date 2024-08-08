module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "product_name",
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sub_category_id",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "category_id",
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },
    },
    {
      timestamps: true,
    }
  );

  return Product;
};
