import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  voterId: mongoose.Schema.Types.ObjectId,
  candidate: String
});

export default mongoose.model("Vote", voteSchema);
