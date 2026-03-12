import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Transaction from "../Models/transaction.model.js";
import User from "../Models/User.model.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RZP_key_id,
  key_secret: process.env.RZP_key_secret,
});

export const checkout = async (req, res) => {
  try {
    const { amount } = req.body;
    
    // Input Validation
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "Valid amount is required" });
    }

    if (!process.env.RZP_key_id || !process.env.RZP_key_secret) {
       console.error("Razorpay API credentials are not set in the environment variables.");
       return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    const receipt_id = `receipt_order_${Math.floor(Math.random() * 100000)}`;

    const options = {
      amount: Number(amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: receipt_id,
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ success: false, message: "Failed to create order with payment gateway" });
    }

    // Getting userId depending on how auth middleware attaches it
    const userId = req.user ? req.user._id : req.userId;

    if (!userId) {
       return res.status(401).json({ success: false, message: "Unauthorized: User ID not found in request" });
    }

    // Save initial transaction in DB
    const transaction = new Transaction({
      userId: userId,
      receipt_id: receipt_id,
      razorpay_order_id: order.id,
      amount: amount, 
      currency: "INR",
      status: "created"
    });

    await transaction.save();

    return res.status(200).json({
      success: true,
      order,
      key_id: process.env.RZP_key_id,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Input Validation
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required payment verification details" 
      });
    }

    // Find the transaction in the DB
    const transaction = await Transaction.findOne({ razorpay_order_id });
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    // Idempotency: Ignore if already captured
    if (transaction.status === "captured") {
        return res.status(400).json({ success: false, message: "Transaction already processed" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RZP_key_secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 1. Update Transaction to captured
      transaction.razorpay_payment_id = razorpay_payment_id;
      transaction.razorpay_signature = razorpay_signature;
      transaction.status = "captured";
      await transaction.save();

      // 2. Update User profile with payment status and link the transaction ID
      await User.findByIdAndUpdate(transaction.userId, {
        paymentStatus: "approved",
        transactionId: transaction._id,
        "plan.amount": transaction.amount
      });

      return res.status(200).json({
        success: true,
        message: "Payment successfully verified"
      });
    } else {
      
      transaction.status = "failed";
      transaction.error_description = "Invalid payment signature verification failed";
      await transaction.save();

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature. Verification failed.",
      });
    }
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
