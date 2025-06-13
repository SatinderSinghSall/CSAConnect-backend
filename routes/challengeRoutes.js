const express = require("express");
const router = express.Router();
const {
  addChallenge,
  getAllChallenges,
  deleteChallenge,
} = require("../controllers/challengeController");

router.post("/", addChallenge);
router.get("/", getAllChallenges);
router.delete("/:id", deleteChallenge);

module.exports = router;
