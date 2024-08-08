module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    "SubCategory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subCategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "sub_category_name",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "category_id",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },
      sequence: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );

  return SubCategory;
};
