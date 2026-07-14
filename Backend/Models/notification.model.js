import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["PUSH", "EMAIL", "IN_APP"],
    default: "PUSH",
  },
  status: {
    type: String,
    enum: ["Sent", "Delivered", "Failed"],
    default: "Sent",
  },
  actionLink: {
    type: String,
    default: "/",
  }
}, { timestamps: true });


const Notification = mongoose.model("Notification", notificationSchema)
export default Notification;
