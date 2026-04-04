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
  decrementUnseenCount,
}) => {
  const [forwardedRequests, setForwardedRequests] = useState([]);
  const [myInterestedRequests, setMyInterestedRequests] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    requestId: null,
    providerId: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getRaiserProfile = (req) => {
    if (req.raisedBy) {
      const raiserId = typeof req.raisedBy === 'string' ? req.raisedBy : req.raisedBy._id;
      return profiles.find(p => p.userId?._id === raiserId || p.userId === raiserId);
    }
    return null;
  };

  useEffect(() => {
  const fetchReceivedRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const [res, profileRes] = await Promise.all([
        axios.get(`${serverUrl}/requests/received`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${serverUrl}/profile/all`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ]);

      setProfiles(profileRes.data);
      setForwardedRequests(res.data.forwardedRequests);
      setMyInterestedRequests(res.data.myInterestedRequests);

      // NEW: Update selectedRequest if it exists and matches a fetched request
      if (selectedRequest) {
        const updatedRequest = 
          res.data.forwardedRequests.find(req => req._id === selectedRequest._id) ||
          res.data.myInterestedRequests.find(req => req._id === selectedRequest._id);
        
        if (updatedRequest) {
          setSelectedRequest({ 
            ...updatedRequest, 
            viewType: selectedRequest.viewType,
            professionalData: selectedRequest.professionalData 
          });
        }
      }
    } catch (err) {
      console.error("Error fetching received requests:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchReceivedRequests();
}, []); // Keep dependency array empty - only run on mount

  const handleRequestClick = async (req, viewType = 'request') => {
    setSelectedRequest({ ...req, viewType });
    setShowDetails(true);
    setMobileView("right");

    if (!req.isSeen) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`${serverUrl}/requests/mark-seen/${req._id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setForwardedRequests(prev => prev.map(r => r._id === req._id ? { ...r, isSeen: true } : r));
        setMyInterestedRequests(prev => prev.map(r => r._id === req._id ? { ...r, isSeen: true } : r));

        if (decrementUnseenCount) {
          decrementUnseenCount();
        }
      } catch (err) {
        console.error("Error marking request as seen:", err);
      }
    }
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedRequest(null);
    setMobileView("left");
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const publicBaseUrl = "https://pub-cb99bea3292949639f304d67adc5d74e.r2.dev";
    const privateBaseUrl = `https://copteno.c2fc1593db66d893ceff4e23d571cfb6.r2.cloudflarestorage.com`;
    if (imageUrl.startsWith(privateBaseUrl)) {
      return imageUrl.replace(privateBaseUrl, publicBaseUrl);
    }
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${serverUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
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

      setForwardedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, status: "interested", hasShownInterest: true }
            : req
        )
      );

      setSelectedRequest((prev) =>
        prev && prev._id === requestId
          ? { ...prev, status: "interested", hasShownInterest: true }
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

      setMyInterestedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, acceptedProvider: providerId, status: "accepted" }
            : req,
        ),
      );

      setSelectedRequest((prev) =>
        prev && prev._id === requestId
          ? { ...prev, acceptedProvider: providerId, status: "accepted" }
          : prev
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

        setSelectedRequest((prev) =>
          prev && prev._id === requestId
            ? {
                ...prev,
                interestedBy: prev.interestedBy.filter(
                  (user) => user._id !== providerId
                ),
              }
            : prev
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

  const hasNoRequests = 
    forwardedRequests.length === 0 && 
    myInterestedRequests.length === 0;

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

  if (hasNoRequests && !loading) {
    return (
      <div className="h-130 lg:h-123 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-8 text-center border border-gray-300 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-xl bg-white">
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2 ">
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
          <div className="flex items-center justify-between mb-4 pb-3 border-b shrink-0">
            <h2 className="text-lg font-semibold text-[#001032]">
              {selectedRequest.viewType === 'profile' ? 'Professional Profile' : 'Request Details'}
            </h2>
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoMdClose size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="space-y-4">
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

              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Service Type
                </h4>
                <p className="text-xs text-[#001032]">
                  {selectedRequest.service}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Description
                </h4>
                <p className="text-xs text-[#001032] leading-relaxed">
                  {selectedRequest.description}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Status
                </h4>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {selectedRequest.hasShownInterest ? "Interested" : "Forwarded"}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">
                  Request ID
                </h4>
                <p className="text-[10px] text-gray-700 font-mono break-all">
                  {selectedRequest._id || selectedRequest.id || "N/A"}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleInterest(selectedRequest._id)}
                  disabled={selectedRequest.hasShownInterest || selectedRequest.isIgnored}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                    selectedRequest.hasShownInterest || selectedRequest.isIgnored
                      ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed rounded-full opacity-50"
                      : "bg-[#F8DEDE] text-[#B94444] rounded-full"
                  }`}
                >
                  {selectedRequest.hasShownInterest ? "Interested" : "Interest"}
                </button>
                <button
                  onClick={() =>
                    setShowConfirm({
                      requestId: selectedRequest._id,
                      providerId: null,
                    })
                  }
                  disabled={selectedRequest.hasShownInterest || selectedRequest.isIgnored}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                    selectedRequest.hasShownInterest || selectedRequest.isIgnored
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-full"
                      : "bg-[#D8D6F8] text-[#59549F] rounded-full"
                  }`}
                >
                  {selectedRequest.isIgnored ? "Ignored" : "Ignore"}
                </button>
              </div>

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

        {/* Desktop List View - Always show on desktop */}
        <div className="hidden md:block h-130 lg:h-123 overflow-y-auto scrollbar-hide">
          {forwardedRequests.map((req) => {
            const raiserProfile = getRaiserProfile(req);
            const raiserName = raiserProfile?.name || req.raisedBy?.name || 'Requester Name';

            return (
              <div
                key={req._id}
                onClick={() => handleRequestClick(req, 'request')}
                className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer"
              >
                <div className="flex items-center justify-center p-3 shrink-0">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                    {raiserProfile?.profilePhoto ? (
                      <img src={getImageUrl(raiserProfile.profilePhoto) || ""} alt="" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <span className="text-xl font-bold text-gray-600">
                        {raiserName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                <div className="flex items-center justify-between w-full px-3 py-3">
                  <div className="min-w-0 flex-1 pr-2">
                    <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">
                      {raiserName}
                    </h1>
                    <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                      {req.service}
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
                      disabled={req.hasShownInterest || req.isIgnored}
                      className={`px-2 py-1 rounded flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                        req.hasShownInterest || req.isIgnored
                          ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed rounded-full opacity-50"
                          : "bg-[#F8DEDE] text-[#B94444] rounded-full"
                      }`}
                    >
                      {req.hasShownInterest ? "Interested" : "Interest"}
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowConfirm({ requestId: req._id, providerId: null });
                      }}
                      disabled={req.hasShownInterest || req.isIgnored}
                      className={`text-center px-3 py-1 rounded flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                        req.hasShownInterest || req.isIgnored
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
            );
          })}

          {/* Interested professionals cards */}
          {myInterestedRequests.length > 0 && (
            <div>
              {myInterestedRequests.map((req) =>
                req.interestedBy.map((user) => {
                  const isAccepted = req.acceptedProvider && 
                    (typeof req.acceptedProvider === 'string' 
                      ? req.acceptedProvider === user._id 
                      : req.acceptedProvider.toString() === user._id.toString());
                  
                  const userProfile = profiles.find(p => p.userId?._id === user._id || p.userId === user._id);
                  const displayName = userProfile?.name || user.name || 'Professional Name';

                  return (
                    <div
                      key={user._id}
                      onClick={() => {
                        console.log("Card clicked - Opening request with profile details");
                        handleRequestClick({...req, professionalData: user}, 'request');
                      }}
                      className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer"
                    >
                      <div className="flex items-center justify-center p-3 shrink-0">
                        <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                          {userProfile?.profilePhoto ? (
                            <img src={getImageUrl(userProfile.profilePhoto) || ""} alt="" className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <span className="text-xl font-bold text-gray-600">
                              {displayName.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>

                      <div className="flex items-center justify-between w-full px-3 py-3">
                        <div className="min-w-0 flex-1 pr-2">
                          {/* Show Professional Name instead of Service */}
                          <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">
                            {displayName}
                          </h1>
                          {/* Show Service Type instead of Description */}
                          <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                            {userProfile?.userId?.additionalDetails?.domain || req.service}
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
                                  console.log("Accept clicked");
                                  handleAccept(req._id, user._id);
                                }}
                                className="bg-[#D8D6F8] text-[#59549F] text-center px-3 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-24 shadow-[inset_0_0_12px_#00000040]"
                              >
                                 Accept
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("Ignore clicked");
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
                                  <div 
                                    className="absolute bg-white shadow-lg rounded-lg mt-2 border w-28 z-50"
                                    onClick={(e) => e.stopPropagation()}
                                  >
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
      </>
    );
  }

  return (
    <div>
      <div className="h-130 lg:h-123 overflow-y-auto scrollbar-hide">
        {forwardedRequests.map((req) => {
          const raiserProfile = getRaiserProfile(req);
          const raiserName = raiserProfile?.name || req.raisedBy?.name || 'Requester Name';

          return (
            <div
              key={req._id}
              onClick={() => handleRequestClick(req, 'request')}
              className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer"
            >
              <div className="flex items-center justify-center p-3 shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                  {raiserProfile?.profilePhoto ? (
                    <img src={getImageUrl(raiserProfile.profilePhoto) || ""} alt="" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">
                      {raiserName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
              <div className="flex items-center justify-between w-full px-3 py-3">
                <div className="min-w-0 flex-1 pr-2">
                  <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">
                    {raiserName}
                  </h1>
                  <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                    {req.service}
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
                    disabled={req.hasShownInterest || req.isIgnored}
                    className={`text-center px-2 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                      req.hasShownInterest || req.isIgnored
                        ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed opacity-50"
                        : "bg-[#F8DEDE] text-[#B94444]"
                    }`}
                  >
                    {req.hasShownInterest ? "Interested" : "Interest"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirm({ requestId: req._id, providerId: null });
                    }}
                    disabled={req.hasShownInterest || req.isIgnored}
                    className={`text-center px-3 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-20 shadow-[inset_0_0_12px_#00000040] ${
                      req.hasShownInterest || req.isIgnored
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#D8D6F8] text-[#59549F]"
                    }`}
                  >
                    {req.isIgnored ? "Ignored" : "Ignore"}
                  </button>

                  {showConfirm.requestId === req._id &&
                    showConfirm.providerId === null &&
                    !req.hasShownInterest &&
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
          );
        })}

       {/* Interested professionals cards */}
{myInterestedRequests.length > 0 && (
  <div>
    {myInterestedRequests.map((req) =>
      req.interestedBy.map((user) => {
        const isAccepted = req.acceptedProvider && 
          (typeof req.acceptedProvider === 'string' 
            ? req.acceptedProvider === user._id 
            : req.acceptedProvider.toString() === user._id.toString());
        
        const userProfile = profiles.find(p => p.userId?._id === user._id || p.userId === user._id);
        const displayName = userProfile?.name || user.name || 'Professional Name';

        return (
          <div
            key={user._id}
            onClick={() => {
              console.log("Card clicked - Opening request with profile details");
              handleRequestClick({...req, professionalData: user}, 'request');
            }}
            className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer"
          >
            <div className="flex items-center justify-center p-3 shrink-0">
              <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                {userProfile?.profilePhoto ? (
                  <img src={getImageUrl(userProfile.profilePhoto) || ""} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-xl font-bold text-gray-600">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>

            <div className="flex items-center justify-between w-full px-3 py-3">
              <div className="min-w-0 flex-1 pr-2">
                {/* Show Professional Name instead of Service */}
                <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">
                  {displayName}
                </h1>
                {/* Show Service Type instead of Description */}
                <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                  {userProfile?.userId?.additionalDetails?.domain || req.service}
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
                        console.log("Accept clicked");
                        handleAccept(req._id, user._id);
                      }}
                      className="bg-[#D8D6F8] text-[#59549F] text-center px-3 py-1 rounded-full flex items-center justify-center gap-1 text-sm w-24 shadow-[inset_0_0_12px_#00000040]"
                    >
                       Accept
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Ignore clicked");
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
                        <div 
                          className="absolute bg-white shadow-lg rounded-lg mt-2 border w-28 z-50"
                          onClick={(e) => e.stopPropagation()}
                        >
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