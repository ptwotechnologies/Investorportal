import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.js";

// send OTP
export const sendOtp = async (phone) => {
  try {
    // Reset any existing verifier to ensure a fresh state
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        // ignore errors on clear
      }
      window.recaptchaVerifier = null;
    }

    // Initialize standard RecaptchaVerifier
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible"
    });

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error in sendOtp:", error);
    console.warn("Please ensure this domain is authorized in Firebase Console:", window.location.hostname);
    // Reset verifier on error to allow retry
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      } catch (e) {
        window.recaptchaVerifier = null;
      }
    }
    throw error;
  }
};


// verify OTP
export const verifyOtp = async (otp) => {
  const result = await window.confirmationResult.confirm(otp);

  return result.user;
};