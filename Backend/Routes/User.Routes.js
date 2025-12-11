import express from "express";
import { createUser, getPaymentStatus, login,  updateAdditionalDetails, updatePayment, updatePlan } from "../controller/User.controller.js";

const router = express.Router();


router.post("/signup", createUser)
router.put("/additional-details", updateAdditionalDetails);
router.put("/plan", updatePlan);
router.put("/payment", updatePayment);
router.post("/login", login);
router.post("/payment-status", getPaymentStatus);


export default router;
