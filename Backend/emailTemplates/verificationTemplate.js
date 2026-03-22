const verificationTemplate = (userId, otp) => {
  // Use local frontend URL in development or production URL accordingly
  // const frontendUrl = "https://investorportal-sigma.vercel.app";
  const frontendUrl = "http://localhost:5173"; // Default Vite port

  const verificationLink = `${frontendUrl}/verify-email-link?userId=${userId}&otp=${otp}`;

  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <h2 style="color: #333; text-align: center;">Email Verification</h2>
      <p>Hello,</p>
      <p>Thank you for registering with Artestor Investor Portal. Please click the button below to verify your email address:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="background-color: #001032; color: #white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold; display: inline-block;">
          Verify Email
        </a>
      </div>

      <p>Alternatively, you can use the One-Time Password (OTP) below on the verification page:</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #001032;">
          ${otp}
        </span>
      </div>
      
      <p>This OTP and link are valid for 10 minutes. If you did not request this, please ignore this email.</p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #888;">
        This is an automated message from Artestor Investor Portal.
      </p>
    </div>
  `;
};

export default verificationTemplate;
