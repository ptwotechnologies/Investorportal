import Ticket from "../Models/help.model.js";

export const getOrCreateActiveTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findOne({
      raisedBy: req.user._id,
      status: "open",
    }).sort({ createdAt: -1 });

    if (!ticket) {
      ticket = await Ticket.create({
        raisedBy: req.user._id,
        status: "open",
        messages: [],
      });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("getOrCreateActiveTicket error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { raisedBy: req.user._id };
    if (status && ["open", "closed"].includes(status)) {
      filter.status = status;
    }
    const tickets = await Ticket.find(filter).sort({ updatedAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      raisedBy: req.user._id,
    });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: "Message text is required" });

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      raisedBy: req.user._id,
    });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    if (ticket.status === "closed") return res.status(400).json({ message: "Cannot send message to a closed ticket" });

    ticket.messages.push({ senderRole: "user", text: text.trim() });
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const closeTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      raisedBy: req.user._id,
    });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    ticket.status = "closed";
    await ticket.save();
    res.status(200).json({ message: "Ticket closed", ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};