import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    // Check if all fields are provided
    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user (without username)
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Profile Controller (Add Username and Category)
export const updateusername = async (req, res) => {
  try {
    const { email, username, category } = req.body;

    // Check if all required fields are provided
    if (!email || !username || !category) {
      return res
        .status(400)
        .json({ message: "Email, username, and category are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Update user details
    user.username = username;
    user.category = category;
    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { firstname: user.firstname, lastname: user.lastname },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const { firstname, lastname, email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the new email already exists (excluding the current user)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email is already in use" });
      }
      user.email = email;
    }

    // Update fields
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;

    // Hash password if updated
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token middleware
    const user = await User.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
