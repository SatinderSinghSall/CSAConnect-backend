const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) return res.status(401).json({ message: "Invalid admin token" });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized admin access" });
  }
};

module.exports = adminAuth;
