import axios from 'axios';

export const sendPushNotification = async (userIds, title, message, url = "/") => {
  try {
    const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
    const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

    if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
      console.warn("[ONESIGNAL] Missing API keys in environment variables");
      return;
    }

    const targetIds = Array.isArray(userIds) ? userIds : [userIds];
    const stringIds = targetIds.map(id => String(id));

    if (stringIds.length === 0) return;

    const absoluteUrl = url.startsWith("http") ? url : `https://copteno.com${url.startsWith("/") ? url : "/" + url}`;

    const response = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: ONESIGNAL_APP_ID,
        include_aliases: {
          external_id: stringIds
        },
        include_external_user_ids: stringIds, // Fallback for older OneSignal app configurations
        target_channel: "push",
        headings: { en: title },
        contents: { en: message },
        url: absoluteUrl
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`
        }
      }
    );
    console.log("[ONESIGNAL] Push sent successfully:", response.data);
  } catch (error) {
    console.error("[ONESIGNAL] Error sending push:", error?.response?.data || error.message);
  }
};
