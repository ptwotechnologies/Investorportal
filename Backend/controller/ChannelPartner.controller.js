import ChannelPartner from "../Models/ChannelPartner.model.js";

export const submitChannelPartner = async (req, res) => {
  try {
    const { firstName, lastName, email, companyName, website, alreadyRegistered } = req.body;

    if (!firstName || !lastName || !email || !companyName) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newChannelPartner = new ChannelPartner({
      firstName,
      lastName,
      email,
      companyName,
      website,
      alreadyRegistered,
    });

    await newChannelPartner.save();

    res.status(201).json({ message: "Channel Partner application submitted successfully." });
  } catch (error) {
    console.error("Error in submitChannelPartner:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
