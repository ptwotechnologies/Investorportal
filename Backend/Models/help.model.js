import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderRole: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    messages: [messageSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", ticketSchema);