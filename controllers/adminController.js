const User = require("../models/User");
const Post = require("../models/Post");
const Admin = require("../models/Admin");

//! Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

//! Delete any user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

//! Get all posts
const getAllPostsAdmin = async (req, res) => {
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

//! Delete any post
const deletePostAdmin = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
};

//! Get all admin users
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password"); // Exclude password field
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

//! Delete an admin
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete admin" });
  }
};

//! Update an admin
const updateAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: "Failed to update admin" });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllPostsAdmin,
  deletePostAdmin,
  getAllAdmins,
  deleteAdmin,
  updateAdmin,
};
