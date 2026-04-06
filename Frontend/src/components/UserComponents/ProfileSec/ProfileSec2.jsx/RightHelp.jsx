import React, { useState, useEffect, useRef } from "react";
import { Paperclip, Send } from "lucide-react";
import axios from "axios";
import { serverUrl } from "@/App";
import toast from "react-hot-toast";

const RightHelp = ({ ticket, onBack, onNewMessage, onTicketClosed }) => {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages]);

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    if (ticket.status === "closed") return;

    try {
      setSending(true);
      const res = await axios.post(
        `${serverUrl}/help/${ticket._id}/messages`,
        { text: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onNewMessage(res.data);
      setMessage("");
    } catch (err) {
      console.error("Send message error:", err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // Last admin message for the action bar (if any)
  const lastAdminMsg = ticket?.messages
    ?.filter((m) => m.senderRole === "admin")
    ?.slice(-1)[0];

  return (
    <div className="lg:h-[88vh] flex flex-col gap-3 w-full">
      {/* Chat Container - exact original */}
      <div className="flex flex-col bg-white rounded-md flex-1 border border-gray-400 overflow-hidden">
        {/* Mobile back */}
        <div className="flex items-center gap-2 lg:hidden px-4 pt-3">
          <button onClick={onBack} className="text-sm font-medium text-[#001032]">
            ← Back
          </button>
        </div>

        {/* Header - exact original */}
        <div className="bg-white rounded-t-md px-4 py-2 lg:py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300"></div>
          <div className="flex-1">
            <h2 className="lg:text-lg p-1 lg:p-3 text-md rounded-lg w-50 font-semibold text-gray-800 border border-gray-200">
              Support Team
            </h2>
          </div>
        </div>

        {/* Messages - exact original bubble style */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
            {!ticket?.messages?.length ? (
              <div className="text-center text-gray-400 text-sm py-8">
                Send a message to start the conversation
              </div>
            ) : (
              ticket.messages.map((msg, index) => (
                <div key={index}>
                  {/* Admin message - left side, purple bg - exact original */}
                  {msg.senderRole === "admin" && (
                    <div className="flex justify-end">
                      <div className="max-w-[70%] bg-[#7E76E84D] text-gray-800 rounded-2xl rounded-tr-sm px-5 py-3">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  )}
                  {/* User message - right side, pink bg - exact original */}
                  {msg.senderRole === "user" && (
                    <div className="flex justify-start">
                      <div className="max-w-[70%] bg-[#E691914D] text-gray-800 rounded-2xl rounded-tl-sm px-5 py-3">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Action bar - exact original "Yes/No" style, shown only if last admin msg exists */}
          {lastAdminMsg && ticket.status === "open" && (
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between w-full gap-1">
                <p className="text-[10px] lg:text-sm text-gray-700 px-2 lg:px-5 py-2 border border-gray-200 rounded-lg shadow-[inset_0_0_12px_#00000040] flex-1">
                  Are you satisfied with the response? Share your feedback here.
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={async () => {
                      try {
                        const res = await axios.put(
                          `${serverUrl}/tickets/${ticket._id}/close`,
                          {},
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        onTicketClosed(res.data.ticket);
                      } catch (err) {}
                    }}
                    className="px-3 lg:px-6 py-1.5 bg-[#D8D6F8] text-gray-800 rounded-lg text-xs lg:text-sm font-medium hover:bg-[#d6ccf0] transition-colors shadow-[inset_0_0_12px_#00000040] whitespace-nowrap"
                  >
                    Yes
                  </button>
                  <button className="px-3 lg:px-6 py-1.5 bg-[#F8DEDE] text-gray-800 rounded-lg text-xs lg:text-sm font-medium hover:bg-[#ffd0d0] transition-colors shadow-[inset_0_0_12px_#00000040] whitespace-nowrap">
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input - exact original */}
      <div className="bg-white border border-gray-400 px-6 py-4 rounded-md shadow-md">
        {ticket?.status === "closed" ? (
          <p className="text-center text-gray-400 text-sm py-1">
            This chat is closed.
          </p>
        ) : (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Enter the text"
              className="flex-1 bg-transparent outline-none text-[#00000099] placeholder:text-gray-400 text-sm"
              disabled={sending}
            />
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <Paperclip size={20} />
            </button>
            <button
              onClick={handleSend}
              disabled={sending || !message.trim()}
              className="text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-40"
            >
              <Send size={20} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default RightHelp;