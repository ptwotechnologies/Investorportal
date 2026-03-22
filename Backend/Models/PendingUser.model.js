import mongoose from "mongoose";

const pendingUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    businessDetails: { type: Object, default: {} },
    verificationOtp: { type: String, required: true },
    verificationOtpExpire: { type: Date, required: true },
  },
  { timestamps: true }
);

// Auto-delete pending users after 24 hours
pendingUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);
export default PendingUser;
