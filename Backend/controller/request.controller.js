import Request from "../Models/request.model.js";
import User from "../Models/User.model.js";

// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    console.log("DEBUG: createRequest body:", req.body);
    console.log("DEBUG: req.user._id:", req.user?._id);

    const { service, description, budget, priority } = req.body;

    if (!service || !description || !budget) {
      console.log("DEBUG: Missing required fields");
      return res.status(400).json({ message: "Service, description and budget are required" });
    }

    const user = req.user; // Use the user already attached by middleware
    if (!user) {
      console.log("DEBUG: User not found in request object");
      return res.status(404).json({ message: "User not found" });
    }

    // ⭐ Check free plan limit
    const isFreePlan =
      user.plan?.planName === "Explorer Access" ||
      !user.plan?.planName ||
      user.plan?.amount === 0;

    console.log("DEBUG: isFreePlan:", isFreePlan);

    if (isFreePlan) {
      const existingCount = await Request.countDocuments({
        raisedBy: user._id,
        status: { $ne: "redeemed" } // ⭐ Redeemed requests don't count towards limit
      });
      console.log("DEBUG: existingCount for free plan:", existingCount);

      if (existingCount >= 1) {
        return res.status(403).json({
          message: "Free plan limit reached. Please upgrade.",
          limitReached: true,
        });
      }
    }

    const priorityValue = priority || "Flexible";
    console.log("DEBUG: Creating request with priority:", priorityValue);

    const newRequest = await Request.create({
      service,
      description,
      budget,
      priority: priorityValue,
      raisedBy: user._id,
      status: "raised",
    });

    console.log("DEBUG: Request created successfully:", newRequest._id);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("--- CREATE REQUEST ERROR ---");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    if (error.errors) {
      console.error("Validation Errors:", JSON.stringify(error.errors, null, 2));
    }
    console.error("-----------------------------");
    res.status(500).json({ 
      message: error.message, 
      stack: error.stack,
      validationErrors: error.errors 
    });
  }
};

// GET ALL REQUESTS
export const getAllRequests = async (req, res) => {
  try {
    // ⭐ Scenario A: Check for 24h expired accepted requests and redeem them
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    await Request.updateMany(
      {
        raisedBy: req.user._id,
        status: "accepted",
        acceptedAt: { $lt: twentyFourHoursAgo }
      },
      { status: "redeemed" }
    );

    const requests = await Request.find({ raisedBy: req.user._id })
      .populate("interestedBy", "businessDetails role")
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forwardRequest = async (req, res) => {
  try {
    const { requestId, userIds } = req.body;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.forwardedTo = userIds;
    request.status = "forwarded";

    // Clear seenBy so the newly forwarded providers will receive an unseen notification
    request.seenBy = [];

    await request.save();

    res.status(200).json({ message: "Request forwarded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReceivedRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    // Requests forwarded to me
    const forwardedRequests = await Request.find({
      forwardedTo: userId,
    })
      .populate("raisedBy", "businessDetails role")
      .sort({ createdAt: -1 })
      .lean();

    // Add isSeen and hasShownInterest fields
    const forwardedWithSeen = forwardedRequests.map((req) => ({
  ...req,
  isSeen: req.seenBy?.some((id) => id.toString() === userId.toString()) || false,
  hasShownInterest: req.interestedBy?.some((id) => id.toString() === userId.toString()) || false,
  isIgnored: req.ignoredBy?.some((id) => id.toString() === userId.toString()) || false, // ⭐ add this
}));

    // My raised requests where someone showed interest
    const myInterestedRequests = await Request.find({
      raisedBy: userId,
      interestedBy: { $ne: [] },
    })
      .populate("interestedBy", "businessDetails role")
      .sort({ createdAt: -1 })
      .lean();

    const interestedWithSeen = myInterestedRequests.map((req) => ({
      ...req,
      isSeen:
        req.seenBy?.some((id) => id.toString() === userId.toString()) || false,
    }));

    res.status(200).json({
      forwardedRequests: forwardedWithSeen,
      myInterestedRequests: interestedWithSeen,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markInterested = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    console.log("Mark Interested - Request ID:", requestId);
    console.log("Mark Interested - User ID:", userId);

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Current request status:", request.status);
    console.log("Current interestedBy:", request.interestedBy);

    // Check if user is in forwardedTo list
    if (
      !request.forwardedTo.some((id) => id.toString() === userId.toString())
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }


     // ⭐ Check free plan limit on backend
    const user = await User.findById(userId);
    const isFreePlan =
      user.plan?.planName === "Explorer Access" ||
      !user.plan?.planName ||
      user.plan?.amount === 0;

    if (isFreePlan) {
      // Count requests where this user already showed interest
      const alreadyInterestedCount = await Request.countDocuments({
        forwardedTo: userId,
        interestedBy: userId,
      });

      if (alreadyInterestedCount >= 1) {
        return res.status(403).json({
          message: "Free plan limit reached. Please upgrade.",
          limitReached: true,
        });
      }
    }

    // Add user to interestedBy array if not already present
    if (
      !request.interestedBy.some((id) => id.toString() === userId.toString())
    ) {
      request.interestedBy.push(userId);
      
      // Save interest answers
      const { startTime, relevance } = req.body;
      request.interestDetails.push({
        user: userId,
        startTime: startTime || "N/A",
        relevance: relevance || "N/A"
      });

      // Update status to interested when FIRST person shows interest
      if (request.status === "forwarded") {
        request.status = "interested";
        console.log("Updating status to interested");
      }

      // Remove the raiser from seenBy so they get an unseen notification about this interest
      request.seenBy = request.seenBy.filter(
        (id) => id.toString() !== request.raisedBy.toString(),
      );
    }

    await request.save();

    console.log("After save - status:", request.status);
    console.log("After save - interestedBy:", request.interestedBy);

    res.status(200).json({
      message: "Interest sent",
      request: {
        _id: request._id,
        status: request.status,
        interestedBy: request.interestedBy,
      },
    });
  } catch (error) {
    console.error("Error in markInterested:", error);
    res.status(500).json({ message: error.message });
  }
};

export const acceptProvider = async (req, res) => {
  try {
    const { requestId, providerId } = req.body;

    console.log("Accept Provider Request:", { requestId, providerId });

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    console.log("Current request status:", request.status);
    console.log("Current acceptedProvider:", request.acceptedProvider);

    if (request.raisedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Check if providerId is in interestedBy array
    const isInterested = request.interestedBy.some(
      (id) => id.toString() === providerId.toString(),
    );

    if (!isInterested) {
      return res
        .status(400)
        .json({ message: "Provider has not shown interest" });
    }

    request.acceptedProvider = providerId;
    request.status = "accepted";
    request.acceptedAt = new Date(); // ⭐ Record acceptance time for 24h check

    await request.save();

    console.log("Updated request status:", request.status);
    console.log("Updated acceptedProvider:", request.acceptedProvider);

    res.status(200).json({
      message: "Provider accepted successfully",
      request: {
        _id: request._id,
        status: request.status,
        acceptedProvider: request.acceptedProvider,
      },
    });
  } catch (error) {
    console.error("Error in acceptProvider:", error);
    res.status(500).json({ message: error.message });
  }
};

export const markRequestAsSeen = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Check if user is in forwardedTo list OR is the raiser
    const isForwarded = request.forwardedTo.some(
      (id) => id.toString() === userId.toString(),
    );
    const isRaiser = request.raisedBy.toString() === userId.toString();

    if (!isForwarded && !isRaiser) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Add user to seenBy array if not already present
    if (!request.seenBy.some((id) => id.toString() === userId.toString())) {
      request.seenBy.push(userId);
      await request.save();
    }

    res.status(200).json({ message: "Request marked as seen" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ignoreRequest = async (req, res) => {
  try {
    const { requestId, providerId } = req.body;
    const userId = req.user._id;

    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // ⭐ Provider ignoring a forwarded request
    if (!providerId) {
      // Check user is in forwardedTo
      if (!request.forwardedTo.some(id => id.toString() === userId.toString())) {
        return res.status(403).json({ message: "Not allowed" });
      }

      // ⭐ Check free plan limit on backend
      const user = await User.findById(userId);
      const isFreePlan =
        user.plan?.planName === "Explorer Access" ||
        !user.plan?.planName ||
        user.plan?.amount === 0;

      if (isFreePlan) {
        const alreadyIgnoredCount = await Request.countDocuments({
          forwardedTo: userId,
          ignoredBy: userId,
        });

        if (alreadyIgnoredCount >= 1) {
          return res.status(403).json({
            message: "Free plan limit reached. Please upgrade.",
            limitReached: true,
          });
        }
      }

      // Add to ignoredBy if not already present
      if (!request.ignoredBy.some(id => id.toString() === userId.toString())) {
        request.ignoredBy.push(userId);
      }

      await request.save();
      return res.status(200).json({ message: "Request ignored successfully" });
    }

    // ⭐ Scenario B: Buyer ignoring an interested professional — NO limit needed
    if (providerId) {
      // Check raiser is the one doing this
      if (request.raisedBy.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Remove provider from interestedBy
      request.interestedBy = request.interestedBy.filter(
        id => id.toString() !== providerId.toString()
      );

      // ⭐ If Buyer ignores, we "redeem" the request immediately so they get slot back
      request.status = "redeemed";

      await request.save();
      return res.status(200).json({ message: "Request redeemed successfully" });
    }

  } catch (error) {
    console.error("Error in ignoreRequest:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.raisedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (request.interestedBy.length > 0) {
      return res.status(400).json({ message: "Cannot cancel request with interests" });
    }

    await Request.findByIdAndDelete(requestId);
    res.status(200).json({ message: "Request cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};