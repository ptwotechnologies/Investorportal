import express from "express";
import {createRequest, getAllRequests,} from "../controller/request.controller.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", getAllRequests);

export default router;
