import cron from "node-cron";
import Profile from "../Models/profile.model.js";
import { sendPushNotification } from "./onesignal.js";

// Initialize all background workers
export const startCronJobs = () => {
  // Run every day at 12:00 PM to remind users to complete their profile (Mirroring the Notification Box alert)
  cron.schedule("0 12 * * *", async () => {
    console.log("[CRON] Running daily profile completion check...");
    try {
      const profiles = await Profile.find().populate("userId", "paymentStatus");
      
      for (const profile of profiles) {
        if (!profile.userId || profile.userId.paymentStatus !== "approved") continue;

        const role = profile.role;
        if (!["startup", "service_professional", "investor"].includes(role)) continue;

        const fields = [
          profile.bio,
          profile.state,
          profile.city,
          profile.about,
          profile.topSkills?.length > 0,
          profile.profilePhoto,
          profile.coverImage,
          profile.experience?.length > 0,
          profile.portfolio?.length > 0,
          profile.socialMedia?.linkedin,
        ];
        const filledFields = fields.filter((f) => !!f).length;
        const profileCompletion = (filledFields / fields.length) * 100;

        const threshold = role === "investor" ? 60 : 50;

        if (profileCompletion < threshold) {
          let message = "";
          if (role === "startup") message = "Your startup profile is incomplete. Complete your profile to improve discoverability and trust.";
          else if (role === "investor") message = "Complete your investor profile to unlock stronger startup matching.";
          else message = "Professionals with complete profiles receive significantly more startup engagement.";

          // Send push notification reminder
          sendPushNotification(profile.userId._id, "⚠️ Complete Your Profile", message, "/profile");
        }
      }
    } catch (error) {
      console.error("[CRON] Error checking profile completions:", error);
    }
  });
};
