import Profile from "../Models/profile.model.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// GET Profile of logged-in user
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user._id })
      .populate("userId", "role  businessDetails.businessEmail businessDetails.number");

    if (!profile) {
      profile = await Profile.create({
        userId: req.user._id,
        name:  "",
        bio: "",
        state: "",
        city:"",
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
     role: profile.userId?.role,
      email: profile.userId?.businessDetails?.businessEmail,
      phone: profile.userId?.businessDetails?.number,
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
    let profile = await Profile.findOne({ userId: req.user._id }).populate("userId", "role  businessDetails.businessEmail businessDetails.number");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update profile fields
    Object.assign(profile, updatedData);
    await profile.save();

    // Send response in same format as getProfile
    res.status(200).json({
      ...profile.toObject(),
      role: profile.userId?.role,
      email: profile.userId?.businessDetails?.businessEmail,
      phone: profile.userId?.businessDetails?.number,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// -------------------- MULTER SETUP --------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/portfolio"); // uploads folder ke andar portfolio
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });


// -------------------- CONTROLLER --------------------
export const uploadPortfolio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user?._id; // safe check
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const profile = await Profile.findOne({ userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const title = req.body.title || "Portfolio File";
    const fileUrl = req.file.path;
    const thumbnailUrl = "/path/to/default-thumbnail.jpg";

    profile.portfolio.push({ title, fileUrl, thumbnailUrl });
    await profile.save();

    res.status(200).json({ message: "Portfolio uploaded successfully", portfolio: profile.portfolio });
  } catch (error) {
    console.error("UploadPortfolio Error:", error); // add this to see exact cause
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE portfolio item
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const item = profile.portfolio.id(id);
    if (!item) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    // 🧹 Delete file from disk
    if (item.fileUrl) {
      const filePath = path.resolve(item.fileUrl.replace(/^\/+/, ""));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // 🗑 Remove from DB
    profile.portfolio.pull(id);
    await profile.save();

    res.status(200).json({
      message: "Portfolio item deleted successfully",
      portfolio: profile.portfolio,
    });
  } catch (error) {
    console.error("Delete Portfolio Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};




const profileImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

export const uploadProfileImage = multer({ storage: profileImageStorage });



const coverImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cover"); // alag folder
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

export const uploadCoverImageMulter = multer({ storage: coverImageStorage });


export const uploadProfilePhoto = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.profilePhoto = `/uploads/profile/${req.file.filename}`;
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

    profile.coverImage = `/uploads/cover/${req.file.filename}`;
    await profile.save();

    res.json({ coverImage: profile.coverImage });
  } catch (err) {
    res.status(500).json({ message: "Error uploading cover image" });
  }
};




