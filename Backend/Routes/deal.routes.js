import express from "express";
import { 
    createDealDraft, 
    getMyDeals, 
    getDealById, 
    updateDeal 
} from "../controller/deal.controller.js";
import { authenticateUser } from "../controller/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser); // Protect all deal routes

router.post("/create-draft", createDealDraft);
router.get("/my-deals", getMyDeals);
router.get("/:id", getDealById);
router.put("/:id", updateDeal);

export default router;
