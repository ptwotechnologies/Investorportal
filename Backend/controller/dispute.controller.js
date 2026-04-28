import Dispute from "../Models/dispute.model.js";
import Deal from "../Models/deal.model.js";

export const createDispute = async (req, res) => {
  try {
    const { dealId, milestoneId, amount, reason, evidence } = req.body;
    const userId = req.user._id;

    const deal = await Deal.findById(dealId);
    if (!deal) return res.status(404).json({ message: "Deal not found" });

    const dispute = new Dispute({
      dealId,
      milestoneId,
      amount,
      reason,
      evidence,
      raisedBy: userId,
    });

    await dispute.save();

    res.status(201).json({ success: true, dispute });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyDisputes = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find deals where user is either startup or professional
    const userDeals = await Deal.find({
      $or: [{ startupId: userId }, { professionalId: userId }]
    }).distinct("_id");

    const disputes = await Dispute.find({
      $or: [
        { raisedBy: userId },
        { dealId: { $in: userDeals } }
      ]
    })
    .populate({
      path: "dealId",
      populate: [
        { path: "startupId", select: "businessDetails" },
        { path: "professionalId", select: "businessDetails" }
      ]
    })
    .populate("messages.senderId", "businessDetails role")
    .sort({ updatedAt: -1 });

    res.status(200).json(disputes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addDisputeMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user._id;

    const dispute = await Dispute.findById(id);
    if (!dispute) return res.status(404).json({ message: "Dispute not found" });

    dispute.messages.push({
      senderId: userId,
      message,
    });

    await dispute.save();
    
    // Fetch again with population
    const updatedDispute = await Dispute.findById(id)
      .populate("messages.senderId", "businessDetails role");

    res.status(200).json({ success: true, dispute: updatedDispute });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
