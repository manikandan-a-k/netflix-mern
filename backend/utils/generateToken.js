import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import cookieParser from "cookie-parser";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in milliseconds
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks make it not be accessed by js
    sameSite: "strict",
    secure: ENV_VARS.NODE_ENV !== "development",
  });
};
