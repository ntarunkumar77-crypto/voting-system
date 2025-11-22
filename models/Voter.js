import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  voterId: { type: String, unique: true },
  photo: String,
  hasVoted: { type: Boolean, default: false }
});
voterSchema.pre("save", function (next) {

  if (!this.voterId) {

    this.voterId = "VOT" + Date.now(); // Auto-generate voterId

  }

  next();

});

export default mongoose.model("Voter", voterSchema);
