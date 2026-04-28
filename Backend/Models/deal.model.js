import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: String, // e.g. "10 Days"
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Paid", "Completed"],
    default: "Pending",
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  },
  paidAt: {
    type: Date,
  },
  extensionRequest: {
    days: { type: Number, default: 0 },
    status: { type: String, enum: ["None", "Pending", "Approved", "Disapproved"], default: "None" }
  },
  isDisapproved: {
    type: Boolean,
    default: false
  }
});

const dealSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scopeDescription: {
      type: String,
    },
    scopeItems: [{
      type: String,
    }],
    totalAmount: {
      type: Number,
      required: true,
    },
    totalTimeline: {
      type: String, // e.g. "90 Days"
    },
    currency: {
      type: String,
      default: "INR",
    },
    milestones: [milestoneSchema],
    status: {
      type: String,
      enum: ["Draft", "Negotiating", "Approved", "Documented", "Active", "Completed", "Disputed"],
      default: "Draft",
    },
    negotiation: {
      lastSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      history: [
        {
          senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          milestones: [milestoneSchema],
          scopeDescription: String,
          scopeItems: [String],
          totalAmount: Number,
          totalTimeline: String,
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    documentation: {
      startupAgreed: {
        type: Boolean,
        default: false,
      },
      professionalAgreed: {
        type: Boolean,
        default: false,
      },
      startupVerified: {
        type: Boolean,
        default: false,
      },
      professionalVerified: {
        type: Boolean,
        default: false,
      },
      agreementDate: {
        type: Date,
      },
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Partially Paid", "Fully Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Deal = mongoose.model("Deal", dealSchema);
export default Deal;
