import express from "express";
import { createUser, getPaymentStatus, login,  updateAdditionalDetails, updatePayment, updatePlan, forgetPassword, verifyOtp, resetPassword, verifyEmail, resendVerificationOtp, uploadPortalFile, checkVerificationStatus } from "../controller/User.controller.js";
import { portalUpload } from "../middleware/userUpload.middleware.js";

const router = express.Router();


router.post("/signup", createUser)
router.put("/additional-details", updateAdditionalDetails);
router.put("/plan", updatePlan);
router.put("/payment", updatePayment);
router.post("/login", login);
router.post("/payment-status", getPaymentStatus);
router.post("/forgetPassword", forgetPassword);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);
router.post("/verify-email", verifyEmail);
router.post("/check-verification", checkVerificationStatus);
router.post("/resend-otp", resendVerificationOtp);
router.post("/portal-upload", portalUpload.single("file"), uploadPortalFile);


export default router;
