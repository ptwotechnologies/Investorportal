const verificationTemplate = (userId, token) => {
  // Use local frontend URL in development or production URL accordingly
  const frontendUrl = "https://investorportal-sigma.vercel.app";
  // const frontendUrl = "http://localhost:5173"; // Default Vite port

  const verificationLink = `${frontendUrl}/verify-email-link?userId=${userId}&token=${token}`;

  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; border: 1px solid #e1e4e8; padding: 40px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 30px;">
         <h1 style="color: #001032; margin: 0; font-size: 24px; font-weight: 700;">Account Verification</h1>
      </div>
      
      <p style="font-size: 16px; color: #3c4149; line-height: 1.6;">Hello,</p>
      
      <p style="font-size: 16px; color: #3c4149; line-height: 1.6;">
        Welcome to <strong>Copteno Investor Portal</strong>! We're excited to have you on board. To complete your registration and secure your account, please click the button below:
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${verificationLink}" style="background-color: #001032; color: #ffffff; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; transition: background-color 0.3s ease;">
          Verify My Email Address
        </a>
      </div>

      <p style="color: #8b949e; font-size: 14px; line-height: 1.5; text-align: center; margin-top: 40px;">
        This secure link is valid for 10 minutes. <br/>
        If you didn't create an account with us, you can safely ignore this email.
      </p>
      
      <div style="border-top: 1px solid #e1e4e8; margin-top: 40px; padding-top: 20px; text-align: center;">
        <p style="font-size: 12px; color: #8b949e; margin: 0;">
          &copy; 2026 Copteno Technologies Pvt. Ltd. All rights reserved.
        </p>
      </div>
    </div>
  `;
};

export default verificationTemplate;
