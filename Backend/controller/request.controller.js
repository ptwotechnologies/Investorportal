import Request from "../Models/request.model.js";

// CREATE REQUEST
export const createRequest = async (req, res) => { 
  try {
    const { service, description } = req.body;

    if (!service || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = await Request.create({
      service,
      description,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL REQUESTS
export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
