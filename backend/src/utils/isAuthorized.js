const jwt = require("jsonwebtoken");
const User = require("../db/models/user.models");

exports.isAuthorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Invalid token" });
      }
      // Token is valid, find user and attach to request object
      User.findByPk(decoded.id)
        .then((user) => {
          if (!user) {
            return res.status(401).json({ message: "User not found" });
          }
          req.user = user.dataValues;
          next();
        })
        .catch((error) => {
          console.error("User retrieval error:", error);
          res.status(500).json({ message: "Failed to authenticate" });
        });
    });
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ message: "Failed to authenticate" });
  }
};
