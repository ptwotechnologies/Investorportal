import express from "express";
import { authenticateUser } from "../controller/auth.middleware.js";
import {
  getOrCreateActiveTicket,
  getMyTickets,
  getTicketById,
  sendMessage,
  closeTicket,
} from "../controller/help.controller.js";

const router = express.Router();

router.get("/active", authenticateUser, getOrCreateActiveTicket); // ✅ GET not POST
router.get("/", authenticateUser, getMyTickets);
router.get("/:id", authenticateUser, getTicketById);
router.post("/:id/messages", authenticateUser, sendMessage);
router.put("/:id/close", authenticateUser, closeTicket);

export default router;