import express from "express";
import { submitContactUs } from "../controller/ContactUs.controller.js";

const router = express.Router();

router.post("/submit", submitContactUs);

export default router;
