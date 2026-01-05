import express from "express";
import { deletePortfolioItem, getProfile,  updateProfile, uploadCoverImage, uploadCoverImageMulter, uploadProfileImage, uploadProfilePhoto} from "../controller/Profile.controller.js";
import { authenticateUser } from "../controller/auth.middleware.js";
import { uploadPortfolio, upload } from "../controller/Profile.controller.js";
import { getSettings, updateSettings } from "../controller/settings.controller.js";
import { getNotifications, markAsRead } from "../controller/notification.controller.js";


const router = express.Router();


router.get("/", authenticateUser, getProfile)
router.put("/", authenticateUser, updateProfile);
router.post("/portfolio",  authenticateUser, upload.single("file"), uploadPortfolio);
router.post("/upload/profile-photo", authenticateUser,uploadProfileImage.single("image"),uploadProfilePhoto);
router.post("/upload/cover-image",authenticateUser,uploadCoverImageMulter.single("image"), uploadCoverImage);
router.delete("/portfolio/:id", authenticateUser, deletePortfolioItem);
router.get("/settings", authenticateUser, getSettings);
router.put("/settings", authenticateUser, updateSettings);
router.get("/notifications", authenticateUser, getNotifications);
router.post("/read",authenticateUser, markAsRead);




export default router;
