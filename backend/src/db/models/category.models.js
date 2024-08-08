module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "category_name",
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

  return Category;
};
