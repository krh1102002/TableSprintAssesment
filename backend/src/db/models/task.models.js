const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");
const User = require("./user.models");

const Task = sequelize.define(
  "Task",
  {
    title: { type: DataTypes.STRING, allowNull: false, trim: true },
    description: { type: DataTypes.STRING, allowNull: false, trim: true },
    status: { type: DataTypes.STRING, defaultValue: "created" },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

Task.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });

module.exports = Task;
