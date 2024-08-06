import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
}

export const Signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }
    console.log('Creating user...');
    const user = await User.create({ email, password });
    console.log('User created:', user);
    const token = createToken(email, user.id);
    console.log('Token created:', token);
    res.cookie("jwt", token, {
      maxAge,
      secure: true,
      sameSite: "None"
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup
      }
    });

  } catch (err) {
    console.log('Error during signup:', err);
    return res.status(500).send("Internal Server Error");
  }
}
