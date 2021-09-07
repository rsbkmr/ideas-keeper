import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

schema.pre("save", async function (next) {
  // only hash the password if not already
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

schema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

schema.methods.generateAuthToken = function (password) {
  return jwt.sign({ id: this.id }, process.env.SECRET);
};

export default mongoose.model("User", schema);
