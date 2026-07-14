import cron from "node-cron";
import Profile from "../Models/profile.model.js";
import Template from "../Models/Template.model.js";
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
          // Fetch template dynamically
          let templateName = "";
          if (role === "startup") templateName = "PROFILE_COMPLETION_STARTUP";
          else if (role === "investor") templateName = "PROFILE_COMPLETION_INVESTOR";
          else templateName = "PROFILE_COMPLETION_PROFESSIONAL";

          const template = await Template.findOne({ name: templateName, isActive: true });
          
          if (template) {
            sendPushNotification(profile.userId._id, template.title, template.message, template.actionLink);
          } else {
            // Fallback to hardcoded if template doesn't exist or is inactive (which also acts as pause)
            // Actually, if it doesn't exist, we skip or fallback. Let's fallback if no template found, 
            // but if we want pause/resume we must rely on template.isActive.
            // If the admin hasn't set it up yet, let's keep the fallback for safety.
            const fallbackTemplate = await Template.findOne({ name: templateName });
            if (!fallbackTemplate) {
              // Create it automatically for the first time so Admin can see it in UI
              let defaultMsg = "";
              if (role === "startup") defaultMsg = "Your startup profile is incomplete. Complete your profile to improve discoverability and trust.";
              else if (role === "investor") defaultMsg = "Complete your investor profile to unlock stronger startup matching.";
              else defaultMsg = "Professionals with complete profiles receive significantly more startup engagement.";
              
              await Template.create({
                name: templateName,
                targetRole: role,
                title: "⚠️ Complete Your Profile",
                message: defaultMsg,
                actionLink: "/profile",
                isActive: true
              });
              
              // Send it since it was just created
              sendPushNotification(profile.userId._id, "⚠️ Complete Your Profile", defaultMsg, "/profile");
            }
          }
        }
      }
    } catch (error) {
      console.error("[CRON] Error checking profile completions:", error);
    }
  });
};
