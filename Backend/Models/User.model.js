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
      // General fields (made optional to support different roles)
       firstName: { type: String, default: "" },
      lastName: { type: String, default: "" },
      number: { type: String, default: "" },
      website: { type: String, default: "" },
      // Investor-specific fields
      investorType: { type: String, default: "" }, // Venture Capitalist, Angel Investor, Venture Firm
      firmName: { type: String, default: "" },
      // Service professional specific fields
      serviceType: { type: String, default: "" }, // Freelancer, Company
      companyName: { type: String, default: "" },
     
    },

    additionalDetails: {
      linkedinProfile: { type: [String], default: [] },
      // Investor-only optional fields and startup files
      foundedon: { type: Date },
      domain: { type: String, default: "" },
      referralCode: { type: String, default: "" },
      logoFileName: { type: String, default: "" },
      profileFileName: { type: String, default: "" },
      pitchDeckFileName: { type: String, default: "" },
      startupBusinessType: { type: String, default: "" },
      designation: { type: String, default: "" },
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
