import User from "../Models/User.model.js";
import Profile from "../Models/profile.model.js";
import Notification from "../Models/notification.model.js";
import { sendPushNotification } from "./onesignal.js";

// Map to track user connections: userId string -> Set of socket.id strings
export const userSockets = new Map();

let socketIoInstance = null;

export const initSocket = (io) => {
  socketIoInstance = io;

  io.on("connection", (socket) => {
    console.log(`[SOCKET] Client connected: ${socket.id}`);

    // Register user when they authenticate/connect on frontend
    socket.on("register", (userId) => {
      if (!userId) return;
      socket.userId = userId;

      if (!userSockets.has(userId)) {
        userSockets.set(userId, new Set());
      }
      userSockets.get(userId).add(socket.id);
      console.log(`[SOCKET] User ${userId} registered socket ${socket.id}`);

      // Evaluate portfolio trigger immediately upon connection
      checkAndEmitPortfolioWarning(userId, io, socket.id);
    });

    socket.on("disconnect", () => {
      console.log(`[SOCKET] Client disconnected: ${socket.id}`);
      if (socket.userId && userSockets.has(socket.userId)) {
        const sockets = userSockets.get(socket.userId);
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          userSockets.delete(socket.userId);
        }
      }
    });
  });
};

/**
 * Calculates and evaluates user portfolio status.
 * If user createdAt > 24 hours and portfolio is empty, emits "notification" warning.
 * If user uploaded a portfolio, emits "clear_notification" to dismiss.
 */
export const checkAndEmitPortfolioWarning = async (userId, io = socketIoInstance, targetSocketId = null) => {
  const currentIo = io || socketIoInstance;
  if (!currentIo) {
    console.error("[SOCKET] No Socket.IO instance initialized");
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) return;

    const signupDate = new Date(user.createdAt);
    const hoursSinceSignup = (Date.now() - signupDate.getTime()) / (1000 * 60 * 60);

    const profile = await Profile.findOne({ userId });
    const hasPortfolio = profile && profile.portfolio && profile.portfolio.length > 0;

    // Rule: Warning is active if user registered > 24 hours ago AND has no portfolio uploaded
    const isWarningActive = hoursSinceSignup > 24 && !hasPortfolio;

    if (isWarningActive) {
      // 💾 Persist in MongoDB
      try {
        const existingNotif = await Notification.findOne({
          userId,
          title: "⚠️ Showcase Your Work"
        });
        if (!existingNotif) {
          await Notification.create({
            userId,
            title: "⚠️ Showcase Your Work",
            message: "Your profile has been active for over 24 hours without a portfolio. Add case studies or past work to showcase your expertise and stand out to potential partners.",
            isRead: false
          });
          console.log(`[DATABASE] Stored portfolio warning for user ${userId}`);
          
          // Send push notification
          sendPushNotification(userId, "⚠️ Showcase Your Work", "Your profile has been active for over 24 hours without a portfolio. Add case studies to stand out.", "/profile");
        }
      } catch (dbErr) {
        console.error("[DATABASE] Error saving portfolio warning:", dbErr);
      }

      const warningPayload = {
        _id: "dynamic_missing_portfolio",
        userId,
        title: "⚠️ Showcase Your Work",
        message: "Your profile has been active for over 24 hours without a portfolio. Add case studies or past work to showcase your expertise and stand out to potential partners.",
        isRead: false,
        createdAt: user.createdAt,
        type: "missing_portfolio",
        ctaLink: "/profile"
      };

      if (targetSocketId) {
        currentIo.to(targetSocketId).emit("notification", warningPayload);
      } else {
        const sockets = userSockets.get(userId);
        if (sockets) {
          sockets.forEach((sid) => {
            currentIo.to(sid).emit("notification", warningPayload);
          });
        }
      }
      console.log(`[SOCKET] Dispatched warning notification to user ${userId}`);
    } else {
      // 🗑️ Remove from MongoDB
      try {
        await Notification.deleteMany({
          userId,
          title: "⚠️ Showcase Your Work"
        });
        console.log(`[DATABASE] Removed portfolio warning for user ${userId}`);
      } catch (dbErr) {
        console.error("[DATABASE] Error removing portfolio warning:", dbErr);
      }

      // If warning is not active anymore, emit clear/dismiss event
      if (targetSocketId) {
        currentIo.to(targetSocketId).emit("clear_notification", "dynamic_missing_portfolio");
      } else {
        const sockets = userSockets.get(userId);
        if (sockets) {
          sockets.forEach((sid) => {
            currentIo.to(sid).emit("clear_notification", "dynamic_missing_portfolio");
          });
        }
      }
      console.log(`[SOCKET] Dispatched clear notification to user ${userId}`);
    }
  } catch (error) {
    console.error("[SOCKET] Error in checkAndEmitPortfolioWarning:", error);
  }
};

/**
 * Emits a real-time 'deal_updated' event to specific users
 */
export const emitDealUpdated = (userIds) => {
  if (!socketIoInstance) return;
  
  userIds.forEach(userId => {
    const sockets = userSockets.get(userId.toString());
    if (sockets) {
      sockets.forEach(sid => {
        socketIoInstance.to(sid).emit("deal_updated");
      });
    }
  });
};
