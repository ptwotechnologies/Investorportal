import express from "express";
import { createUser, getPaymentStatus, login,  updateAdditionalDetails, updatePayment, updatePlan, forgetPassword } from "../controller/User.controller.js";

const router = express.Router();


router.post("/signup", createUser)
router.put("/additional-details", updateAdditionalDetails);
router.put("/plan", updatePlan);
router.put("/payment", updatePayment);
router.post("/login", login);
router.post("/payment-status", getPaymentStatus);
router.post("/forgetpassword", forgetPassword);


export default router;
