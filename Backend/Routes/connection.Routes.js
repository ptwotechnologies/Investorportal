import express from "express";
import { sendConnectionRequest, getMyConnections, updateConnectionStatus } from "../controller/connection.controller.js";
import { authenticateUser } from "../controller/auth.middleware.js";

const router = express.Router();

router.post("/send", authenticateUser, sendConnectionRequest);
router.get("/my", authenticateUser, getMyConnections);
router.post("/update", authenticateUser, updateConnectionStatus);

export default router;
