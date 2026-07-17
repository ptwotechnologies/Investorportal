import resend, { RESEND_FROM } from "./resend.js";
import User from "../Models/User.model.js";

/**
 * Sends a transactional email notification to a user.
 * @param {string} userId - The ID of the user receiving the notification.
 * @param {string} subject - The subject line of the email.
 * @param {string} message - The main body content of the email.
 * @param {string} actionLink - Optional. The relative path (e.g., "/deal/activedeals") for the call-to-action button.
 */
export const sendEmailNotification = async (userId, subject, message, actionLink = "") => {
  try {
    const user = await User.findById(userId);
    if (!user || !user.email) {
      console.error(`[EmailNotifier] User not found or missing email for ID: ${userId}`);
      return;
    }

    const frontendUrl = process.env.FRONTEND_URL || "https://investorportal-sigma.vercel.app";
    const fullActionUrl = actionLink ? `${frontendUrl}${actionLink}` : frontendUrl;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px;">
        <h2 style="color: #001032;">${subject}</h2>
        <p style="font-size: 16px; line-height: 1.5;">Hi ${user.name || 'there'},</p>
        <p style="font-size: 16px; line-height: 1.5;">${message}</p>
        ${actionLink ? `
        <div style="margin-top: 30px; margin-bottom: 30px; text-align: center;">
          <a href="${fullActionUrl}" style="background-color: #59549F; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
            View Details
          </a>
        </div>
        ` : ''}
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="font-size: 12px; color: #888; text-align: center;">
          This is an automated notification from Copteno Investor Portal. 
          <br/>Please do not reply to this email.
        </p>
      </div>
    `;

    console.log(`[EmailNotifier] Sending email to ${user.email} - Subject: ${subject}`);
    
    const emailResponse = await resend.emails.send({
      from: RESEND_FROM,
      to: user.email,
      subject: subject,
      html: htmlContent
    });

    if (emailResponse.error) {
      console.error("[EmailNotifier] Resend API Error:", emailResponse.error);
    } else {
      console.log("[EmailNotifier] Email sent successfully:", emailResponse.data?.id);
    }
  } catch (error) {
    console.error("[EmailNotifier] Failed to send email:", error.message);
  }
};
