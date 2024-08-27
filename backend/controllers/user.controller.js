import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export const singUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const emailRegex =
      /^(?=.{1,256})(?=.{1,64}@.{1,255})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "Email Already exists ",
      });
    }
    const existUsername = await User.findOne({ username: username });
    if (existUsername) {
      return res.status(400).json({
        success: false,
        message: "Username Already exists ",
      });
    }
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    //Password hashed to store in database
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    return res.status(200).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
      message: "Account created successfully",
    });
  } catch (error) {
    console.log("Error in SignUp Controller" + error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }
    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Check your Password",
      });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      userData: {
        ...user._doc,
        password: "",
      },
      message: "Login Successfully",
    });
  } catch (error) {
    console.log("Error in Login Controller" + error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    console.log("Error in Logout Controller");
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const authCheck = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
      message: "Authorized User",
    });
  } catch (error) {
    console.log("Error in Auth Check Controller", error.message);
    return res.status(400).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
