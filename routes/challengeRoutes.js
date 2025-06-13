const express = require("express");
const router = express.Router();
const {
  addChallenge,
  getAllChallenges,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");

router.post("/", addChallenge);
router.get("/", getAllChallenges);
router.put("/:id", updateChallenge);
router.delete("/:id", deleteChallenge);

module.exports = router;
