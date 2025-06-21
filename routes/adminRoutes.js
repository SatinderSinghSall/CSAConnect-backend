const express = require("express");
const {
  getAllUsers,
  deleteUser,
  getAllPostsAdmin,
  deletePostAdmin,
  getAllAdmins,
  deleteAdmin,
  updateAdmin,
  deleteComment,
  getChallengeCount,
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

//! All routes protected by adminAuth middleware
router.use(adminAuth);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/posts", getAllPostsAdmin);
router.delete("/posts/:id", deletePostAdmin);

router.get("/admins", getAllAdmins);
router.delete("/admins/:id", deleteAdmin);
router.put("/admins/:id", updateAdmin);

router.delete("/posts/:postId/comments/:commentId", deleteComment);

router.get("/challenges/count", getChallengeCount);

module.exports = router;
