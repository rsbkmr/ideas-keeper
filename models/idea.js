import mongoose from "mongoose";

const schema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  idea: String,
});

export default mongoose.model("Idea", schema);
