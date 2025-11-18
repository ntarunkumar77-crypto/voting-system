import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbURI = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/voterDB";
    await mongoose.connect(dbURI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Database Error:", err);
  }
};

export default connectDB;
