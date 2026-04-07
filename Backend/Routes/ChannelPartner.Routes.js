import express from "express";
import { submitChannelPartner } from "../controller/ChannelPartner.controller.js";

const router = express.Router();

router.post("/submit", submitChannelPartner);

export default router;
