const express = require("express");
const {
  getAllUsers,
  deleteUser,
  getAllPostsAdmin,
  deletePostAdmin,
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

//! All routes protected by adminAuth middleware
router.use(adminAuth);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/posts", getAllPostsAdmin);
router.delete("/posts/:id", deletePostAdmin);

module.exports = router;
