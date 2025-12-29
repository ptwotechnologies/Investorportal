import User from "../Models/User.model.js";
import Profile from "../Models/profile.model.js";
import bcrypt from "bcrypt";

export const getSettings = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .select("email businessDetails.number");

    const profile = await Profile.findOne({ userId });

    res.status(200).json({
      name: profile?.name || "",
      bio: profile?.bio || "",
      address: profile?.address || "",
      about: profile?.about || "",
      profilePhoto: profile?.profilePhoto || "",
      coverImage: profile?.coverImage || "",
      email: user?.email || "",
      phone: user?.businessDetails?.number || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};


export const updateSettings = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      name,
      bio,
      address,
      about,
      email,
      phone,
      password,
    } = req.body;

    /* ---------- PROFILE UPDATE ---------- */
    const profileUpdates = {};

    if (name !== undefined) profileUpdates.name = name;
    if (bio !== undefined) profileUpdates.bio = bio;
    if (address !== undefined) profileUpdates.address = address;
    if (about !== undefined) profileUpdates.about = about;

    if (Object.keys(profileUpdates).length > 0) {
      await Profile.findOneAndUpdate(
        { userId },
        { $set: profileUpdates }
      );
    }

    /* ---------- USER UPDATE ---------- */
    const userUpdates = {};

    if (email !== undefined) userUpdates.email = email;
    if (phone !== undefined)
      userUpdates["businessDetails.number"] = phone;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      userUpdates.password = await bcrypt.hash(password, salt);
    }

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(
        userId,
        { $set: userUpdates }
      );
    }

    res.status(200).json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Settings update failed" });
  }
};
