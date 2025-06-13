const express = require("express");
const router = express.Router();
const {
  addChallenge,
  getAllChallenges,
} = require("../controllers/challengeController");

router.post("/", addChallenge);
router.get("/", getAllChallenges);

module.exports = router;
