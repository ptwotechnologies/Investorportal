import { serverUrl } from "@/App";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const ReceivedTabSec = ({
  setSelectedRequest,
  selectedRequest,
  setMobileView,
  setReceivedHandlers,
}) => {
  const [forwardedRequests, setForwardedRequests] = useState([]);
  const [myInterestedRequests, setMyInterestedRequests] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    requestId: null,
    providerId: null,
  });
  const [loading, setLoading] = useState(true); // NEW: Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      setLoading(true); // NEW: Set loading to true
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/requests/received`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForwardedRequests(res.data.forwardedRequests);
        setMyInterestedRequests(res.data.myInterestedRequests);
      } catch (err) {
        console.error("Error fetching received requests:", err);
      } finally {
        setLoading(false); // NEW: Set loading to false
      }
    };

    fetchReceivedRequests();
  }, []);

  const handleRequestClick = (req) => {
    setSelectedRequest(req);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedRequest(null);
  };

  const handleInterest = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${serverUrl}/requests/interested/${requestId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // update list
      setForwardedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, status: "interested" }
            : req
        )
      );

      // update mobile / right detail view
      setSelectedRequest((prev) =>
        prev && prev._id === requestId
          ? { ...prev, status: "interested" }
          : prev
      );

    } catch (err) {
      console.error("Error marking interest:", err);
    }
  };

  const handleAccept = async (requestId, providerId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${serverUrl}/requests/accept`,
        {
          requestId,
          providerId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // local state update for UI
      setMyInterestedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, acceptedProvider: providerId, status: "accepted" }
            : req,
        ),
      );
    } catch (err) {
      console.error("Error accepting provider:", err);
    }
  };

  const handleIgnore = async (requestId, providerId = null) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${serverUrl}/requests/ignore`,
        { requestId, providerId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (providerId) {
        setMyInterestedRequests((prev) =>
          prev.map((req) =>
            req._id === requestId
              ? {
                  ...req,
                  interestedBy: req.interestedBy.filter(
                    (user) => user._id !== providerId
                  ),
                }
              : req
          )
        );
      } else {
        setForwardedRequests((prev) =>
          prev.map((req) =>
            req._id === requestId
              ? { ...req, isIgnored: true }
              : req
          )
        );

        setSelectedRequest((prev) =>
          prev && prev._id === requestId
            ? { ...prev, isIgnored: true }
            : prev
        );
      }

      setShowConfirm({
        requestId: null,
        providerId: null,
      });

    } catch (err) {
      console.error("Error ignoring request:", err);
    }
  };

  // Share handlers with parent component
  useEffect(() => {
    if (setReceivedHandlers) {
      setReceivedHandlers({
        handleInterest,
        handleIgnore,
        handleAccept,
        showConfirm,
        setShowConfirm,
      });
    }
  }, [showConfirm, setReceivedHandlers]);

  // NEW: Check if there are no requests
  const hasNoRequests = 
    forwardedRequests.length === 0 && 
    myInterestedRequests.length === 0;

  // NEW: Loading state component
  if (loading) {
    return (
      <div className="h-130 lg:h-123 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59549F]"></div>
          <p className="text-sm text-gray-500">Loading requests...</p>
        </div>
      </div>
    );
  }

  // NEW: No requests state component
  if (hasNoRequests && !loading) {
    return (
      <div className="h-130 lg:h-123 flex items-center justify-center">
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
                        },
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
                  {selectedRequest.status === "interested" ? "Interested" : "Forwarded"}
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
                <button
                  onClick={() => handleInterest(selectedRequest._id)}
                  disabled={selectedRequest.status === "interested" || selectedRequest.isIgnored}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                    selectedRequest.status === "interested" || selectedRequest.isIgnored
                      ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed rounded-full opacity-50"
                      : "bg-[#F8DEDE] text-[#B94444] rounded-full"
                  }`}
                >
                  {selectedRequest.status === "interested" ? "Interested" : "Interest"}
                </button>
                <button
                  onClick={() =>
                    setShowConfirm({
                      requestId: selectedRequest._id,
                      providerId: null,
                    })
                  }
                  disabled={selectedRequest.status === "interested" || selectedRequest.isIgnored}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                    selectedRequest.status === "interested" || selectedRequest.isIgnored
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-full"
                      : "bg-[#D8D6F8] text-[#59549F] rounded-full"
                  }`}
                >
                  {selectedRequest.isIgnored ? "Ignored" : "Ignore"}
                </button>
              </div>

              {/* Confirmation Dialog */}
              {showConfirm.requestId === selectedRequest._id &&
                showConfirm.providerId === null && (
                  <div className="bg-white shadow-lg rounded-lg p-3 border">
                    <p className="text-sm text-gray-700 mb-3">Are you sure you want to ignore this request?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleIgnore(selectedRequest._id)}
                        className="flex-1 bg-[#F8DEDE] text-[#B94444] px-3 py-2 rounded-full text-xs shadow-[inset_0_0_12px_#00000040]"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() =>
                          setShowConfirm({
                            requestId: null,
                            providerId: null,
                          })
                        }
                        className="flex-1 bg-white text-[#001032] px-3 py-2 rounded-full text-xs shadow-[inset_0_0_12px_#00000040] border"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Desktop List View - Always show on desktop even when showDetails is true */}
        <div className="hidden md:block h-130 lg:h-123 overflow-y-auto scrollbar-hide">
          {forwardedRequests.map((req) => (
            <div
              key={req._id}
              onClick={() => handleRequestClick(req)}
              className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer"
            >
              <div className="flex items-center justify-center p-3 shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200"></div>
              </div>
              <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
              <div className="flex items-center justify-between w-full px-3 py-3">
                <div className="min-w-0 flex-1 pr-2">
                  <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">
                    {req.service}
                  </h1>
                  <p className="text-[#001032] text-xs line-clamp-1 mt-1">
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

                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInterest(req._id);
                    }}
                    disabled={req.status === "interested" || req.isIgnored}
                    className={`px-2 py-1 rounded flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                      req.status === "interested" || req.isIgnored
                        ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed rounded-full opacity-50"
                        : "bg-[#F8DEDE] text-[#B94444] rounded-full"
                    }`}
                  >
                    {req.status === "interested" ? "Interested" : "Interest"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirm({ requestId: req._id, providerId: null });
                    }}
                    disabled={req.status === "interested" || req.isIgnored}
                    className={`text-center px-3 py-1 rounded flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                      req.status === "interested" || req.isIgnored
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-full"
                        : "bg-[#D8D6F8] text-[#59549F] rounded-full"
                    }`}
                  >
                    {req.isIgnored ? "Ignored" : "Ignore"}
                  </button>

                  {showConfirm.requestId === req._id &&
                    showConfirm.providerId === null && (
                      <div className="absolute bg-white shadow-lg rounded-lg mt-17 border w-24 z-50 ">
                        <div className="flex flex-col items-center rounded-lg gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIgnore(req._id);
                            }}
                            className="bg-[#F8DEDE] text-[#B94444] px-3 py-1 rounded-full text-xs w-full shadow-[inset_0_0_12px_#00000040]"
                          >
                            Yes
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowConfirm({
                                requestId: null,
                                providerId: null,
                              });
                            }}
                            className="bg-white text-[#001032] px-3 py-1 rounded-full text-xs w-full shadow-[inset_0_0_12px_#00000040]"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="h-130 lg:h-123 overflow-y-auto scrollbar-hide">
        {forwardedRequests.map((req) => (
          <div
            key={req._id}
            onClick={() => handleRequestClick(req)}
            className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer"
          >
            <div className="flex items-center justify-center p-3 shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200"></div>
            </div>
            <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
            <div className="flex items-center justify-between w-full px-3 py-3">
              <div className="min-w-0 flex-1 pr-2">
                <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">
                  {req.service}
                </h1>
                <p className="text-[#001032] text-xs line-clamp-1 mt-1">
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

              <div className="flex flex-col items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInterest(req._id);
                  }}
                  disabled={req.status === "interested" || req.isIgnored}
                  className={`text-center px-2 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                    req.status === "interested" || req.isIgnored
                      ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed opacity-50"
                      : "bg-[#F8DEDE] text-[#B94444]"
                  }`}
                >
                  {req.status === "interested" ? "Interested" : "Interest"}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm({ requestId: req._id, providerId: null });
                  }}
                  disabled={req.status === "interested" || req.isIgnored}
                  className={`text-center px-3 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                    req.status === "interested" || req.isIgnored
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#D8D6F8] text-[#59549F]"
                  }`}
                >
                  {req.isIgnored ? "Ignored" : "Ignore"}
                </button>

                {showConfirm.requestId === req._id &&
                  showConfirm.providerId === null &&
                  req.status !== "interested" &&
                  !req.isIgnored && (
                    <div className="absolute bg-white shadow-lg rounded-lg mt-17 border w-24 z-50">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIgnore(req._id);
                          }}
                          className="bg-[#F8DEDE] text-[#B94444] px-3 py-1 rounded-full text-xs w-full shadow-[inset_0_0_12px_#00000040]"
                        >
                          Yes
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowConfirm({
                              requestId: null,
                              providerId: null,
                            });
                          }}
                          className="bg-white text-[#001032] px-3 py-1 rounded-full text-xs shadow-[inset_0_0_12px_#00000040]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        ))}

        {myInterestedRequests.length > 0 && (
          <div>
            {myInterestedRequests.map((req) =>
              req.interestedBy.map((user) => {
                const isAccepted = req.acceptedProvider && 
                  (typeof req.acceptedProvider === 'string' 
                    ? req.acceptedProvider === user._id 
                    : req.acceptedProvider.toString() === user._id.toString());
                
                return (
                  <div
                    key={user._id}
                    className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer"
                  >
                    <div className="flex items-center justify-center p-3 shrink-0">
                      <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200"></div>
                    </div>
                    <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>

                    <div className="flex items-center justify-between w-full px-3 py-3">
                      <div className="min-w-0 flex-1 pr-2">
                        <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">
                          {req.service}
                        </h1>
                        <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                          {req.description}
                        </p>

                        {req.createdAt && (
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(req.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                            {" • "}
                            {new Date(req.createdAt).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        )}
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        {isAccepted ? (
                          <button
                            className="bg-[#D5D5D5] text-[#434343] px-5 py-1 rounded-full flex items-center gap-1 text-sm shadow-[inset_0_0_12px_#00000040]"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/deal`);
                            }}
                          >
                            Deal
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAccept(req._id, user._id);
                              }}
                              className="bg-[#D8D6F8] text-[#59549F] text-center px-3 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-24 shadow-[inset_0_0_12px_#00000040]"
                            >
                               Accept
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowConfirm({
                                  requestId: req._id,
                                  providerId: user._id,
                                });
                              }}
                              className="bg-[#F8DEDE] text-[#B94444] text-center px-3 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-24 shadow-[inset_0_0_12px_#00000040]"
                            >
                              Ignore
                            </button>

                            {showConfirm.requestId === req._id &&
                              showConfirm.providerId === user._id && (
                                <div className="absolute bg-white shadow-lg rounded-lg mt-2 border w-28 z-50">
                                  <div className="flex flex-col items-center gap-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleIgnore(req._id, user._id);
                                      }}
                                      className="bg-[#F8DEDE] text-[#B94444] px-3 py-1 rounded-full text-xs w-full shadow-[inset_0_0_12px_#00000040]"
                                    >
                                      Yes
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowConfirm({
                                          requestId: null,
                                          providerId: null,
                                        })
                                      }}
                                      className="bg-[#FFFFFF] text-[#001032] px-3 py-1 rounded-full text-xs shadow-[inset_0_0_12px_#00000040]"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceivedTabSec;