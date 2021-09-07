import User from "../models/user.js";
import { registerValidator, loginValidator } from "../validators/user.js";

async function registerController(req, res) {
  // validation
  const { value, error } = registerValidator(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const userExist = await User.findOne({ email: value.email });
  if (userExist) return res.status(400).json({ error: "user already exist" });

  // create user and send token
  try {
    const user = new User(value);
    await user.save();
    const token = user.generateAuthToken();
    return res.json({ user, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

async function loginController(req, res) {
  // validation
  const { value, error } = loginValidator(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const user = await User.findOne({ email: value.email });
  if (!user) return res.status(400).json({ error: "user does not exist" });

  if (!user.validPassword(value.password))
    return res.status(400).json({ error: "invalid password" });

  // get user
  try {
    const token = user.generateAuthToken();
    return res.json({ user, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
}

export { registerController, loginController };
