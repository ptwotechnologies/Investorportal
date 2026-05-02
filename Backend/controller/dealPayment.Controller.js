import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Transaction from "../Models/transaction.model.js";
import Deal from "../Models/Deal.model.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RZP_key_id ? process.env.RZP_key_id.trim() : "",
  key_secret: process.env.RZP_key_secret ? process.env.RZP_key_secret.trim() : "",
});

export const createDealOrder = async (req, res) => {
  try {
    const { amount, dealId, milestoneId } = req.body;
    const userId = req.user._id;

    if (!amount || !dealId || !milestoneId) {
      return res.status(400).json({ success: false, message: "Missing required details" });
    }

    const receipt_id = `deal_${Date.now()}`;
    const options = {
      amount: Number(amount * 100), // paise
      currency: "INR",
      receipt: receipt_id,
      notes: { userId: userId.toString(), dealId, milestoneId }
    };

    const order = await razorpay.orders.create(options);

    const transaction = new Transaction({
      userId,
      dealId,
      milestoneId,
      receipt_id,
      razorpay_order_id: order.id,
      amount,
      currency: "INR",
      status: "created"
    });

    await transaction.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("CREATE DEAL ORDER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyDealPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, dealId, milestoneId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RZP_key_secret)
      .update(body.toString())
      .digest("hex");

    // Allow bypass for testing in development mode
    const isSimulation = process.env.NODE_ENV !== 'production' && req.body.simulateSuccess;

    if (expectedSignature === razorpay_signature || isSimulation) {
      // 1. Update Transaction
      const transaction = await Transaction.findOne({ razorpay_order_id });
      if (transaction) {
        transaction.razorpay_payment_id = razorpay_payment_id;
        transaction.razorpay_signature = razorpay_signature;
        transaction.status = "captured";
        await transaction.save();
      }

      // 2. Update Deal Milestone
      const deal = await Deal.findById(dealId);
      if (deal) {
        // Use Mongoose subdocument helper to find the specific milestone
        const milestone = deal.milestones.id(milestoneId);
        
        if (milestone) {
          console.log(`Updating milestone ${milestoneId} to Paid`);
          milestone.status = "Paid";
          milestone.paidAt = new Date();
          
          // If the deal was 'Documented', move it to 'Active' upon first payment
          if (deal.status === "Documented") {
            deal.status = "Active";
          }
          
          // Explicitly mark the milestones array as modified to ensure Mongoose saves it
          deal.markModified('milestones');
          await deal.save();
          console.log("Deal saved successfully with Paid milestone");
        } else {
          console.error(`Milestone ${milestoneId} not found in deal ${dealId}`);
        }
      }

      res.status(200).json({ success: true, message: "Payment verified and deal updated" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("VERIFY DEAL PAYMENT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
