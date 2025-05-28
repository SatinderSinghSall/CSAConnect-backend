const express = require("express");
const authMiddleware = require("../middleware/auth.js");
const {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  postDetail,
  updatePost,
  deletePost,
  getMyPosts,
} = require("../controllers/postController.js");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);

router.get("/my-posts", authMiddleware, getMyPosts);

router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, addComment);
router.get("/:id", postDetail);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
