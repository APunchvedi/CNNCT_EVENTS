import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
    if (!token)
      return res.status(401).json({ error: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
    req.user = await User.findById(decoded.id).select("-password"); // Attach user data to req.user

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
