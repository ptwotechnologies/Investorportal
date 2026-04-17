import React, { useState, useEffect } from "react";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";
import { IoClose, IoChevronDown } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { serverUrl } from "@/App";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const raisedRequestOptions = [
  { id: 1, label: "Connect with Incubators" },
  { id: 2, label: "Require Advisory Service" },
  { id: 3, label: "Require Legal Service" },
  { id: 4, label: "Require CXO Service" },
  { id: 5, label: "Require Compliance Service" },
  { id: 6, label: "Require HR Service" },
  { id: 7, label: "Require Development Service" },
  { id: 8, label: "Require Finance Service" },
  { id: 9, label: "Require Design Service" },
  { id: 10, label: "Require Funding Solutions" },
  { id: 11, label: "Require Marketing Service" },
  { id: 12, label: "Connect with Investors" },
  { id: 13, label: "Require Consultation Service" },
  { id: 14, label: "Other" },
];

const NewRequest = ({ onCreateRequest, triggerUpgradeModal }) => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);
  const [userPlan, setUserPlan] = useState(null);
  const [requestsCount, setRequestsCount] = useState(0);
  const [budget, setBudget] = useState("");
  const [priority, setPriority] = useState(null);
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  // Fetch user's plan and existing requests count
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingUserData(true);
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get(`${serverUrl}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ⭐ Fix: extract planName from plan object
        const planName = userRes.data.plan?.planName || "Explorer Access";
        setUserPlan(planName);

        const requestsRes = await axios.get(`${serverUrl}/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRequestsCount(requestsRes.data.length || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserPlan("Explorer Access"); // ⭐ default to free plan on error — safer
        setRequestsCount(0);
      } finally {
        setIsLoadingUserData(false);
      }
    };

    if (userId) fetchUserData();
  }, [userId]);

  // Check if user is on free plan and reached request limit
  const isFreePlan = userPlan === "Explorer Access";
  const hasReachedLimit = isFreePlan && requestsCount >= 1;

  const handleSend = async () => {
    if (isLoadingUserData) {
      // ⭐ check loading first
      toast("Please wait...");
      return;
    }
    if (hasReachedLimit) {
      // ⭐ check limit second
      triggerUpgradeModal("request");
      return;
    }
    if (!selectedService) {
      toast.error("Please select a service option first");
      return;
    }
    if (!budget) {
      toast.error("Please select an expected budget");
      return;
    }
    if (!priority) {
      toast.error("Please select a timeline for your request");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a description for your request");
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
          budget,
          priority,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Call the parent handler with the new request
      onCreateRequest(res.data);

      // Clear the form
      setDescription("");
      setSelectedService(null);
      setSelectedRequest(null);
      setRequestsCount((prev) => prev + 1);
      toast.success("Request created successfully!");
    } catch (err) {
      console.error("Failed to create request:", err);

      if (err.response?.status === 403 && err.response?.data?.limitReached) {
        triggerUpgradeModal("request"); // ⭐ show modal if backend blocks it
      } else {
        toast.error("Failed to create request. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>

      <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 gap-4  overflow-y-auto overscroll-contain touch-pan-y h-[calc(100dvh-250px)] pb-20 md:pb-0 md:h-auto scrollbar-hide ">
        {raisedRequestOptions.map((option) => (
          <div key={option.id} className="flex flex-col gap-2 relative">
            <div
              className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${selectedRequest === option.id ? "border-[#59549F]" : ""}`}
              onClick={() => {
                setSelectedRequest(option.id);
                setSelectedService(option.label);
              }}
            >
              <div className="shrink-0 p-3 border-2 border-gray-200 rounded-full shadow-[inset_0_0_12px_#00000040] ">
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

            {/* Absolute Overlay Dropdowns when selected */}
            {selectedRequest === option.id && (
              <div className="absolute z-50 left-15 right-0 top-[90%] mt-2 p-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[140px] relative">
                  <label className="text-[11px]  text-[#59549F]  ml-1 block mb-1.5 tracking-wider">Expected Budget <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsBudgetOpen(!isBudgetOpen);
                        setIsPriorityOpen(false);
                      }}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#59549F]/20 focus:border-[#59549F] transition-all shadow-sm cursor-pointer flex items-center justify-between px-4 group hover:border-[#59549F]/50"
                    >
                      <span className={`${budget ? "text-gray-700" : "text-gray-400"}`}>
                        {budget || "Select Expected Budget"}
                      </span>
                      <IoChevronDown 
                        className={`transition-transform duration-200 text-gray-400 group-hover:text-[#59549F] ${isBudgetOpen ? "rotate-180" : ""}`} 
                        size={14} 
                      />
                    </button>

                    {isBudgetOpen && (
                      <div className="absolute z-[60] left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {["Flexible", "Under ₹25K", "₹25K–₹1L", "₹1L+"].map((b) => (
                          <div
                            key={b}
                            onClick={(e) => {
                              e.stopPropagation();
                              setBudget(b);
                              setIsBudgetOpen(false);
                            }}
                            className={`px-4 py-2.5 text-xs cursor-pointer transition-colors flex items-center justify-between hover:bg-gray-50 ${budget === b ? "text-[#59549F] font-semibold bg-[#59549F]/5" : "text-gray-600"}`}
                          >
                            <span>{b}</span>
                            {budget === b && <IoMdCheckmark size={12} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-[140px] relative">
                  <label className="text-[11px]  text-[#59549F]  ml-1 block mb-1.5 tracking-wider">How soon do you want to get started? <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPriorityOpen(!isPriorityOpen);
                        setIsBudgetOpen(false);
                      }}
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#59549F]/20 focus:border-[#59549F] transition-all shadow-sm cursor-pointer flex items-center justify-between px-4 group hover:border-[#59549F]/50"
                    >
                      <span className={`${priority ? "text-gray-700" : "text-gray-400"}`}>
                        {priority || "Select Timeline"}
                      </span>
                      <IoChevronDown 
                        className={`transition-transform duration-200 text-gray-400 group-hover:text-[#59549F] ${isPriorityOpen ? "rotate-180" : ""}`} 
                        size={14} 
                      />
                    </button>

                    {isPriorityOpen && (
                      <div className="absolute z-[60] left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {[
                          "Urgent (within 1 week)",
                          "Short term (1–3 weeks)",
                          "Planned (1–2 months)",
                          "Flexible"
                        ].map((p) => (
                          <div
                            key={p}
                            onClick={(e) => {
                              e.stopPropagation();
                              setPriority(p);
                              setIsPriorityOpen(false);
                            }}
                            className={`px-4 py-2.5 text-xs cursor-pointer transition-colors flex items-center justify-between hover:bg-gray-50 ${priority === p ? "text-[#59549F] font-semibold bg-[#59549F]/5" : "text-gray-600"}`}
                          >
                            <span>{p}</span>
                            {priority === p && <IoMdCheckmark size={12} />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRequest(null);
                    setSelectedService(null);
                  }}
                  className="absolute top-2 right-2 text-gray-400 hover:text-[#59549F] transition-colors p-1"
                >
                  <IoClose size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="lg:border lg:p-3 mt-7  lg:border-gray-400 rounded-lg lg:static fixed bottom-1.5 left-1.5 right-1.5 z-20 ">
        <div className="flex border-2 shadow-md border-gray-300 items-center px-4 py-1 lg:py-0 justify-between rounded-xl flex-1  bg-linear-to-r from-[#D8D6F8] via-[#EADDF3] to-[#F8DEDE]">
          <input
            type="text"
            placeholder="Description *"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 outline-none w-full text-[#59549F] bg-transparent placeholder:text-[#59549F]  "
            disabled={isSubmitting}
          />
          <div className="flex items-center gap-2 ">
            <HiMiniLink size={20} className="text-[#59549F] " />

            <button
              onClick={handleSend}
              disabled={isSubmitting}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BsSendFill size={20} className="text-[#59549F]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequest;
