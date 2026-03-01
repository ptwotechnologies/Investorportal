import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { TfiList } from "react-icons/tfi";
import RightHelp from "./RightHelp";
import axios from "axios";
import { serverUrl } from "@/App";

const HelpSec = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // ─── On load: fetch tickets + auto-load active ticket on right ──────────
  useEffect(() => {
    fetchTickets();
    loadActiveTicket();
  }, []);

  // ─── Refetch list when filter changes ───────────────────────────────────
  useEffect(() => {
    fetchTickets();
  }, [activeFilter]);

  // ─── Poll active chat every 5s for new admin replies ────────────────────
  useEffect(() => {
    if (!selectedChat) return;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${serverUrl}/help/${selectedChat._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelectedChat(res.data);
        setTickets((prev) => prev.map((t) => (t._id === res.data._id ? res.data : t)));
      } catch (err) {}
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedChat?._id]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const query = activeFilter !== "all" ? `?status=${activeFilter}` : "";
      const res = await axios.get(`${serverUrl}/help${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Auto load active (open) ticket on page open ────────────────────────
  const loadActiveTicket = async () => {
    try {
      const res = await axios.get(`${serverUrl}/help/active`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedChat(res.data);
    } catch (err) {
      console.error("Error loading active ticket:", err);
    }
  };

  const handleTicketClick = async (ticket) => {
    try {
      const res = await axios.get(`${serverUrl}/help/${ticket._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedChat(res.data);
      setShowChat(true);
    } catch (err) {
      console.error("Error fetching ticket:", err);
    }
  };

  const handleNewMessage = (updatedTicket) => {
    setSelectedChat(updatedTicket);
    setTickets((prev) =>
      prev.map((t) => (t._id === updatedTicket._id ? updatedTicket : t))
    );
  };

  const handleTicketClosed = (closedTicket) => {
    setSelectedChat(closedTicket);
    setTickets((prev) =>
      prev.map((t) => (t._id === closedTicket._id ? closedTicket : t))
    );
    // After closing, auto-create a new blank ticket for next message
    loadActiveTicket();
  };

  const openCount = tickets.filter((t) => t.status === "open").length;

  const filteredTickets = tickets.filter((t) => {
    const lastMsg = t.messages?.[t.messages.length - 1]?.text || "";
    return lastMsg.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="md:flex lg:bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-6">
      <div className="bg-gray-100 h-[85vh] w-full mx-auto pt-4">
        {/* Top bar - exact original */}
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg px-10 mb-4 justify-between items-center">
          <h1 className="text-md font-semibold text-gray-800">
            Welcome, Startup India Pvt. Ltd.
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <FaUser
              className="text-gray-600 border border-gray-600 p-1 rounded-full"
              size={24}
            />
            <span className="font-semibold text-gray-800">Switch to professional</span>
          </button>
        </div>

        <div className="flex gap-4 items-stretch">
          {/* ─── LEFT PANEL - exact original design ─────────────────────── */}
          <div
            className={`relative flex flex-col bg-white border border-gray-400 p-4 rounded-md shadow-md w-full md:w-[44%] h-screen lg:h-[88vh] gap-2 ${
              showChat ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Search - exact original */}
            <div className="flex items-center justify-between gap-2 border-2 border-[#D9D9D9] lg:p-2 p-1 px-2 rounded-lg">
              <input
                type="text"
                className="w-full outline-none"
                placeholder="Search requests"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TfiList size={24} className="text-gray-500 bg-white" />
            </div>

            {/* Filter tabs - exact original */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-6 py-1 border border-[#D9D9D9] lg:rounded-lg rounded-sm w-30 text-md lg:text-[16px] ${
                  activeFilter === "all"
                    ? "bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]"
                    : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("open")}
                className={`px-5 py-1 lg:rounded-lg rounded-sm border border-[#D9D9D9] w-30 text-md lg:text-[16px] ${
                  activeFilter === "open"
                    ? "bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]"
                    : ""
                }`}
              >
                Open
                {openCount > 0 && (
                  <span className="bg-[#B42A2C] text-white text-xs rounded-full px-1.5 py-0.5 mx-1">
                    {openCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveFilter("closed")}
                className={`px-5 py-1 lg:rounded-lg rounded-sm border border-[#D9D9D9] w-30 text-md lg:text-[16px] ${
                  activeFilter === "closed"
                    ? "bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]"
                    : ""
                }`}
              >
                Closed
              </button>
            </div>

            {/* Chat list - exact original card design */}
            <div className="flex flex-col gap-2 w-full max-h-140 scrollbar-hide overflow-y-auto">
              {loading ? (
                <div className="text-center text-gray-400 py-8 text-sm">Loading...</div>
              ) : filteredTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <p className="text-gray-500 font-medium">No chats found</p>
                  <p className="text-gray-400 text-xs mt-1">Send a message to start a chat</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    onClick={() => handleTicketClick(ticket)}
                    className={`flex items-center gap-3 rounded-lg bg-white transition-all shadow-[inset_0_0_12px_#00000040] cursor-pointer ${
                      selectedChat?._id === ticket._id ? " " : ""
                    }`}
                  >
                    <div className="w-16 h-16 my-2 ml-3 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
                    <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                    <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full px-2">
                      <div className="my-3">
                        <h1 className="text-[#001032] font-semibold text-sm">
                          Support Chat
                        </h1>
                        <p className="text-[#001032] text-xs line-clamp-2">
                          {ticket.messages?.[ticket.messages.length - 1]?.text || "No messages yet"}
                        </p>
                        <p className="text-[#001032] text-[10px] mt-2">
                          {new Date(ticket.updatedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                          {" • "}
                          {new Date(ticket.updatedAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ─── RIGHT PANEL ────────────────────────────────────────────── */}
          <div className={`lg:w-[56%] h-[88vh] ${showChat ? "flex" : "hidden lg:flex"}`}>
            {selectedChat ? (
              <RightHelp
                ticket={selectedChat}
                onBack={() => setShowChat(false)}
                onNewMessage={handleNewMessage}
                onTicketClosed={handleTicketClosed}
              />
            ) : (
              <div className="hidden lg:flex items-center justify-center w-full text-gray-400">
                Loading chat...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSec;