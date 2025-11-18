import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Admin from "./models/Admin.js";
import bcrypt from "bcrypt";

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("Admin already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({ email: "admin@example.com", password: hashedPassword });
    console.log("Admin created");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

createAdmin();
