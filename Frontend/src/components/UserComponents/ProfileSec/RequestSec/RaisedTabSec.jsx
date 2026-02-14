import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

const RaisedTabSec = ({ requests, setSelectedRequest, selectedRequest , setMobileView}) => {
  const [showDetails, setShowDetails] = useState(false);

   const handleRequestClick = (req) => {
    setSelectedRequest(req);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedRequest(null);
  };

  // Show detail view on mobile only
if (showDetails && selectedRequest) {
  return (
    <>
      {/* Mobile Detail View */}
      <div className="md:hidden w-full h-full flex flex-col p-2 bg-white rounded-md">
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
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pending
              </span>
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

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-[#1F9E61] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#188c54] transition-colors">
                Update Request
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop List View - Always show on desktop even when showDetails is true */}
      <div className='hidden md:block h-130 lg:h-123 overflow-y-auto scrollbar-hide'>
           {requests && requests.length > 0 ? (
         requests.map((req) => (
        <div key={req._id || req.id}
            onClick={() => handleRequestClick(req)}
         className="flex items-center  gap-3 mb-2 rounded-lg  bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25">
          <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200">
            
          </div>
          <div className="w-0.5 h-full p-0 bg-[#0010324D] "></div>
          <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  px-2">
            <div className="my-3   ">
              <h1 className="text-[#001032] font-semibold text-sm">
                {req.service}
              </h1>
              <p className="text-[#001032]  text-xs">
                {req.description}
              </p>

               {req.createdAt && (
                <p className="text-xs text-gray-500 mt-2">
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
              )}
              
            </div>
           
          </div>
        </div>
       ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <svg
              className="w-8 h-8 text-gray-400"
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
          <p className="text-gray-500 font-medium">No raised requests</p>
          <p className="text-gray-400 text-xs mt-1">
            Click "New Request" to create one
          </p>
        </div>
      )}
    </div>
    </>
  );
}

   
  
 
  return (
    <div className='h-130 lg:h-123 overflow-y-auto scrollbar-hide'>
           {requests && requests.length > 0 ? (
         requests.map((req) => (
        <div key={req._id || req.id}
            onClick={() => handleRequestClick(req)}
         className="flex items-center  gap-3 mb-2 rounded-lg  bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25">
          <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200">
            
          </div>
          <div className="w-0.5 h-full p-0 bg-[#0010324D] "></div>
          <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  px-2">
            <div className="my-3   ">
              <h1 className="text-[#001032] font-semibold text-sm">
                {req.service}
              </h1>
              <p className="text-[#001032]  text-xs">
                {req.description}
              </p>

               {req.createdAt && (
                <p className="text-xs text-gray-500 mt-2">
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
              )}
              
            </div>
           
          </div>
        </div>
       ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <svg
              className="w-8 h-8 text-gray-400"
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
          <p className="text-gray-500 font-medium">No raised requests</p>
          <p className="text-gray-400 text-xs mt-1">
            Click "New Request" to create one
          </p>
        </div>
      )}
    </div>
   
  )
}

export default RaisedTabSec
