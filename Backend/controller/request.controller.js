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
      raisedBy: req.user._id,   // 🔥 MUST
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
      .sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forwardRequest = async (req, res) => {
  try {
    const { requestId, userIds } = req.body; 
    // userIds = array of users jinko forward karna hai

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.forwardedTo = userIds;
    request.status = "forwarded";

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
    .sort({ createdAt: -1 });

    // My raised requests where someone showed interest
    const myInterestedRequests = await Request.find({
      raisedBy: userId,
      interestedBy: { $ne: [] }
    })
    .populate("interestedBy", "businessDetails role")
    .sort({ createdAt: -1 });

    res.status(200).json({
      forwardedRequests,
      myInterestedRequests
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markInterested = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (!request.forwardedTo.includes(userId)) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (!request.interestedBy.includes(userId)) {
      request.interestedBy.push(userId);
    }

    await request.save();

    res.status(200).json({ message: "Interest sent" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const acceptProvider = async (req, res) => {
  try {
    const { requestId, providerId } = req.body;

    const request = await Request.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.raisedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.acceptedProvider = providerId;
    request.status = "accepted";

    await request.save();

    res.status(200).json({ message: "Provider accepted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

