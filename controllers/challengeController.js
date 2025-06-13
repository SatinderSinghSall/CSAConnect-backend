const Challenge = require("../models/Challenge");

// @desc    Add a new challenge
// @route   POST /api/challenges
// @access  Public or Admin (based on your auth)
exports.addChallenge = async (req, res) => {
  const { title, content, link, postedBy } = req.body;

  if (!title || !content || !link || !postedBy) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const challenge = new Challenge({ title, content, link, postedBy });
    await challenge.save();
    res.status(201).json({ message: "Challenge added successfully." });
  } catch (error) {
    console.error("Add Challenge Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find()
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(challenges);
  } catch (error) {
    console.error("Get Challenges Error:", error);
    res.status(500).json({ message: "Failed to fetch challenges." });
  }
};

exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found." });
    }
    res.status(200).json({ message: "Challenge deleted successfully." });
  } catch (error) {
    console.error("Delete Challenge Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
