import express from "express";
import { createDispute, getMyDisputes, addDisputeMessage, markDisputeAsRead } from "../controller/dispute.controller.js";
import { authenticateUser } from "../controller/auth.middleware.js";
import { upload } from "../controller/Profile.controller.js";

const router = express.Router();

router.post("/create", authenticateUser, createDispute);
router.get("/my-disputes", authenticateUser, getMyDisputes);
router.post("/message/:id", authenticateUser, addDisputeMessage);
router.put("/mark-read/:id", authenticateUser, markDisputeAsRead);
router.post("/upload-evidence", authenticateUser, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Upload failed" });
  res.json({ url: req.file.location });
});

export default router;
