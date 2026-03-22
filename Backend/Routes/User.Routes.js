import express from "express";
import { createUser, getPaymentStatus, login,  updateAdditionalDetails, updatePayment, updatePlan, forgetPassword, verifyOtp, resetPassword, verifyEmail, resendVerificationOtp } from "../controller/User.controller.js";

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
router.post("/resend-otp", resendVerificationOtp);


export default router;
