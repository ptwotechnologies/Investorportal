import mongoose from "mongoose";

const upgradeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction", required: true },
    fromPlan: { type: String, default: "Free" },
    toPlan: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    cycle: { type: String, default: "Monthly" }, // "Monthly" or "Yearly"
  },
  { timestamps: true }
);

export default mongoose.model("Upgrade", upgradeSchema);
