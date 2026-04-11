import PartnerReferral from "../Models/PartnerReferral.model.js";

export const submitReferral = async (req, res) => {
  try {
    const { referrerEmail, role, firstName, lastName, email, companyName, website, linkedin, alreadyRegistered } = req.body;

    if (!referrerEmail || !role || !firstName || !lastName || !email || !companyName) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newReferral = new PartnerReferral({
      referrerEmail,
      role,
      firstName,
      lastName,
      email,
      companyName,
      website,
      linkedin,
      alreadyRegistered,
    });

    await newReferral.save();

    res.status(201).json({ message: "Referral submitted successfully." });
  } catch (error) {
    console.error("Error in submitReferral:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
