import React, { useState } from "react";
import { TfiList } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";

const RightNewRequest = ({raisedRequests,setMobileView , selectedRequest,setSelectedRequest,}) => {
   const [expandedRequest, setExpandedRequest] = useState(null);

  const handleCardClick = (req) => {
    setExpandedRequest(req);
    setSelectedRequest(req);
  };

  const handleCloseExpanded = () => {
    setExpandedRequest(null);
  };

  if (expandedRequest) {
    return (
      <div className="w-full h-full flex flex-col p-4 bg-white">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b">
          <h2 className="text-lg font-semibold text-[#001032]">Request Details</h2>
          <button
            onClick={handleCloseExpanded}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoMdClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Expanded Card Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 bg-[#1F9E61] text-white py-3 rounded-lg font-medium hover:bg-[#188c54] transition-colors">
                Update Request
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Cancel Request
              </button>
            </div>
          </div>
        </div>
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
          <button className="bg-[#1F9E61] lg:py-2 p-2 rounded-lg text-white lg:w-[25%] w-[30%] text-sm ">
            New Request
          </button>

          <div className="flex items-center justify-between gap-2 border-2 border-[#D9D9D9] lg:w-[75%] w-[70%] lg:p-2 p-2 px-2 rounded-lg text-sm">
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
          className="flex items-center  gap-3 mb-2 rounded-lg  bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25">
            <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
            <div className="w-0.5 h-full p-0 bg-[#0010324D] "></div>
            <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  px-2">
              <div className="my-3   ">
                <h1 className="text-[#001032] font-semibold text-sm">
                  {req.service}
                </h1>
                <p className="text-[#001032]  text-xs">{req.description}</p>

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
