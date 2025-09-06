const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth Header:", authHeader);

  const token = authHeader?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.log("Invalid token:", err.message);
    res.status(400).json({ message: "Invalid token" });
  }
};


module.exports = authMiddleware;
