import express from "express";
import { getProfile,  updateProfile, uploadCoverImage, uploadCoverImageMulter, uploadProfileImage, uploadProfilePhoto} from "../controller/Profile.controller.js";
import { authenticateUser } from "../controller/auth.middleware.js";
import { uploadPortfolio, upload } from "../controller/Profile.controller.js";


const router = express.Router();


router.get("/", authenticateUser, getProfile)
router.put("/", authenticateUser, updateProfile);
router.post("/portfolio",  authenticateUser, upload.single("file"), uploadPortfolio);
router.post("/upload/profile-photo", authenticateUser,uploadProfileImage.single("image"),uploadProfilePhoto);
router.post("/upload/cover-image",authenticateUser,uploadCoverImageMulter.single("image"), uploadCoverImage);




export default router;
