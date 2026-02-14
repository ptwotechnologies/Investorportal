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
      enum: ["raised", "forwarded", "accepted", "completed"],
      default: "raised",
    },

    raisedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Admin kisko forward karega
    forwardedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Service providers jinhone interest dikhaya
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
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);
