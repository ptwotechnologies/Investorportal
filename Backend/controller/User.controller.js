import User from "../Models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createUser = async (req, res) => {
  try {
    const { role, email, password, businessDetails } = req.body;

    // 1. Basic validation
    if (!role || !email || !password || !businessDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const newUser = await User.create({
      role,
      email,
      password: hashedPassword,
      businessDetails,
      registrationStep: 2, // Step 2 after business details
    });

    res.status(201).json({
      message: "User created successfully",
      userId: newUser._id,
      registrationStep: newUser.registrationStep,
    });

  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




export const updateAdditionalDetails = async (req, res) => {
  try {
    const { userId, additionalDetails } = req.body;

    if (!userId || !additionalDetails) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update additionalDetails and registrationStep
    user.additionalDetails = additionalDetails;
    user.registrationStep = 3; // Step 3 after additionalDetails
    await user.save();

    res.status(200).json({
      message: "Additional details updated successfully",
      registrationStep: user.registrationStep,
    });
  } catch (error) {
    console.error("Update Additional Details Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const updatePlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;

    if (!userId || !plan || typeof plan.amount !== "number") {
      return res.status(400).json({ message: "Valid plan amount is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.plan = plan;
    user.registrationStep = 4; // Step 4 after plan selection
    await user.save();

    res.status(200).json({
      message: "Plan updated successfully",
      registrationStep: user.registrationStep,
    });
  } catch (error) {
    console.error("Update Plan Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const updatePayment = async (req, res) => {
  try {
    const { userId, transactionId, paymentStatus } = req.body;

    if (!userId || !transactionId || !paymentStatus) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["pending", "approved", "rejected"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.transactionId = transactionId;
    user.paymentStatus = paymentStatus;
    if (paymentStatus === "approved") {
      user.registrationStep = 5; // Signup complete
    }
    await user.save();

    res.status(200).json({
      message: "Payment status updated successfully",
      registrationStep: user.registrationStep,
      paymentStatus: user.paymentStatus,
    });
  } catch (error) {
    console.error("Update Payment Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getPaymentStatus = async (req, res) => {
  try {
    const { userId } = req.body; // body se le rahe hain

    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      paymentStatus: user.paymentStatus || "pending",
      transactionId: user.transactionId || null,
    });
  } catch (error) {
    console.error("Get Payment Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Check paymentStatus
    if (user.paymentStatus !== "approved") {
      return res.status(403).json({ message: "Please complete all signup steps and payment to login." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      registrationStep: user.registrationStep,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





