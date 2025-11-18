import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Voter from "../models/Voter.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (role === 'admin') {
      const admin = await Admin.findOne({ email });
      if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.send('Invalid credentials');
      }
      const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
      res.cookie('token', token);
      res.redirect('/admin/dashboard');
    } else if (role === 'voter') {
      const voter = await Voter.findOne({ email });
      if (!voter || !(await bcrypt.compare(password, voter.password))) {
        return res.send('Invalid credentials');
      }
      const token = jwt.sign({ id: voter._id, role: 'voter' }, process.env.JWT_SECRET);
      res.cookie('token', token);
      res.redirect('/voter/dashboard');
    } else {
      res.send('Invalid role');
    }
  } catch (error) {
    console.error(error);
    res.send('Server error');
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, password, voterId } = req.body;
  try {
    const existing = await Voter.findOne({ email });
    if (existing) return res.send('Voter already exists');
    const hashed = await bcrypt.hash(password, 10);
    await Voter.create({ name, email, password: hashed, voterId });
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.send('Server error');
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

export default router;
