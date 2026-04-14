import React, { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";

const RaisedTabSec = ({ requests, setRaisedRequests, setSelectedRequest, selectedRequest , setMobileView}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true); // NEW: Loading state
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelClick = () => {
    if (!selectedRequest) return;
    if (selectedRequest.interestedBy?.length > 0) {
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
      await axios.delete(`${serverUrl}/requests/${selectedRequest._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Request cancelled successfully");
      
      if (setRaisedRequests) {
        setRaisedRequests(prev => prev.filter(r => r._id !== selectedRequest._id));
      }
      handleBack();
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast.error(error.response?.data?.message || "Failed to cancel request");
    } finally {
      setIsDeleting(false);
    }
  };

  // NEW: Simulate loading effect when requests prop changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Short delay to show loading state
    return () => clearTimeout(timer);
  }, [requests]);

   const handleRequestClick = (req) => {
    setSelectedRequest(req);
    setShowDetails(true);
    setMobileView("right");
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedRequest(null);
    setMobileView("left");
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'raised':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          label: 'Raised'
        };
      case 'forwarded':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          label: 'Forwarded'
        };
      case 'accepted':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'Accepted'
        };
      case 'completed':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          label: 'Completed'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          label: 'Unknown'
        };
    }
  };

  // NEW: Loading state component
  if (loading) {
    return (
      <div className="h-130 lg:h-133 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59549F]"></div>
          <p className="text-sm text-gray-500">Loading requests...</p>
        </div>
      </div>
    );
  }

  // NEW: No requests state component
  if (!requests || requests.length === 0) {
    return (
      <div className="h-130 lg:h-133 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-8 text-center border border-gray-300 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md bg-white">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No requests to show
            </h3>
            <p className="text-sm text-gray-500">
              Click on "New Request" to raise one
            </p>
          </div>
        </div>
      </div>
    );
  }
  

  // Show detail view on mobile only
  if (showDetails && selectedRequest) {
    const statusStyle = getStatusStyle(selectedRequest.status);
    return (
      <>
        {/* Mobile Detail View */}
        <div className="md:hidden w-full h-130 flex flex-col p-2  rounded-md">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b shrink-0">
            <h2 className="text-lg font-semibold text-[#001032]">
              Request Details
            </h2>
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoMdClose size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Request Details Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="space-y-4">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 bg-gray-200"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#001032] line-clamp-2">
                    {selectedRequest.service}
                  </h3>
                  {selectedRequest.createdAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(selectedRequest.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Service Type */}
              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Service Type
                </h4>
                <p className="text-xs text-[#001032]">
                  {selectedRequest.service}
                </p>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Description
                </h4>
                <p className="text-xs text-[#001032] leading-relaxed">
                  {selectedRequest.description}
                </p>
              </div>

              {/* Status */}
              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Status
                </h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bgColor} ${statusStyle.textColor}`}>
                  {statusStyle.label}
                </span>
              </div>

              {/* Budget & Priority */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                  <h4 className="text-xs font-semibold text-gray-600 mb-1">
                    Budget
                  </h4>
                  <p className="text-xs text-[#001032]">
                    {selectedRequest.budget || "N/A"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                  <h4 className="text-xs font-semibold text-gray-600 mb-1">
                    Priority
                  </h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    selectedRequest.priority === 'High' ? 'bg-red-100 text-red-700' :
                    selectedRequest.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {selectedRequest.priority || "Low"}
                  </span>
                </div>
              </div>

              {/* Request ID */}
              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Request ID
                </h4>
                <p className="text-[10px] text-gray-700 font-mono break-all">
                  {selectedRequest._id || selectedRequest.id || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Fixed Action Buttons at Bottom */}
          <div className="pt-2 border-t mt-auto">
            <button 
              onClick={handleCancelClick}
              disabled={selectedRequest.interestedBy?.length > 0 || isDeleting}
              className={`w-full border-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                selectedRequest.interestedBy?.length > 0
                  ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                  : "border-[#59549F] text-[#59549F] hover:bg-[#59549F] hover:text-white"
              }`}
            >
              {isDeleting ? "Cancelling..." : "Cancel Request"}
            </button>
          </div>
        </div>

        {/* Custom Confirmation Popup */}
        {showCancelConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
            <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] rounded-2xl p-5 border w-[90%] max-w-sm text-center transform transition-all animate-in fade-in zoom-in duration-200">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-md font-bold text-[#001032] mb-1">Cancel Request</h3>
              <p className="text-xs text-gray-600 mb-5 px-2">
                Are you sure you want to cancel this request? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 bg-[#59549F] text-white py-2 rounded-full text-xs font-semibold hover:bg-white hover:text-[#59549F] shadow-md transition-all active:scale-95"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition-all active:scale-95"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop List View - Always show on desktop even when showDetails is true */}
        <div className='hidden md:block h-130 lg:h-133 overflow-y-auto scrollbar-hide'>
          {requests.map((req) => (
            <div key={req._id || req.id}
              onClick={() => handleRequestClick(req)}
              className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
              <div className="flex items-center justify-center p-3 shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200"></div>
              </div>
              <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
              <div className="flex flex-col justify-center w-full px-3 py-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-[#001032] font-semibold text-sm">
                      {req.service}
                    </h1>
                    <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                      {req.description}
                    </p>
                  </div>
                </div>
                
                {req.createdAt && (
                  <div className="flex justify-end mt-2">
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(req.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {" • "}
                      {new Date(req.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className='h-130 lg:h-133 overflow-y-auto scrollbar-hide '>
      {requests.map((req) => (
        <div key={req._id || req.id}
          onClick={() => handleRequestClick(req)}
          className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
          <div className="flex items-center justify-center p-3 shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200"></div>
          </div>
          <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
          <div className="flex flex-col justify-center w-full px-3 py-3">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="text-[#001032] font-semibold text-sm">
                  {req.service}
                </h1>
                <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                  {req.description}
                </p>
              </div>
            </div>
            
            {req.createdAt && (
              <div className="flex justify-end mt-2">
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(req.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  {" • "}
                  {new Date(req.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default RaisedTabSec