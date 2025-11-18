import express from "express";
import Vote from "../models/Vote.js";
import Voter from "../models/Voter.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", verifyToken, async (req, res) => {
  const voter = await Voter.findById(req.user.id);
  res.render("voter/voterDashboard", { voter });
});

router.get("/vote", verifyToken, async (req, res) => {
  const voter = await Voter.findById(req.user.id);
  if (voter.hasVoted) return res.send("You already voted");
  res.render("voter/vote");
});

router.post("/vote", verifyToken, async (req, res) => {
  const voter = await Voter.findById(req.user.id);
  if (voter.hasVoted) return res.send("Already voted");

  await Vote.create({
    voterId: voter._id,
    candidate: req.body.candidate
  });

  voter.hasVoted = true;
  await voter.save();

  res.send("Vote Submitted Successfully");
});

export default router;
