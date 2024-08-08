const User = require("../db/models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPassword = await bcrypt.hash(password, 10);

    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = user.generateJwtToken();
    res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Sign in error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    console.error("Sign up error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Fetch user details error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
