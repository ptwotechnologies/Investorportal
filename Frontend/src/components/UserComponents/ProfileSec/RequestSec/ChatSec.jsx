import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import RightChatSec from "./RightChatSec";
import { TfiList } from "react-icons/tfi";

const ChatSec = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false); // mainly for mobile

  const chats = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: "Akshay Dogra",
  desc:
    "Grow Your Business by Partnering with India’s Fastest-Growing Startup Ecosystem",
  location: "New Delhi, Delhi",
}));


  return (
    <div className="md:flex  lg:bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-6">
      <div className=" bg-gray-100 h-[85vh]  w-full  mx-auto  pt-4">
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg px-10 mb-4 justify-between items-center">
          <h1 className="text-md font-semibold text-gray-800">
            Welcome, Startup India Pvt. Ltd.
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <FaUser
              className="text-gray-600 border border-gray-600 p-1 rounded-full"
              size={24}
            />
            <span className="font-semibold text-gray-800">
              Switch to professional
            </span>
          </button>
        </div>

        <div className="flex gap-4 items-stretch">
          <div
            className={`relative flex flex-col bg-white  border border-gray-400 p-4 rounded-md shadow-md w-full md:w-[44%] h-screen lg:h-[88vh] gap-2 ${showChat ? "hidden lg:flex" : "flex"}`}
          >
            <div className="flex items-center justify-between gap-2 border-2 border-[#D9D9D9]  lg:p-2 p-1 px-2 rounded-lg">
              <input
                type="text"
                className="w-full outline-none"
                placeholder="Search requests"
              />
              <TfiList size={24} className="text-gray-500 bg-white" />
            </div>

            <div className=" flex items-center gap-2">
              <button
                className={`  px-6 py-1 border border-[#D9D9D9] lg:rounded-lg rounded-sm w-30  text-md lg:text-[16px] bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]`}
              >
                Primary
              </button>

              <button
                className={` px-5 py-1 lg:rounded-lg rounded-sm border border-[#D9D9D9] w-30  text-md lg:text-[16px]`}
              >
                General
              </button>
            </div>

            {/* Column 2 */}
            <div className=" flex flex-col gap-2 w-full max-h-140 scrollbar-hide overflow-y-auto ">
             {chats.map((chat) => (
                <div
                  key={chat.id}
    onClick={() => {
      setSelectedChat(chat);
      setShowChat(true);
    }}
                  className="flex items-center  gap-3 rounded-lg  bg-white  transition-all shadow-[inset_0_0_12px_#00000040]"
                >
                  <div className="w-16 h-16 my-2 ml-3 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
                  <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                  <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  px-2">
                    <div className="my-3   ">
                      <h1 className="text-[#001032] font-semibold text-sm">
                        Akshay Dogra
                      </h1>
                      <p className="text-[#001032]  text-xs">
                        Grow Your Business by Partnering with India’s
                        Fastest-Growing Startup Ecosystem
                      </p>
                      <p className="text-[#001032]   text-[10px]">
                        New Delhi, Delhi
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Right Card (exact UI, untouched CSS) */}
          <div
            className={` lg:w-[56%] h-[88vh]  ${showChat ? "flex" : "hidden lg:flex"}`}
          >
            {selectedChat ? (
              <RightChatSec
                chat={selectedChat}
                onBack={() => setShowChat(false)}
              />
            ) : (
              <div className="hidden lg:flex items-center justify-center w-full text-gray-400">
                Select a chat to start conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSec;
