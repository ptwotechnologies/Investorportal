import ContactUs from "../Models/ContactUs.model.js";

export const submitContactUs = async (req, res) => {
  try {
    const { firstName, lastName, email, company, interest } = req.body;

    if (!firstName || !lastName || !email || !company || !interest) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newContactRequest = new ContactUs({
      firstName,
      lastName,
      email,
      company,
      interest,
    });

    await newContactRequest.save();

    res.status(201).json({ message: "Contact request submitted successfully." });
  } catch (error) {
    console.error("Error in submitContactUs:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
