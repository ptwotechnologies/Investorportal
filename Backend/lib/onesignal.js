import axios from 'axios';

const ONESIGNAL_APP_ID = "e9e59ecd-bb4b-4387-863e-863b6b8158ef";
const ONESIGNAL_REST_API_KEY = "os_v2_app_5hsz5tn3jnbypbr6qy5wxaky56long7tfghel55vp462wgim2jzzaafwby5mka2oxmm62yjiggsuffezzpijlvngulzhld4rxr7vxkq";

/**
 * Sends a push notification to specific users via OneSignal
 * @param {Array|String} userIds - A single user ID or array of user IDs
 * @param {String} title - The title of the notification
 * @param {String} message - The body text of the notification
 * @param {String} url - The URL to open when the notification is clicked (optional)
 */
export const sendPushNotification = async (userIds, title, message, url = "/") => {
  try {
    const targetIds = Array.isArray(userIds) ? userIds : [userIds];
    const stringIds = targetIds.map(id => String(id));

    if (stringIds.length === 0) return;

    const response = await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: ONESIGNAL_APP_ID,
        include_aliases: {
          external_id: stringIds
        },
        target_channel: "push",
        headings: { en: title },
        contents: { en: message },
        url: url
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
