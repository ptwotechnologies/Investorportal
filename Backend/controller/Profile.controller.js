import Profile from "../Models/profile.model.js";
import Request from "../Models/request.model.js";
import resend, { RESEND_FROM } from "../lib/resend.js";
import profileUpdateTemplate from "../emailTemplates/profileUpdateTemplate.js";
// -------------------- CLOUD MULTER SETUP --------------------

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "copteno",

    key: function (req, file, cb) {
      const type = req.body.type || "general";
      cb(null, `${type}/${Date.now()}-${file.originalname}`);
    },
  }),

  limits: { fileSize: 5 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) cb(null, true);
    else cb(new Error("Only images allowed"), false);
  },
});

export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user._id }).populate(
      "userId",
      "role email businessDetails.firstName businessDetails.lastName businessDetails.number businessDetails.companyName plan",
    );

    if (!profile) {
      profile = await Profile.create({
        userId: req.user._id,
        name: "",
        bio: "",
        state: "",
        city: "",
        about: "",
        topSkills: [],
        services: [],
        experience: [],
        portfolio: [],
        socialMedia: {},
      });
    }

    // Calculate Credits for Free Plan users
    const userObj = profile.userId;
    const isFreePlan =
      userObj.plan?.planName === "Explorer Access" ||
      !userObj.plan?.planName ||
      userObj.plan?.amount === 0;

    let credits = null;
    if (isFreePlan) {
      if (userObj.role === "startup") {
        const count = await Request.countDocuments({ raisedBy: req.user._id });
        credits = Math.max(0, 1 - count);
      } else if (userObj.role === "service_professional") {
        const count = await Request.countDocuments({
          forwardedTo: req.user._id,
          $or: [
            { interestedBy: req.user._id },
            { ignoredBy: req.user._id }
          ]
        });
        credits = Math.max(0, 1 - count);
      } else if (userObj.role === "investor") {
        credits = 1; 
      }
    }

    res.status(200).json({
      ...profile.toObject(),
      name:
        profile.name ||
        `${profile.userId.businessDetails.firstName} ${profile.userId.businessDetails.lastName}`,
      role: profile.userId?.role,
      email: profile.userId?.email,
      phone: profile.userId?.businessDetails?.number,
      companyName: profile.userId?.businessDetails?.companyName,
      plan: profile.userId?.plan,
      credits: credits,
      isFreePlan: isFreePlan
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE Profile of logged-in user
export const updateProfile = async (req, res) => {
  const updatedData = req.body;

  try {
    // Find the profile
    let profile = await Profile.findOne({ userId: req.user._id }).populate(
      "userId",
      "role email businessDetails.firstName businessDetails.lastName businessDetails.number businessDetails.companyName",
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const changes = [];
    const fieldsToTrack = ["name", "bio", "state", "city", "about", "topSkills", "services"];

    fieldsToTrack.forEach(field => {
      if (updatedData[field] !== undefined) {
        let oldValue = profile[field];
        let newValue = updatedData[field];

        // Handle arrays or complex types if necessary
        if (Array.isArray(oldValue)) {
            if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                changes.push({ field: field.charAt(0).toUpperCase() + field.slice(1), old: oldValue.join(", ") || "—", new: newValue.join(", ") });
            }
        } else if (oldValue !== newValue) {
            changes.push({ field: field.charAt(0).toUpperCase() + field.slice(1), old: oldValue || "—", new: newValue });
        }
      }
    });

    if (updatedData.experience && Array.isArray(updatedData.experience)) {
      updatedData.experience = updatedData.experience.map((exp) => ({
        ...exp,
        description: Array.isArray(exp.description)
          ? exp.description
          : exp.description
            ? [exp.description]
            : [],
      }));
      // We could add experience change detection here as well if needed
    }

    // Update profile fields
    Object.assign(profile, updatedData);
    await profile.save();

    // Send Email Notification if changes occurred
    if (changes.length > 0 && req.user.email) {
        await resend.emails.send({
          from: RESEND_FROM,
          to: [req.user.email],
          subject: "Your Profile Has Been Updated",
          html: profileUpdateTemplate(changes)
        });
    }

    // Send response in same format as getProfile
    res.status(200).json({
      ...profile.toObject(),
      role: profile.userId?.role,
      email: profile.userId?.email,
      phone: profile.userId?.businessDetails?.number,
      companyName: profile.userId?.businessDetails?.companyName,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



// -------------------- CONTROLLER --------------------
export const uploadPortfolio = async (req, res) => {
  try {
    if (!req.file) {
      console.error("Upload Portfolio Error: No file provided");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploaded Portfolio File Details:", req.file);

    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const title = req.body.title || "Portfolio File";

    const fileUrl = req.file.location;
    const thumbnailUrl = fileUrl;

    profile.portfolio.push({ title, fileUrl, thumbnailUrl });
    await profile.save();

    res.status(200).json({
      message: "Portfolio uploaded successfully",
      portfolio: profile.portfolio,
    });
  } catch (error) {
    console.error("Error in uploadPortfolio:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE portfolio item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Delete Portfolio Item - Request ID:", id);

    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const item = profile.portfolio.id(id);
    if (!item) {
      console.error("Delete Error: Item not found in DB for ID:", id);
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    console.log("Delete Error: Item to delete:", item);

    // 🔹 Delete from R2 if URL is valid
    if (item.fileUrl && item.fileUrl.startsWith("http")) {
      try {
        const url = new URL(item.fileUrl);
        // Remove leading slash if present
        const key = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
        
        console.log("Attempting to delete R2 Key:", key);

        const deleteCommand = new DeleteObjectCommand({
          Bucket: "copteno",
          Key: key,
        });

        await s3.send(deleteCommand);
        console.log("Successfully deleted from R2");
      } catch (s3Err) {
        console.error("R2 Delete Error (skipping to allow DB cleanup):", s3Err.message);
      }
    }

    profile.portfolio.pull(id);
    await profile.save();

    res.status(200).json({
      message: "Portfolio item deleted successfully",
      portfolio: profile.portfolio,
    });
  } catch (error) {
    console.error("Error in deletePortfolioItem:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      console.error("Upload Profile Photo Error: No file provided by multer");
      return res.status(400).json({ message: "No file uploaded. Check field name (should be 'image')." });
    }

    console.log("Uploaded File Details:", req.file);

    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) {
      console.error(`Profile not found for user ${req.user._id}`);
      return res.status(404).json({ message: "Profile not found" });
    }

    profile.profilePhoto = req.file.location;
    await profile.save();

    res.json({ 
      message: "Profile photo uploaded successfully",
      profilePhoto: profile.profilePhoto 
    });
  } catch (err) {
    console.error("Error in uploadProfilePhoto:", err);
    res.status(500).json({ message: "Error uploading profile photo", error: err.message });
  }
};



export const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      console.error("Upload Cover Image Error: No file provided");
      return res.status(400).json({ message: "No file uploaded" });
    }

     console.log("Uploaded Cover File Details:", req.file);

    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.coverImage = req.file.location;
    await profile.save();

    res.json({ 
      message: "Cover image uploaded successfully",
      coverImage: profile.coverImage 
    });
  } catch (err) {
     console.error("Error in uploadCoverImage:", err);
    res.status(500).json({ message: "Error uploading cover image", error: err.message });
  }
};



export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({
      userId: { $ne: req.user._id },
    }).populate(
      "userId",
      "businessDetails.firstName businessDetails.lastName businessDetails.investorType role additionalDetails.domain"
    );

   
    res.json(profiles); // phir bhejo response
  } catch (error) {
    console.error("Error in getAllProfiles:", error);
    res.status(500).json({ error: "Server error" });
  }
};


