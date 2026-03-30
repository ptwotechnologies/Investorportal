import connectDB from '../lib/db.js'; // Add this import
import User from "../Models/User.model.js";
import PendingUser from "../Models/PendingUser.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import resend, { RESEND_FROM } from "../lib/resend.js";
import verificationTemplate from "../emailTemplates/verificationTemplate.js";


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

    // 2. Check if email already exists in User collection
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Generate Verification OTP
    const verificationOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    // 5. Create Pending User
    // We update if already exists in Pending to avoid multiple records for same email
    const pendingUser = await PendingUser.findOneAndUpdate(
      { email },
      {
        role,
        password: hashedPassword,
        businessDetails,
        verificationOtp,
        verificationOtpExpire,
      },
      { upsert: true, new: true }
    );

    // 6. Send Verification Email
    try {
      const emailResponse = await resend.emails.send({
        from: RESEND_FROM,
        to: [email],
        subject: "Verify Your Email - Copteno Investor Portal",
        html: verificationTemplate(pendingUser._id, verificationOtp)
      });
      
      if (emailResponse.error) {
        console.error("Resend API Error details:", emailResponse.error);
      }
    } catch (emailError) {
      console.error("Failed to send verification email (system error):", emailError);
    }

    res.status(201).json({
      message: "Success! Visit your email to verify your account.",
      userId: pendingUser._id,
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
    user.additionalDetails = {
      ...user.additionalDetails,
      ...additionalDetails
    };

    if (user.role === "investor") {
      user.registrationStep = 4;        // onboarding complete
      user.paymentStatus = "pending";  // logical approval
    } 
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

export const uploadPortalFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Return the R2 public location
    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: req.file.location,
      fileName: req.file.originalname,
    });
  } catch (error) {
    console.error("Portal File Upload Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
  // ✅ ADD THIS - Send complete user data
  user: {
    _id: user._id,
    email: user.email,
    role: user.role,
    businessDetails: user.businessDetails,
    additionalDetails: user.additionalDetails,
    paymentStatus: user.paymentStatus,
  }
});

  } catch (error) {
    console.error("Login Error:", error);
    
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({ message: "Database connection issue. Please try again." });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    if (!emailOrPhone) {
      return res.status(400).json({ message: "Email or Phone is required" });
    }

    const user = await User.findOne({
      $or: [
        { email: emailOrPhone },
        { "businessDetails.number": emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isEmail = emailOrPhone.includes("@");

    if (isEmail) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      user.resetOtp = otp;
      user.otpExpire = Date.now() + 5 * 60 * 1000;
      await user.save();

      await resend.emails.send({
        from: RESEND_FROM,
        to: [user.email],
        subject: "Password Reset OTP",
        html: `
          <h2>Password Reset</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP will expire in 5 minutes</p>
        `
      });

      res.status(200).json({
        message: "OTP sent to email",
        type: "email"
      });
    } else {
      res.status(200).json({
        message: "User found, proceeding with phone verification",
        type: "phone",
        phone: user.businessDetails.number
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetOtp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({
      message: "OTP verified"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, phone, newPassword } = req.body;

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ "businessDetails.number": phone });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetOtp = null;
    user.otpExpire = null;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ message: "User ID and OTP are required" });
    }

    // Look in PendingUser collection
    const pendingUser = await PendingUser.findById(userId);
    if (!pendingUser) {
      return res.status(404).json({ message: "Verification record not found or expired" });
    }

    if (pendingUser.verificationOtp !== otp || pendingUser.verificationOtpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP Correct! Now create the real User
    const newUser = await User.create({
      email: pendingUser.email,
      password: pendingUser.password,
      role: pendingUser.role,
      businessDetails: pendingUser.businessDetails,
      isVerified: true,
      registrationStep: 2,
    });

    // Delete the pending record
    await PendingUser.findByIdAndDelete(userId);

    res.status(200).json({
      message: "Email verified successfully",
      registrationStep: newUser.registrationStep,
      token: jwt.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' }),
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resendVerificationOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const pendingUser = await PendingUser.findById(userId);
    if (!pendingUser) {
      return res.status(404).json({ message: "Verification record not found. Please sign up again." });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpire = Date.now() + 10 * 60 * 1000;

    pendingUser.verificationOtp = newOtp;
    pendingUser.verificationOtpExpire = newExpire;
    await pendingUser.save();

    const emailResponse = await resend.emails.send({
      from: RESEND_FROM,
      to: [pendingUser.email],
      subject: "Resend Verification Link - Copteno Investor Portal",
      html: verificationTemplate(pendingUser._id, newOtp)
    });

    if (emailResponse.error) {
      console.error("Resend API Error during OTP resend:", emailResponse.error);
      return res.status(500).json({ 
        message: "Failed to send email", 
        error: emailResponse.error.message 
      });
    }

    res.status(200).json({ message: "Verification link resent successfully" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};