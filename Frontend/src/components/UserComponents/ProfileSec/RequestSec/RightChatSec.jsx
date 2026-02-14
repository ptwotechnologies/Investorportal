import React, { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const RightChatSec = ({ chat, onBack }) => {
  const [message, setMessage] = useState("");

  // Sample messages - replace with your actual data
  const messages = [
    {
      id: 1,
      type: "received",
      text: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design valuable content for go-to-market",
      timestamp: "10:00 AM",
    },
    {
      id: 2,
      type: "sent",
      text: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design valuable content for go-to-market",
      timestamp: "10:02 AM",
    },
    {
      id: 3,
      type: "received",
      text: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design valuable content for go-to-market",
      timestamp: "10:00 AM",
    },
    {
      id: 4,
      type: "sent",
      text: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused marketing campaign, customer experience and design valuable content for go-to-market",
      timestamp: "10:02 AM",
    },
    {
      id: 5,
      type: "action",
      text: "Check out the deal section to close the deal",
      timestamp: "10:05 AM",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message logic here
      console.log("Sending:", message);
      setMessage("");
    }
  };

  const handleAction = (action) => {
    console.log("Action clicked:", action);
    // Handle action button clicks
  };

  return (
    <div className="  lg:h-[88vh] flex flex-col gap-3">
      {/* Chat Container */}
      <div className="flex flex-col bg-white rounded-md flex-1 border border-gray-400 overflow-hidden">
        {/* Mobile Header */}
        <div className="flex items-center gap-2 lg:hidden px-4 pt-3 ">
          <button
            onClick={onBack}
            className="text-sm font-medium text-[#001032]"
          >
            ← Back
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-t-md px-4 py-2 lg:py-4 flex items-center gap-3 ">
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-300"></div>
          <div className="flex-1">
            <h2 className="lg:text-lg p-1 lg:p-3 text-md  rounded-lg w-50 font-semibold text-gray-800 border border-gray-200">
              {chat?.name || "Akshay Dogra"}
            </h2>
          </div>
        </div>

        {/* Messages Area - This is the key fix */}
        <div className="flex flex-col flex-1 overflow-hidden ">
          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.type === "received" && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] bg-[#7E76E84D] text-gray-800 rounded-2xl rounded-tr-sm px-5 py-3">
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}

                {msg.type === "sent" && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] bg-[#E691914D] text-gray-800 rounded-2xl rounded-tl-sm px-5 py-3">
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons - Fixed at bottom of messages area */}
          <div className="px-4 pb-4">
            {messages
              .filter((msg) => msg.type === "action")
              .map((msg) => (
                <div key={msg.id} className="flex justify-center">
                  <div className="flex items-center justify-between w-full gap-1">
                    <p className="text-[10px] lg:text-sm text-gray-700 px-2 lg:px-5 py-2 border border-gray-200 rounded-lg shadow-[inset_0_0_12px_#00000040] flex-1">
                      {msg.text}
                    </p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleAction("yes")}
                        className="px-3 lg:px-6 py-1.5 bg-[#D8D6F8] text-gray-800 rounded-lg text-xs lg:text-sm font-medium hover:bg-[#d6ccf0] transition-colors shadow-[inset_0_0_12px_#00000040] whitespace-nowrap"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleAction("no")}
                        className="px-3 lg:px-6 py-1.5 bg-[#F8DEDE] text-gray-800 rounded-lg text-xs lg:text-sm font-medium hover:bg-[#ffd0d0] transition-colors shadow-[inset_0_0_12px_#00000040] whitespace-nowrap"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border border-gray-400 px-6 py-4 rounded-md shadow-md">
        <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Enter the text"
            className="flex-1 bg-transparent outline-none text-[#00000099] placeholder:text-gray-400 text-sm"
          />
          <button className="text-gray-600 hover:text-gray-800 transition-colors">
            <Paperclip size={20} />
          </button>
          <button
            onClick={handleSend}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightChatSec;
