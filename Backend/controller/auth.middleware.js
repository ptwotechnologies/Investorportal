import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";


export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};


