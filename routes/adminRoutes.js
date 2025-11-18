import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import Voter from "../models/Voter.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "public/uploads/" });

router.get("/dashboard", verifyToken, isAdmin, (req, res) => {
  res.render("admin/adminDashboard");
});

router.get("/voters", verifyToken, isAdmin, async (req, res) => {
  const voters = await Voter.find();
  res.render("admin/voters", { voters });
});

router.get("/add-voter", verifyToken, isAdmin, (req, res) => {
  res.render("admin/addVoter");
});

router.post("/add-voter", upload.single("photo"), async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  await Voter.create({
    name: req.body.name,
    email: req.body.email,
    password: hashed,
    photo: req.file.filename
  });

  res.redirect("/admin/voters");
});

export default router;
