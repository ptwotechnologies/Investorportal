import React from "react";
import { IoMdClose } from "react-icons/io";

const RightRaised = ({  selectedRequest, setSelectedRequest, setMobileView }) => {
  const handleClose = () => {
    setSelectedRequest(null);
     if (setMobileView) {
      setMobileView("left");
    }
  };

  // If no request is selected, show empty state
  if (!selectedRequest) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
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
    );
  }

  // Show selected request details
  return (
    <div className="w-full h-full flex flex-col lg:p-4 p-2 bg-white rounded-md">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b shrink-0">
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
      <div className="flex-1 overflow-y-auto scrollbar-hide">
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
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
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

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 bg-[#1F9E61] text-white lg:py-3 py-2 rounded-lg text-sm font-medium hover:bg-[#188c54] transition-colors">
              Update Request
            </button>
            <button className="flex-1 border-2 border-gray-300 text-gray-700 lg:py-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightRaised;