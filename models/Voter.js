import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  voterId: { type: String, unique: true },
  photo: String,
  hasVoted: { type: Boolean, default: false }
});

export default mongoose.model("Voter", voterSchema);
