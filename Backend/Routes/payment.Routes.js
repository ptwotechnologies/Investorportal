import express from "express";
import { checkout, paymentVerification } from "../controller/payment.Controller.js";
import { createDealOrder, verifyDealPayment } from "../controller/dealPayment.Controller.js";
import { authenticateUser } from "../controller/auth.middleware.js";

const router = express.Router();

router.post("/checkout",  checkout);
router.post("/paymentverification",  paymentVerification);

// Project Milestone Payments
router.post("/create-order", authenticateUser, createDealOrder);
router.post("/verify-payment", authenticateUser, verifyDealPayment);

export default router;
