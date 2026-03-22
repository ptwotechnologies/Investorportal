import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase.js";

// send OTP
export const sendOtp = async (phone) => {

  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible"
    });
  }

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phone,
    window.recaptchaVerifier
  );

  window.confirmationResult = confirmationResult;
};


// verify OTP
export const verifyOtp = async (otp) => {

  const result = await window.confirmationResult.confirm(otp);

  return result.user;
};