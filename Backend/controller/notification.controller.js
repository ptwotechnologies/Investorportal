import Notification from "../Models/notification.model.js";

// User ki notifications fetch karne ke liye
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id; // user id token se mil rahi hai

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Notification read karne ke liye (optional)
export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.body;

    await Notification.findByIdAndUpdate(notificationId, { isRead: true });

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update notification" });
  }
};
