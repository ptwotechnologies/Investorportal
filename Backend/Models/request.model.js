import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["raised", "forwarded", "interested", "accepted", "deal_created", "completed", "redeemed"],
      default: "raised",
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

   
    forwardedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    
    interestedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Final selected provider
    acceptedProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
      seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ignoredBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    interestDetails: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        startTime: { type: String },
        relevance: { type: String },
      },
    ],
    budget: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Urgent (within 1 week)", "Short term (1–3 weeks)", "Planned (1–2 months)", "Flexible"],
      default: "Flexible",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Request || mongoose.model("Request", requestSchema);
