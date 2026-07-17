import React, { useState, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "@/App";

const CancelledTabSec = ({ setSelectedRequest, selectedRequest , setMobileView}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchCancelledRequests = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        
        // Fetch both raised and received requests
        const [raisedRes, receivedRes] = await Promise.all([
          axios.get(`${serverUrl}/requests`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${serverUrl}/requests/received`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        // Buyer cancelled requests
        const buyerCancelled = (raisedRes.data || []).filter(req => req.status === "cancelled");
        
        // Provider ignored/cancelled requests
        const providerCancelled = [];
        if (receivedRes.data?.forwardedRequests) {
          receivedRes.data.forwardedRequests.forEach(req => {
            if (req.isIgnored || req.status === "cancelled") {
              providerCancelled.push(req);
            }
          });
        }
        
        // Combine, sort, and deduplicate
        const combined = [...buyerCancelled, ...providerCancelled];
        const unique = Array.from(new Map(combined.map(item => [item._id, item])).values());
        unique.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setRequests(unique);
      } catch (err) {
        console.error("Error fetching cancelled requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCancelledRequests();
  }, []);

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
    return {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      label: 'Cancelled'
    };
  };

  // Loading state component
  if (loading) {
    return (
      <div className="flex-1 min-h-0 flex items-center justify-center">
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
      <div className="flex-1 min-h-0 flex items-center justify-center">
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
        <div className="md:hidden w-full flex-1 min-h-0 flex flex-col p-2  rounded-md">
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

          {/* No Action Buttons for Cancelled Tab */}
        </div>

        {/* Desktop List View - Always show on desktop even when showDetails is true */}
        <div className='hidden md:block flex-1 min-h-0 overflow-y-auto scrollbar-hide'>
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
    <div className='flex-1 min-h-0 overflow-y-auto scrollbar-hide '>
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

export default CancelledTabSec