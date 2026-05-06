import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.js";

// send OTP
export const sendOtp = async (phone) => {
  try {
    // ⭐ Optimization: Only initialize if not already present or if it was cleared
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha resolved");
        }
      });
      // Pre-render to speed up subsequent call
      await window.recaptchaVerifier.render();
    }

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error in sendOtp:", error);
    // Reset on serious errors to allow clean retry
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {}
      window.recaptchaVerifier = null;
    }
    throw error;
  }
};


// verify OTP
export const verifyOtp = async (otp) => {
  const result = await window.confirmationResult.confirm(otp);

  return result.user;
};