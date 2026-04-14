import React, { useState } from "react";
import { TfiList } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";

const RightNewRequest = ({raisedRequests, setRaisedRequests, setMobileView , selectedRequest,setSelectedRequest,}) => {
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCardClick = (req) => {
    setExpandedRequest(req);
    setSelectedRequest(req);
  };

  const handleCloseExpanded = () => {
    setExpandedRequest(null);
    setShowCancelConfirm(false);
  };

  const handleCancelClick = () => {
    if (!expandedRequest) return;
    if (expandedRequest.interestedBy?.length > 0) {
      toast.error("Cannot cancel request that has interested professionals.");
      return;
    }
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = async () => {
    setShowCancelConfirm(false);
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${serverUrl}/requests/${expandedRequest._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Request cancelled successfully");
      
      if (setRaisedRequests) {
        setRaisedRequests(prev => prev.filter(r => r._id !== expandedRequest._id));
      }
      handleCloseExpanded();
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast.error(error.response?.data?.message || "Failed to cancel request");
    } finally {
      setIsDeleting(false);
    }
  };

  if (expandedRequest) {
    const hasInterests = expandedRequest.interestedBy?.length > 0;
    return (
      <div className="w-full h-full flex flex-col bg-white rounded-md relative overflow-hidden">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b p-4 bg-white sticky top-0 z-10 shrink-0">
          <h2 className="text-lg font-semibold text-[#001032]">Request Details</h2>
          <button
            onClick={handleCloseExpanded}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoMdClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Expanded Card Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 pb-20">
          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-2 border-gray-300 bg-gray-200"></div>
              <div>
                <h3 className="text-xl font-bold text-[#001032]">
                  {expandedRequest.service}
                </h3>
                {expandedRequest.createdAt && (
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(expandedRequest.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* Service Type */}
            <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Service Type</h4>
              <p className="text-xs text-[#001032]">{expandedRequest.service}</p>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Description</h4>
              <p className="text-xs text-[#001032] leading-relaxed">
                {expandedRequest.description}
              </p>
            </div>

            {/* Status */}
            <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Status</h4>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-600 mb-1">Request ID</h4>
              <p className="text-sm text-gray-700 font-mono">
                {expandedRequest._id || expandedRequest.id || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Action Buttons at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t z-10 invisible"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-3 z-10 w-full">
          <button 
            onClick={handleCancelClick}
            disabled={hasInterests || isDeleting}
            className={`w-full border-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              hasInterests 
                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50" 
                : "border-[#59549F] text-[#59549F] hover:bg-[#59549F] hover:text-white"
            }`}
          >
            {isDeleting ? "Cancelling..." : "Cancel Request"}
          </button>
        </div>

        {/* Custom Confirmation Popup */}
        {showCancelConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
            <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] rounded-2xl p-6 border w-[85%] max-w-sm text-center transform transition-all animate-in fade-in zoom-in duration-200">
              <div className="w-16 h-16 bg-[#59549F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#59549F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#001032] mb-2">Cancel Request</h3>
              <p className="text-sm text-gray-600 mb-6 px-2">
                Are you sure you want to cancel this request? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 bg-[#59549F] text-white py-2.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#59549F] border-[#59549F] border shadow-lg shadow-gray-200 transition-all active:scale-95"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all active:scale-95"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
 

  return (
    <div className="lg:p-4 p-2 w-full h-full">
      <div className="md:hidden flex items-center p-3 border-b">
        <button
          onClick={() => setMobileView("left")}
          className="text-[#1F9E61] font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className=" ">
        <div className="flex items-center gap-2 ">
          <button className="bg-[#D8D6F8] text-[#59549F] lg:py-1 p-2 rounded-sm  lg:w-[25%] w-[30%] text-sm shadow-[inset_0_0_12px_#00000040]">
            New Request
          </button>

          <div className="flex items-center justify-between gap-2 border-2 border-[#D9D9D9] lg:w-[75%] w-[70%] lg:p-2 lg:py-1 p-2 px-2 rounded-sm text-sm">
            <input
              type="text"
              className="w-full outline-none"
              placeholder="Search requests"
            />
            <TfiList size={24} className="text-gray-500 bg-white" />
          </div>
        </div>
      </div>
      
      <div className="h-140 overflow-y-auto scrollbar-hide mt-4">
        {raisedRequests && raisedRequests.length > 0 ? (
        raisedRequests.map((req) => (
          <div 
          key={req._id || req.id}
              onClick={() => handleCardClick(req)}
          className="flex items-stretch gap- mb-1 rounded-lg  bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22">
            <div className="flex items-center justify-center p-3 shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200"></div>
            </div>
            <div className="w-0.5 h-full p-0 bg-[#0010324D] "></div>
            <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  pl-2">
              <div className="my-3 min-w-0 flex-1">
                <h1 className="text-[#001032] font-semibold text-sm">
                  {req.service}
                </h1>
                <p className="text-[#001032] text-xs line-clamp-2">{req.description}</p>

                {req.createdAt && (
                <p className="text-xs text-gray-500 pt-2">
                  {new Date(req.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
              </div>
            </div>
          </div>
        ))
      ):(
        <p className="text-center py-4 text-gray-500">No requests found.</p>
      
      )}
      </div>
    </div>
  );
};

export default RightNewRequest;