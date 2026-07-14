import mongoose from "mongoose";
import Deal from "../Models/deal.model.js";
import Request from "../Models/request.model.js";
import { emitDealUpdated } from "../lib/socket.js";

// CREATE DEAL DRAFT
export const createDealDraft = async (req, res) => {
  try {
    const { requestId, scopeDescription, scopeItems, milestones, totalAmount, totalTimeline } = req.body;
    const startupId = req.user._id;

    const request = await Request.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Verify user is the one who raised the request
    if (request.raisedBy.toString() !== startupId.toString()) {
      return res.status(403).json({ message: "Unauthorized to create deal for this request" });
    }

    // Verify a professional has been accepted
    if (!request.acceptedProvider) {
      return res.status(400).json({ message: "No professional has been accepted for this request yet" });
    }

    // Check if a deal already exists for this request
    const existingDeal = await Deal.findOne({ requestId });
    if (existingDeal) {
      return res.status(400).json({ message: "A deal already exists for this request", dealId: existingDeal._id });
    }

    const newDeal = await Deal.create({
      requestId,
      startupId,
      professionalId: request.acceptedProvider,
      scopeDescription,
      scopeItems,
      milestones,
      totalAmount,
      totalTimeline,
      status: "Draft",
      negotiation: {
        lastSender: startupId,
      },
      documentation: {
        startupAgreed: false,
        professionalAgreed: false,
      },
    });

    // Update request status
    request.status = "deal_created";
    await request.save();

    // Trigger real-time update for both parties
    emitDealUpdated([startupId, request.acceptedProvider]);

    res.status(201).json({
      message: "Deal draft created successfully",
      deal: newDeal,
    });
  } catch (error) {
    console.error("CREATE DEAL DRAFT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET MY DEALS
export const getMyDeals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { status, spMode } = req.query;
    
    console.log('GET MY DEALS CALLED. userId:', userId, 'role:', req.user?.role, 'spMode:', spMode);

    let query = {
      $or: [
        { startupId: new mongoose.Types.ObjectId(userId) }, 
        { professionalId: new mongoose.Types.ObjectId(userId) }
      ],
    };

    // If the frontend explicitly specifies the mode, we securely filter at the DB level
    if (spMode === "buyer") {
      query = { startupId: new mongoose.Types.ObjectId(userId) };
    } else if (spMode === "provider") {
      query = { professionalId: new mongoose.Types.ObjectId(userId) };
    }
    console.log('Final query:', JSON.stringify(query));

    if (status) {
      query.status = status;
    }

    const deals = await Deal.find(query)
      .populate("startupId", "-password")
      .populate("professionalId", "-password")
      .populate("requestId", "service budget")
      .sort({ updatedAt: -1 });

    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DEAL BY ID
export const getDealById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deal = await Deal.findById(id)
      .populate("startupId", "businessDetails role")
      .populate("professionalId", "businessDetails role")
      .populate("requestId");

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // Verify access
    if (
      deal.startupId._id.toString() !== userId.toString() &&
      deal.professionalId._id.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized access to this deal" });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE DEAL (FOR NEGOTIATION / DRAFT)
export const updateDeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { scopeDescription, scopeItems, milestones, totalAmount, totalTimeline, status } = req.body;
    const userId = req.user._id;

    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // Verify access
    if (
      deal.startupId.toString() !== userId.toString() &&
      deal.professionalId.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Logic for negotiation history
    // If status is changing to 'Negotiating' or a counter is made
    if (req.body.isCounter) {
        deal.negotiation.history.push({
            senderId: userId,
            milestones: deal.milestones,
            scopeDescription: deal.scopeDescription,
            scopeItems: deal.scopeItems,
            totalAmount: deal.totalAmount,
            totalTimeline: deal.totalTimeline,
            timestamp: new Date()
        });
        deal.negotiation.lastSender = userId;
        deal.status = "Negotiating";
        
        // Reset approvals when a counter is made, but set the sender's approval to true
        if (deal.startupId.toString() === userId.toString()) {
            deal.documentation.startupAgreed = true;
            deal.documentation.professionalAgreed = false;
        } else {
            deal.documentation.startupAgreed = false;
            deal.documentation.professionalAgreed = true;
        }
    }

    if (scopeDescription) deal.scopeDescription = scopeDescription;
    if (scopeItems) deal.scopeItems = scopeItems;
    if (milestones) deal.milestones = milestones;
    if (totalAmount) deal.totalAmount = totalAmount;
    if (totalTimeline) deal.totalTimeline = totalTimeline;
    if (req.body.bankDetails) deal.bankDetails = req.body.bankDetails;
    
    // Double Approval Logic
    if (req.body.startupAgreed !== undefined) deal.documentation.startupAgreed = req.body.startupAgreed;
    if (req.body.professionalAgreed !== undefined) deal.documentation.professionalAgreed = req.body.professionalAgreed;

    // Handle Individual Verifications
    if (req.body.startupVerified !== undefined) deal.documentation.startupVerified = req.body.startupVerified;
    if (req.body.professionalVerified !== undefined) deal.documentation.professionalVerified = req.body.professionalVerified;

    // Automatic transition to Documented if both verified
    if (deal.documentation.startupVerified && deal.documentation.professionalVerified) {
        deal.status = "Documented";
    }

    // Double Approval Logic (for Approved status)
    if (deal.documentation.startupAgreed && deal.documentation.professionalAgreed && !["Documented", "Active", "Completed", "Cancelled"].includes(deal.status)) {
        deal.status = "Approved";
    } else if (status && !req.body.isCounter) {
        // Fallback for explicit status updates from other parts of app
        if (!["Documented", "Active", "Completed", "Cancelled"].includes(deal.status)) {
            deal.status = status;
        }
    }

    await deal.save();

    // Trigger real-time update for both parties
    emitDealUpdated([deal.startupId, deal.professionalId]);

    res.status(200).json({
      message: "Deal updated successfully",
      deal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
