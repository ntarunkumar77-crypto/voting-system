import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Voter from "../models/Voter.js";
import Vote from "../models/Vote.js";
import adminAuth from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Login
router.get("/login", (req, res) => res.render("admin/adminLogin"));
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.render("admin/adminLogin", { error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET || "defaultSecret");
    res.cookie("token", token);
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    res.send('Server error');
  }
});

// Admin Dashboard
router.get("/dashboard", adminAuth, async (req, res) => {
  try {
    const voters = await Voter.find();
    const votes = await Vote.find().populate("voterId");
    res.render("admin/adminDashboard", { voters, votes });
  } catch (error) {
    console.error(error);
    res.send('Server error');
  }
});

// Add Voter
router.get("/add-voter", adminAuth, (req, res) => res.render("admin/addVoter"));
router.post("/add-voter", adminAuth, async (req, res) => {
  const { name, email, password, voterId } = req.body;
  try {
    console.log('Adding voter:', { name, email, voterId });
    const existingEmail = await Voter.findOne({ email });
    const existingVoterId = await Voter.findOne({ voterId });
    if (existingEmail) return res.send('Voter with this email already exists');
    if (existingVoterId) return res.send('Voter with this voterId already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    await Voter.create({ name, email, password: hashedPassword, voterId });
    console.log('Voter created successfully');
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error('Error adding voter:', error);
    res.send('Server error: ' + error.message);
  }
});

// View Voters
router.get("/voters", adminAuth, async (req, res) => {
  try {
    const voters = await Voter.find();
    res.render("admin/voters", { voters });
  } catch (error) {
    console.error(error);
    res.send('Server error');
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

export default router;
