import Connection from "../Models/connect.model.js";
import Notification from "../Models/notification.model.js";

// SEND CONNECTION REQUEST
export const sendConnectionRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.body;

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: "You cannot connect with yourself" });
    }

    // check already exists
    const existing = await Connection.findOne({
      senderId,
      receiverId,
    });

    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const connection = await Connection.create({
      senderId,
      receiverId,
      status: "pending",
    });

    // 🔔 Notification create
    await Notification.create({
      userId: receiverId,
      title: "New Connection Request",
      message: "You have received a new connection request",
    });

    res.status(200).json({
      message: "Connection request sent",
      connection,
    });
  } catch (error) {
    console.error("Send connection error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ FIXED: Now populates profilePhoto and coverImage
export const getMyConnections = async (req, res) => {
  try {
    const userId = req.user._id;

    const sent = await Connection.find({
      senderId: userId,
      status: "pending",
    }).populate("receiverId", "businessDetails.firstName businessDetails.lastName profilePhoto coverImage");

    const received = await Connection.find({
      receiverId: userId,
      status: "pending",
    }).populate("senderId", "businessDetails.firstName businessDetails.lastName profilePhoto coverImage");

    const accepted = await Connection.find({
      $or: [
        { senderId: userId },
        { receiverId: userId },
      ],
      status: "accepted",
    }).populate([
      { path: "senderId", select: "businessDetails.firstName businessDetails.lastName profilePhoto coverImage" },
      { path: "receiverId", select: "businessDetails.firstName businessDetails.lastName profilePhoto coverImage" }
    ]);

    res.json({ sent, received, accepted });
  } catch (error) {
    console.error("Get connections error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateConnectionStatus = async (req, res) => {
  try {
    const { connectionId, status } = req.body;

    const connection = await Connection.findById(connectionId);
    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    connection.status = status;
    await connection.save();

    res.json({ message: "Connection updated", connection });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const withdrawConnection = async (req, res) => {
  try {
    const userId = req.user._id;
    const { connectionId } = req.body;

    const connection = await Connection.findById(connectionId);
    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    
    if (connection.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "You can only withdraw your sent requests" });
    }

    await Connection.findByIdAndDelete(connectionId);

    res.status(200).json({ message: "Connection request withdrawn" });
  } catch (error) {
    console.error("Withdraw error:", error);
    res.status(500).json({ message: "Server error" });
  }
};