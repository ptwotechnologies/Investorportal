import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";
import { toast } from "react-hot-toast";

const RightRaised = ({  requests, setRaisedRequests, selectedRequest, setSelectedRequest, setMobileView }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleClose = () => {
    setSelectedRequest(null);
     if (setMobileView) {
      setMobileView("left");
    }
  };

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
      handleClose();
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast.error(error.response?.data?.message || "Failed to cancel request");
    } finally {
      setIsDeleting(false);
    }
  };

   const getStatusStyle = (status) => {
    switch(status) {
      case 'raised':
        return {
          bgColor: 'bg-red-100',
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

  // If no request is selected, show empty state
  if (!selectedRequest) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
       <div className="flex flex-col items-center  p-8 text-center  border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md">
         <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
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
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No Request Selected
        </h3>
        <p className="text-gray-500 text-sm">
          Click on a request from the left to view details
        </p>
       </div>
      </div>
    );
  }
 const statusStyle = getStatusStyle(selectedRequest.status);
 const hasInterests = selectedRequest.interestedBy?.length > 0;

  // Show selected request details
  return (
    <div className="w-full h-full flex flex-col bg-white rounded-md relative">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b shrink-0 lg:p-4 p-2 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-[#001032]">
          Request Details
        </h2>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoMdClose size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Request Details Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide lg:px-4 px-2 pb-20">
        <div className="space-y-4">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-gray-300 bg-gray-200"></div>
            <div className="flex-1 min-w-0">
              <h3 className="lg:text-xl text-lg font-bold text-[#001032] truncate">
                {selectedRequest.service}
              </h3>
              {selectedRequest.createdAt && (
                <p className="text-sm text-gray-500 mt-1">
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
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Service Type
            </h4>
            <p className="text-sm text-[#001032]">
              {selectedRequest.service}
            </p>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Description
            </h4>
            <p className="text-sm text-[#001032] leading-relaxed">
              {selectedRequest.description}
            </p>
          </div>

          {/* Status */}
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Status
            </h4>
             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bgColor} ${statusStyle.textColor}`}>
              {statusStyle.label}
            </span>
          </div>

          {/* Budget & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">
                Budget
              </h4>
              <p className="text-sm text-[#001032]">
                {selectedRequest.budget || "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">
                Priority
              </h4>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase ${
                selectedRequest.priority === 'High' ? 'bg-red-100 text-red-700' :
                selectedRequest.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {selectedRequest.priority || "Low"}
              </span>
            </div>
          </div>

          {/* Request ID */}
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Request ID
            </h4>
            <p className="text-xs text-gray-700 font-mono break-all">
              {selectedRequest._id || selectedRequest.id || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Action Buttons at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t z-10">
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
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="flex-1 bg-[#59549F] text-white py-2.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#59549F] shadow-lg shadow-gray-300 transition-all active:scale-95"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all active:scale-95"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightRaised;