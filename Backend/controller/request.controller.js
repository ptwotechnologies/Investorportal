import Request from "../Models/request.model.js";

// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {
    const { service, description } = req.body;

    if (!service || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = await Request.create({
      service,
      description,
      raisedBy: req.user._id,
      status: "raised"
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL REQUESTS
export const getAllRequests = async (req, res) => {
  try {
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
      forwardedTo: userId
    })
    .populate("raisedBy", "businessDetails role")
    .sort({ createdAt: -1 })
    .lean();

    // Add isSeen and hasShownInterest fields
    const forwardedWithSeen = forwardedRequests.map(req => ({
      ...req,
      isSeen: req.seenBy?.some(id => id.toString() === userId.toString()) || false,
      hasShownInterest: req.interestedBy?.some(id => id.toString() === userId.toString()) || false
    }));

    // My raised requests where someone showed interest
    const myInterestedRequests = await Request.find({
      raisedBy: userId,
      interestedBy: { $ne: [] }
    })
    .populate("interestedBy", "businessDetails role")
    .sort({ createdAt: -1 })
    .lean();

    const interestedWithSeen = myInterestedRequests.map(req => ({
      ...req,
      isSeen: req.seenBy?.some(id => id.toString() === userId.toString()) || false,
    }));

    res.status(200).json({
      forwardedRequests: forwardedWithSeen,
      myInterestedRequests: interestedWithSeen
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
    if (!request.forwardedTo.some(id => id.toString() === userId.toString())) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Add user to interestedBy array if not already present
    if (!request.interestedBy.some(id => id.toString() === userId.toString())) {
      request.interestedBy.push(userId);
      
      // Update status to interested when FIRST person shows interest
      if (request.status === "forwarded") {
        request.status = "interested";
        console.log("Updating status to interested");
      }

      // Remove the raiser from seenBy so they get an unseen notification about this interest
      request.seenBy = request.seenBy.filter(id => id.toString() !== request.raisedBy.toString());
    }

    await request.save();

    console.log("After save - status:", request.status);
    console.log("After save - interestedBy:", request.interestedBy);

    res.status(200).json({ 
      message: "Interest sent",
      request: {
        _id: request._id,
        status: request.status,
        interestedBy: request.interestedBy
      }
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
      id => id.toString() === providerId.toString()
    );

    if (!isInterested) {
      return res.status(400).json({ message: "Provider has not shown interest" });
    }

    request.acceptedProvider = providerId;
    request.status = "accepted";

    await request.save();

    console.log("Updated request status:", request.status);
    console.log("Updated acceptedProvider:", request.acceptedProvider);

    res.status(200).json({ 
      message: "Provider accepted successfully",
      request: {
        _id: request._id,
        status: request.status,
        acceptedProvider: request.acceptedProvider
      }
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
    const isForwarded = request.forwardedTo.some(id => id.toString() === userId.toString());
    const isRaiser = request.raisedBy.toString() === userId.toString();

    if (!isForwarded && !isRaiser) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Add user to seenBy array if not already present
    if (!request.seenBy.some(id => id.toString() === userId.toString())) {
      request.seenBy.push(userId);
      await request.save();
    }

    res.status(200).json({ message: "Request marked as seen" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};