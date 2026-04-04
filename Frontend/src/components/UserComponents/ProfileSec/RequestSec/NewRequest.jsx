import React, { useState } from "react";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";
import { serverUrl } from "@/App";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const raisedRequestOptions = [
  { id: 2, label: "Require Advisory Service" },
  { id: 3, label: "Require Legal Service" },
  { id: 4, label: "Require CXO Service" },
  { id: 5, label: "Require Compliance Service" },
  { id: 6, label: "Require HR Service" },
  { id: 7, label: "Require Development Service" },
  { id: 8, label: "Require Finance Service" },
  { id: 9, label: "Require Design Service" },
  { id: 11, label: "Require Marketing Service" },
  { id: 13, label: "Require Consultation Service" },
];

const NewRequest = ({ onCreateRequest }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async () => {
    if (!selectedService || !description.trim()) {
      toast.error("Please select a service and enter a description");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${serverUrl}/requests`,
        {
          service: selectedService,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Call the parent handler with the new request
      onCreateRequest(res.data);

      // Clear the form
      setDescription("");
      setSelectedService(null);
      setSelectedRequest(null);
    } catch (err) {
      console.error("Failed to create request:", err);
      toast.error("Failed to create request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 gap-4  overflow-y-auto overscroll-contain touch-pan-y h-[calc(100dvh-250px)] pb-20 md:pb-0 md:h-auto scrollbar-hide">
        {raisedRequestOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setSelectedRequest(option.id);
              setSelectedService(option.label);
            }}
          >
            <div className="shrink-0 p-3 border-2 border-gray-200 rounded-full shadow-[inset_0_0_12px_#00000040]">
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-[#59549F]">
                {selectedRequest === option.id && (
                  <div className="w-3 h-3 rounded-full bg-[#59549F]"></div>
                )}
              </div>
            </div>
            <span className="text-sm text-[#001032] leading-tight border-2 border-gray-300 rounded-xl px-4 py-3 flex-1 hover:border-gray-400 transition-colors text-center shadow-[inset_0_0_12px_#00000040]">
              {option.label}
            </span>
          </div>
        ))}
      </div>

      <div className="lg:border lg:p-3 mt-7  lg:border-gray-400 rounded-lg lg:static fixed bottom-1.5 left-1.5 right-1.5 z-20 ">
        <div className="flex border-2 shadow-md border-gray-300 items-center px-4 py-1 lg:py-0 justify-between rounded-xl flex-1  bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 outline-none w-full text-[#59549F] bg-transparent placeholder:text-[#59549F]  "
            disabled={isSubmitting}
          />
          <div className="flex items-center gap-2 ">
            <HiMiniLink size={20} className="text-[#59549F] " />
            <button
              onClick={handleSend}
              disabled={isSubmitting || !selectedService || !description.trim()}
              className="disabled:opacity-50 disabled:cursor-not-allowed "
            >
              <BsSendFill size={20} className="text-[#59549F]" />
            </button>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default NewRequest;