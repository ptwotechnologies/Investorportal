import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    
    // Internal Reference
    receipt_id: { type: String, required: true }, 

    // Razorpay Specific Identifiers
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, default: "" },
    razorpay_signature: { type: String, default: "" },

    // Financial Details
    amount: { type: Number, required: true }, // Store in base currency context, likely INR subunits (paise) for razorpay compatibility
    currency: { type: String, default: "INR" },
    
    // Transaction Status
    status: {
      type: String,
      enum: ["created", "authorized", "captured", "refunded", "failed"],
      default: "created",
    },
    
    // Any error details if the payment fails
    error_description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
