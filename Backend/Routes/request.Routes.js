import express from "express";
import {acceptProvider, createRequest, forwardRequest, getAllRequests, getReceivedRequests, markInterested, markRequestAsSeen,} from "../controller/request.controller.js";
import { authenticateUser } from "../controller/auth.middleware.js";

const router = express.Router();

router.post("/",authenticateUser, createRequest);
router.get("/",authenticateUser, getAllRequests);
router.put("/forward", authenticateUser, forwardRequest);
router.get("/received", authenticateUser, getReceivedRequests);
router.put("/interested/:requestId", authenticateUser, markInterested);
router.put("/accept", authenticateUser, acceptProvider);
router.put("/mark-seen/:requestId", authenticateUser, markRequestAsSeen);


export default router;
