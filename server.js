import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import voterRoutes from "./routes/voterRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// Main Page
app.get("/", (req, res) => res.render("index"));

// Mount routes
app.use("/", authRoutes);    //  ⬅ FIXED
app.use("/admin", adminRoutes);
app.use("/voter", voterRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
