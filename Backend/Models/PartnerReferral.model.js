import mongoose from "mongoose";

const partnerReferralSchema = new mongoose.Schema(
  {
    referrerEmail: { type: String, required: true },
    role: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    website: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    alreadyRegistered: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "partnerreferrals" }
);

const PartnerReferral = mongoose.model("PartnerReferral", partnerReferralSchema);
export default PartnerReferral;
