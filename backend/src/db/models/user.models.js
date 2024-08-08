const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false, trim: true },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      unique: true,
    },
    password: { type: DataTypes.STRING, allowNull: false, trim: true },
    taskCreated: { type: DataTypes.INTEGER, defaultValue: 0 },
    taskCompleted: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

// JWT Token method
User.prototype.generateJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.SECRET_KEY, { expiresIn: "5d" });
};

module.exports = User;
