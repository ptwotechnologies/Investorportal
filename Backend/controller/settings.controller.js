import User from "../Models/User.model.js";
import Profile from "../Models/profile.model.js";
import bcrypt from "bcrypt";
import resend from "../lib/resend.js";
import profileUpdateTemplate from "../emailTemplates/profileUpdateTemplate.js";

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

    // Fetch current data for comparison
    const currentUser = await User.findById(userId);
    const currentProfile = await Profile.findOne({ userId });

    if (!currentUser || !currentProfile) {
      return res.status(404).json({ message: "User or Profile not found" });
    }

    const changes = [];

    /* ---------- PROFILE UPDATE ---------- */
    const profileUpdates = {};

    if (name !== undefined && name !== currentProfile.name) {
      changes.push({ field: "Name", old: currentProfile.name || "—", new: name });
      profileUpdates.name = name;
    }
    if (bio !== undefined && bio !== currentProfile.bio) {
      changes.push({ field: "Bio", old: currentProfile.bio || "—", new: bio });
      profileUpdates.bio = bio;
    }
    if (address !== undefined && address !== currentProfile.address) {
      changes.push({ field: "Address", old: currentProfile.address || "—", new: address });
      profileUpdates.address = address;
    }
    if (about !== undefined && about !== currentProfile.about) {
      changes.push({ field: "About", old: currentProfile.about || "—", new: about });
      profileUpdates.about = about;
    }

    if (Object.keys(profileUpdates).length > 0) {
      await Profile.findOneAndUpdate(
        { userId },
        { $set: profileUpdates }
      );
    }

    /* ---------- USER UPDATE ---------- */
    const userUpdates = {};

    // Restrict Email Update
    if (email !== undefined && email !== currentUser.email) {
      // We explicitly skip updating the email in the database as per requirements.
      // Optionally, we could notify the user that email cannot be changed here.
      console.log(`Blocked attempt to change email from ${currentUser.email} to ${email}`);
    }

    // Restrict Phone Update
    if (phone !== undefined && phone !== currentUser.businessDetails?.number) {
      console.log(`Blocked attempt to change phone from ${currentUser.businessDetails?.number} to ${phone}`);
    }

    if (password) {
      changes.push({ field: "Password", old: "********", new: "******** (Updated)" });
      const salt = await bcrypt.genSalt(10);
      userUpdates.password = await bcrypt.hash(password, salt);
    }

    if (Object.keys(userUpdates).length > 0) {
      await User.findByIdAndUpdate(
        userId,
        { $set: userUpdates }
      );
    }

    // Send Email Notification if changes occurred
    if (changes.length > 0) {
      await resend.emails.send({
        from: "Artestor@resend.dev",
        to: [currentUser.email],
        subject: "Your Profile Has Been Updated",
        html: profileUpdateTemplate(changes)
      });
    }

    res.status(200).json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Settings update failed" });
  }
};
