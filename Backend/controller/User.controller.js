import connectDB from '../lib/db.js'; // Add this import
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

    // 1a. Role-specific validation
    if (role === "service_professional") {
      const { serviceType, companyName } = businessDetails;
      if (!serviceType) {
        return res.status(400).json({ message: "Service type is required for service professionals" });
      }
      if (serviceType === "Company" && !companyName) {
        return res.status(400).json({ message: "Company name is required for service professionals of type Company" });
      }
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

    

    if (user.role === "service_professional") {
      if (user.businessDetails && user.businessDetails.serviceType === "Company") {
        if (!user.businessDetails.companyName) {
          return res.status(400).json({ message: "Company name missing for service professional" });
        }
      }
    }

    if (user.role === "startup") {
      if (!additionalDetails || !additionalDetails.startupBusinessType) {
        return res.status(400).json({ message: "Startup business type is required" });
      }
    }

    // Update additionalDetails and registrationStep
    user.additionalDetails = additionalDetails;
     if (user.role === "investor") {
      user.registrationStep = 4;        // onboarding complete
      user.paymentStatus = "pending";  // logical approval
    } 
    // 🔥 OTHER ROLES
    else {
      user.registrationStep = 3;
    }

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

     if (user.role === "investor") {
      return res.status(403).json({
        message: "Investors are not allowed to select plans",
      });
    }


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


// In your login controller file

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Fixed: findOne (not findone)
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.role !== "investor" && user.paymentStatus !== "approved") {
      return res.status(403).json({
        message: "Please complete all signup steps and payment to login.",
      });
    }

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
    
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({ message: "Database connection issue. Please try again." });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};





