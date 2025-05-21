const Post = require("../models/Post.js");

//! Create a post:
const createPost = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
    // console.log("Request file:", req.file);
    // console.log("User info:", req.user);

    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const post = new Post({
      title,
      content,
      author: req.user.id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err);
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

//! Get all posts:
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .populate("comments.user", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

//! Like or unlike a post:
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
    } else {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to like/unlike post" });
  }
};

//! Add comment:
const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();

    // Populate the comments.user and author fields before sending back the post
    const populatedPost = await Post.findById(post._id)
      .populate("author", "name")
      .populate("comments.user", "name");

    res.json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

//! Post detail:
const postDetail = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.user", "name")
      .populate("likes", "name");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//! Update a post:
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const { title, content } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "name")
      .populate("comments.user", "name");

    res.json(updatedPost);
  } catch (err) {
    console.error("Update post error:", err);
    res.status(500).json({ message: "Failed to update post" });
  }
};

//! Delete a post:
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  likePost,
  addComment,
  postDetail,
  updatePost,
  deletePost,
};
