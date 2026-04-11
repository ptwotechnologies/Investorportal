import React, { useState, useEffect } from "react";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
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

const NewRequest = ({ onCreateRequest }) => {
  const navigate = useNavigate();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [userPlan, setUserPlan] = useState(null);
  const [requestsCount, setRequestsCount] = useState(0);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  const userId = localStorage.getItem("userId");

  // Fetch user's plan and existing requests count
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch user's plan
        const userRes = await axios.get(`${serverUrl}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const planName = userRes.data.plan || "Explorer Access"; // Default to free plan
        setUserPlan(planName);

        // Fetch user's requests count
        const requestsRes = await axios.get(`${serverUrl}/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setRequestsCount(requestsRes.data.length || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingUserData(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  // Check if user is on free plan and reached request limit
  const isFreePlan = userPlan === "Explorer Access";
  const hasReachedLimit = isFreePlan && requestsCount >= 1;

  const handleSend = async () => {
    if (!selectedService || !description.trim()) {
      toast.error("Please select a service and enter a description");
      return;
    }

    // Check if user has reached free plan limit
    if (hasReachedLimit) {
      setShowUpgradeModal(true);
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
      setRequestsCount(requestsCount + 1);
      toast.success("Request created successfully!");
    } catch (err) {
      console.error("Failed to create request:", err);
      toast.error("Failed to create request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* ✅ Upgrade Modal for Free Plan Limit */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-in">
            {/* Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#001032]">Upgrade Your Plan</h2>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mb-6">
              <p className="text-lg text-[#3C1D3A] font-semibold mb-3">
                Your quota is full
              </p>
              <p className="text-sm text-gray-600 mb-4">
                You are currently on the <span className="font-semibold">Free Plan</span> which allows you to raise only <span className="font-bold">1 request</span>.
              </p>
              <p className="text-sm text-gray-600">
                To raise more requests and unlock additional features, please upgrade your plan.
              </p>
            </div>

            {/* Benefits Preview */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <p className="text-sm font-semibold text-[#119BCD] mb-2">
                With a Paid Plan, you get:
              </p>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>✓ Unlimited requests</li>
                <li>✓ Higher visibility</li>
                <li>✓ Priority support</li>
                <li>✓ Access to premium features</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Later
              </button>
              <button
                onClick={() => {
                  navigate("/pricing");
                  setShowUpgradeModal(false);
                }}
                className="flex-1 px-4 py-2 bg-[#002A30] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-2 gap-4  overflow-y-auto overscroll-contain touch-pan-y h-[calc(100dvh-250px)] pb-20 md:pb-0 md:h-auto scrollbar-hide ">
        {raisedRequestOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center gap-3 cursor-pointer "
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

    </div>
  );
};

export default NewRequest;