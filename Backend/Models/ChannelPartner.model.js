import mongoose from "mongoose";

const channelPartnerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    website: { type: String, default: "" },
    alreadyRegistered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ChannelPartner = mongoose.model("ChannelPartner", channelPartnerSchema);
export default ChannelPartner;
