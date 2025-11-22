import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbURI = process.env.DATABASE_URL;

    await mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

    console.log("MongoDB connected"); 
  } catch (err) {
    console.log("Database Error:", err);
  }
};

export default connectDB;
