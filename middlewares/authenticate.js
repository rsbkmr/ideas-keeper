import User from "../models/user.js";
import jwt from "jsonwebtoken";

async function authenticate(req, res, next) {
  try {
    const token = req.get("x-auth-token");
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(id);
    req.user = user;
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
  next();
}

export default authenticate;
