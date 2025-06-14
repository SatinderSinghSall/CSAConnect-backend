const Challenge = require("../models/Challenge");
const User = require("../models/User");
const nodemailer = require("nodemailer");

exports.addChallenge = async (req, res) => {
  const { title, content, link, postedBy } = req.body;

  if (!title || !content || !link || !postedBy) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Save the challenge
    const challenge = new Challenge({ title, content, link, postedBy });
    await challenge.save();

    // Get the name of the admin who posted
    const adminUser = await User.findById(postedBy);
    const adminName = adminUser?.name || "An Admin";

    // Fetch all user emails
    const users = await User.find({}, "email");
    const emailList = users.map((user) => user.email);
    const testEmail = "satindersinghsall111@gmail.com";

    // Set up the transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"CSA Connect" <${process.env.EMAIL_USER}>`,
      to: emailList,
      subject: `🚀 New Challenge by ${adminName}: ${title}`,
      html: `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); color: #333;">
      <h2 style="color: #007bff; text-align: center;">🚀 New Challenge Alert!</h2>
      <p style="font-size: 16px;">Hi there,</p>
      <p style="font-size: 16px;"><strong>${adminName}</strong> has just posted a new challenge on <strong>REVA University: CSA Connect</strong>. Check out the details below:</p>
      
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border-left: 5px solid #007bff; margin: 20px 0;">
        <p style="margin: 0; font-size: 16px;"><strong>📌 Title:</strong> ${title}</p>
        <p style="margin: 10px 0 0; font-size: 16px;"><strong>📝 Description:</strong> ${content}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://reva-csaconnect.vercel.app/challenges" target="_blank" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold;">View Challenge</a>
      </div>

      <p style="font-size: 14px; color: #666; text-align: center;">Explore more on <strong>REVA University: CSA Connect</strong> and stay inspired!</p>
    </div>
  `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Challenge added and notification emails sent." });
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

exports.updateChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Challenge.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Failed to update." });
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
