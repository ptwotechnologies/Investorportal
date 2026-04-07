import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    interest: { type: String, required: true }, // e.g., 'startup', 'service', 'investor', 'channel'
  },
  { timestamps: true }
);

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
export default ContactUs;
