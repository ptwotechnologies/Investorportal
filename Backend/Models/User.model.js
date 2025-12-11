import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["service_professional", "investor", "startup"],
      required: true,
    },

    businessDetails: {
      number: { type: String, required: true },
      businessName: { type: String, required: true },
      businessEmail: { type: String, required: true },
      website: { type: String, default: "" },
      businessType: { type: String, required: true },
      foundedon: { type: String, required: true },
    },

    additionalDetails: {
      pitchDeckUpload: { type: String, default: "" },
      profileUpload: { type: String, default: "" },
      linkedinProfile: { type: [String], default: [] },
      reason: { type: [String], default: [] },
    },

    plan: {
      amount: { type: Number, default: 0 },
    },

    transactionId: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["not_paid", "pending", "approved", "rejected"],
      default: "not_paid",
    },

    registrationStep: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
