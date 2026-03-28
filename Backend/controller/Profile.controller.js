import Profile from "../Models/profile.model.js";
import resend, { RESEND_FROM } from "../lib/resend.js";
import profileUpdateTemplate from "../emailTemplates/profileUpdateTemplate.js";
// -------------------- CLOUD MULTER SETUP --------------------

import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, 
  accessKeyId: process.env.R2_ACCESS_KEY,
  secretAccessKey: process.env.R2_SECRET_KEY,
  signatureVersion: "v4",
  region: "auto", 
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "user-images",

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

// GET Profile of logged-in user
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user._id }).populate(
      "userId",
      "role email businessDetails.firstName businessDetails.lastName businessDetails.number businessDetails.companyName",
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

    res.status(200).json({
      ...profile.toObject(),
      name:
        profile.name ||
        `${profile.userId.businessDetails.firstName} ${profile.userId.businessDetails.lastName}`,
      role: profile.userId?.role,
      email: profile.userId?.email,
      phone: profile.userId?.businessDetails?.number,
      companyName: profile.userId?.businessDetails?.companyName,
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
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const title = req.body.title || "Portfolio File";

    const fileUrl = req.file.location; // 🔥 CHANGE
    const thumbnailUrl = fileUrl;

    profile.portfolio.push({ title, fileUrl, thumbnailUrl });
    await profile.save();

    res.status(200).json({
      message: "Portfolio uploaded successfully",
      portfolio: profile.portfolio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE portfolio item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findOne({ userId: req.user._id });

    const item = profile.portfolio.id(id);
    if (!item) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    // 🔹 Safe key extraction
    const url = new URL(item.fileUrl);
    const key = url.pathname.substring(1);

    await s3
      .deleteObject({
        Bucket: "user-images",
        Key: key,
      })
      .promise();

    profile.portfolio.pull(id);
    await profile.save();

    res.status(200).json({
      message: "Deleted successfully",
      portfolio: profile.portfolio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};





export const uploadProfilePhoto = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.profilePhoto = req.file.location; // 🔥 CHANGE
    await profile.save();

    res.json({ profilePhoto: profile.profilePhoto });
  } catch (err) {
    res.status(500).json({ message: "Error uploading profile photo" });
  }
};



export const uploadCoverImage = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.coverImage = req.file.location; // 🔥 CHANGE
    await profile.save();

    res.json({ coverImage: profile.coverImage });
  } catch (err) {
    res.status(500).json({ message: "Error uploading cover image" });
  }
};



export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find({
      userId: { $ne: req.user._id },
    }).populate(
      "userId",
      "businessDetails.firstName businessDetails.lastName role additionalDetails.domain"
    );

   
    res.json(profiles); // phir bhejo response
  } catch (error) {
    console.error("Error in getAllProfiles:", error);
    res.status(500).json({ error: "Server error" });
  }
};


