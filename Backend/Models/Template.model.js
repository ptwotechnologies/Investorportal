import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // e.g., "PROFILE_COMPLETION_STARTUP"
  },
  targetRole: {
    type: String,
    enum: ["startup", "investor", "service_professional", "all"],
    required: true,
  },
  title: {
    type: String,
    required: true, // Push notification title
  },
  message: {
    type: String,
    required: true,
  },
  actionLink: {
    type: String,
    default: "/",
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const Template = mongoose.model("Template", templateSchema);
export default Template;
