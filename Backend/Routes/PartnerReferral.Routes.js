import express from "express";
import { submitReferral } from "../controller/PartnerReferral.controller.js";

const router = express.Router();

router.post("/submit", submitReferral);

export default router;
