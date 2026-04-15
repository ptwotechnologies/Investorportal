import { serverUrl } from "@/App";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const AllTabSec = ({ setSelectedRequest, selectedRequest, setMobileView, setAllHandlers, triggerUpgradeModal }) => {
  const [forwardedRequests, setForwardedRequests] = useState([]);
  const [raisedRequests, setRaisedRequests] = useState([]);
  const [myInterestedRequests, setMyInterestedRequests] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    requestId: null,
    providerId: null,
    origin: null,
  });
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState(null);
  const [interestCount, setInterestCount] = useState(0);
  const [ignoreCount, setIgnoreCount] = useState(0);
  const [interestSurvey, setInterestSurvey] = useState({
    requestId: null,
    startTime: "",
    relevance: "",
  });

  const navigate = useNavigate();

  const getRaiserProfile = (req) => {
    const raiserId = req.raisedBy?._id || req.raisedBy || req.userId?._id || req.userId;
    if (raiserId) {
      return profiles.find(p => (p.userId?._id || p.userId) === raiserId);
    }
    return null;
  };

  useEffect(() => {
    const fetchAllRequests = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        
        const userId = localStorage.getItem("userId");
        const isValidUserId = userId && userId !== "null" && userId !== "undefined" && userId.length === 24;
        
        const [receivedRes, raisedRes, profileRes, userRes] = await Promise.all([
          axios.get(`${serverUrl}/requests/received`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${serverUrl}/requests`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${serverUrl}/profile/all`, { headers: { Authorization: `Bearer ${token}` } }),
          isValidUserId 
            ? axios.get(`${serverUrl}/user/${userId}`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: { plan: null } }))
            : Promise.resolve({ data: { plan: null } }),
        ]);

        const forwarded = receivedRes.data.forwardedRequests;
        const myInterested = receivedRes.data.myInterestedRequests;
        const raised = raisedRes.data;

        setProfiles(profileRes.data);
        setForwardedRequests(forwarded);
        setMyInterestedRequests(myInterested);
        setRaisedRequests(raised);

        const planName = userRes.data.plan?.planName || "Explorer Access";
        setUserPlan(planName);

        const alreadyInterestedCount = receivedRes.data.forwardedRequests.filter(
          (r) => r.hasShownInterest,
        ).length;
        setInterestCount(alreadyInterestedCount);

        const alreadyIgnoredCount = receivedRes.data.forwardedRequests.filter(
          (r) => r.isIgnored,
        ).length;
        setIgnoreCount(alreadyIgnoredCount);

        if (selectedRequest) {
          const updatedRequest = 
            forwarded.find(req => req._id === selectedRequest._id) ||
            myInterested.find(req => req._id === selectedRequest._id) ||
            raised.find(req => req._id === selectedRequest._id);
          
          if (updatedRequest) {
            setSelectedRequest({ 
              ...updatedRequest, 
              requestType: selectedRequest.requestType,
              viewType: selectedRequest.viewType,
              professionalData: selectedRequest.professionalData 
            });
          }
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllRequests();
  }, []);

  const handleRequestClick = (req, type, viewType = 'request') => {
    setSelectedRequest({ ...req, requestType: type, viewType });
    setShowDetails(true);
    setMobileView("right");
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedRequest(null);
    setMobileView("left");
  };

  const handleInterest = useCallback(async (requestId, startTime = "N/A", relevance = "N/A") => {
    // Find the request to check its current status
    const targetReq = forwardedRequests.find(r => r._id === requestId);
    if (targetReq?.hasShownInterest || targetReq?.isIgnored) {
      return; // Already in a final state, do nothing
    }

    const isFreePlan = userPlan === "Explorer Access" || !userPlan;
    if (isFreePlan && (interestCount + ignoreCount) >= 1) {
      triggerUpgradeModal("interest");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${serverUrl}/requests/interested/${requestId}`,
        { startTime, relevance },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setForwardedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? {
                ...req,
                status: "interested",
                interestedBy: [...(req.interestedBy || []), { _id: "you" }],
                hasShownInterest: true,
              }
            : req,
        ),
      );

      setSelectedRequest((prev) =>
        prev && prev._id === requestId
          ? {
              ...prev,
              status: "interested",
              interestedBy: [...(prev.interestedBy || []), { _id: "you" }],
              hasShownInterest: true,
            }
          : prev,
      );

      setInterestCount((prev) => prev + 1);
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.limitReached) {
        triggerUpgradeModal("interest");
      } else {
        console.error("Error marking interest:", err);
      }
    }
  }, [userPlan, interestCount, triggerUpgradeModal]);

  const handleIgnore = useCallback(async (requestId, providerId = null) => {
    if (providerId) {
      // Buyer ignoring a professional's interest
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `${serverUrl}/requests/ignore`,
          { requestId, providerId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

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
                  (user) => user._id !== providerId,
                ),
              }
            : prev,
        );
      } catch (err) {
        console.error("Error ignoring professional:", err);
      }
    } else {
      // Provider ignoring a forwarded request
      // Find the request to check its current status
      const targetReq = forwardedRequests.find(r => r._id === requestId);
      if (targetReq?.hasShownInterest || targetReq?.isIgnored) {
        return; // Already in a final state, do nothing
      }

      const isFreePlan = userPlan === "Explorer Access" || !userPlan;
      if (isFreePlan && (interestCount + ignoreCount) >= 1) {
        triggerUpgradeModal("interest");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `${serverUrl}/requests/ignore`,
          { requestId, providerId: null },
          { headers: { Authorization: `Bearer ${token}` } }
        );

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

        setIgnoreCount((prev) => prev + 1);
      } catch (err) {
        if (err.response?.status === 403 && err.response?.data?.limitReached) {
          triggerUpgradeModal("interest");
        } else {
          console.error("Error ignoring request:", err);
        }
      }
    }
    
    setShowConfirm({
      requestId: null,
      providerId: null,
      origin: null,
    });
  }, [userPlan, ignoreCount, triggerUpgradeModal]);

  const handleAccept = useCallback(async (requestId, providerId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${serverUrl}/requests/accept`,
        { requestId, providerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMyInterestedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, acceptedProvider: providerId, status: "accepted" }
            : req
        )
      );

      setSelectedRequest((prev) =>
        prev && prev._id === requestId
          ? { ...prev, acceptedProvider: providerId, status: "accepted" }
          : prev
      );
    } catch (err) {
      console.error("Error accepting provider:", err);
    }
  }, []);

  useEffect(() => {
    if (setAllHandlers) {
      setAllHandlers((prev) => {
        // Only update if references have actually changed
        if (
          prev.handleInterest === handleInterest &&
          prev.handleIgnore === handleIgnore &&
          prev.handleAccept === handleAccept &&
          prev.showConfirm === showConfirm &&
          prev.interestSurvey === interestSurvey
        ) {
          return prev;
        }
        return {
          handleInterest,
          handleIgnore,
          handleAccept,
          showConfirm,
          setShowConfirm,
          interestSurvey,
          setInterestSurvey,
        };
      });
    }
  }, [
    showConfirm,
    setShowConfirm,
    setAllHandlers,
    handleInterest,
    handleIgnore,
    handleAccept,
    interestSurvey,
    setInterestSurvey,
  ]);

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

  const hasNoRequests = 
    forwardedRequests.length === 0 && 
    raisedRequests.length === 0 && 
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
      <div className="h-130 lg:h-123 flex items-center justify-center ">
        <div className="flex flex-col items-center gap-4 p-8 text-center  border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md">
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
          <div >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No Requests to Show
            </h3>
            <p className="text-sm text-gray-500">
              Click on "New Request" to raise one
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showDetails && selectedRequest) {
    const raiserProfile = getRaiserProfile(selectedRequest);
    const raiserName = raiserProfile ? (raiserProfile.name || raiserProfile.email) : (selectedRequest.raisedBy?.name || selectedRequest.userId?.name || selectedRequest.raisedBy?.email || "User");

    return (
      <>
        {/* Mobile Detail View */}
        <div className="md:hidden w-full h-full flex flex-col p-2 bg-white rounded-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b shrink-0">
            <h2 className="text-lg font-semibold text-[#001032]">Request Details</h2>
            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <IoMdClose size={24} className="text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {raiserProfile?.profilePhoto ? (
                    <img src={getImageUrl(raiserProfile.profilePhoto)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">{raiserName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-[#001032] line-clamp-2">{raiserName}</h3>
                  {selectedRequest.createdAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(selectedRequest.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">Service Type</h4>
                <p className="text-xs text-[#001032]">{selectedRequest.service}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">Description</h4>
                <p className="text-xs text-[#001032] leading-relaxed">{selectedRequest.description}</p>
              </div>

              <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-xs font-semibold text-gray-600 mb-1">Status</h4>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  selectedRequest.hasShownInterest
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedRequest.hasShownInterest ? "Interested" : "Pending"}
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

              {/* Application Details (Survey Answers) - Mobile */}
              {(() => {
                const professionalId = selectedRequest.professionalData?._id || selectedRequest.professionalData;
                const interestInfo = selectedRequest.interestDetails?.find(id => 
                  String(id.user?._id || id.user) === String(professionalId)
                );
                if (interestInfo) {
                  return (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                        <h4 className="text-xs font-semibold text-gray-600 mb-1">Availability</h4>
                        <p className="text-xs text-[#001032] font-semibold">{interestInfo.startTime || 'Standard'}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                        <h4 className="text-xs font-semibold text-gray-600 mb-1">Relevance</h4>
                        <p className="text-xs text-[#001032] font-semibold">{interestInfo.relevance || 'N/A'}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Action Buttons for Forwarded Requests (Professional View) */}
              {!selectedRequest.professionalData && selectedRequest.requestType === "forwarded" && (
                <>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleInterest(selectedRequest._id)}
                      disabled={selectedRequest.hasShownInterest || selectedRequest.isIgnored}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                        selectedRequest.hasShownInterest ||
                        selectedRequest.isIgnored
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
                          origin: 'detail',
                        })
                      }
                      disabled={selectedRequest.hasShownInterest || selectedRequest.isIgnored}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                        selectedRequest.hasShownInterest ||
                        selectedRequest.isIgnored
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded-full"
                          : "bg-[#D8D6F8] text-[#59549F] rounded-full"
                      }`}
                    >
                      {selectedRequest.isIgnored ? "Ignored" : "Ignore"}
                    </button>
                  </div>

                  {showConfirm.requestId === selectedRequest._id &&
                    showConfirm.providerId === null && 
                    showConfirm.origin === 'detail' && (
                      <div className="bg-white shadow-lg rounded-lg p-3 border mt-2">
                        <p className="text-sm text-gray-700 mb-3">
                          Are you sure you want to ignore this request?
                        </p>
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
                                origin: null,
                              })
                            }
                            className="bg-white text-[#001032] px-3 py-1 rounded-full text-xs w-full shadow-[inset_0_0_12px_#00000040]"
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

        {/* Desktop List View - Always show on desktop */}
        <div className="hidden md:block h-130 lg:h-123 overflow-y-auto scrollbar-hide">
          {/* Forwarded Requests Section */}
          {forwardedRequests.map((req) => {
            const raiserProfile = getRaiserProfile(req);
            const raiserName = raiserProfile ? (raiserProfile.name || raiserProfile.email) : (req.raisedBy?.name || req.userId?.name || req.raisedBy?.email || "User");
            return (
              <div key={req._id} className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
                <div onClick={() => handleRequestClick(req, 'forwarded')} className="flex items-stretch flex-1 min-w-0">
                  <div className="flex items-center justify-center p-3 shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                      {raiserProfile?.profilePhoto ? (
                        <img src={getImageUrl(raiserProfile.profilePhoto)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl font-bold text-gray-600">{raiserName.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                  <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                  <div className="flex-1 min-w-0 px-3 py-3">
                    <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">{raiserName}</h1>
                    <p className="text-[#001032] text-xs line-clamp-1 mt-1">{req.service}</p>
                    {req.createdAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {" • "}{new Date(req.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Raised Requests Section */}
          {raisedRequests.map((req) => (
            <div key={req._id} onClick={() => handleRequestClick(req, 'raised')} className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
              <div className="flex items-center justify-center p-3 shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                  <span className="text-xl font-bold text-gray-600">{(req.service || "U").charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
              <div className="flex-1 min-w-0 px-3 py-3">
                <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">{req.service}</h1>
                <p className="text-[#001032] text-xs line-clamp-1 mt-1">{req.description}</p>
                {req.createdAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" • "}{new Date(req.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* My Interested Requests Section */}
          {myInterestedRequests.map((req) =>
            req.interestedBy.map((user) => {
              const isAccepted = req.acceptedProvider === user._id;
              const userProfile = profiles.find(p => {
                const pUserId = (p.userId?._id || p.userId)?.toString();
                const targetUserId = (user._id || user)?.toString();
                return pUserId === targetUserId;
              });
              const displayName = 
                userProfile?.name || 
                user.name || 
                (user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "") ||
                (userProfile?.userId?.firstName || userProfile?.userId?.lastName ? `${userProfile.userId.firstName || ""} ${userProfile.userId.lastName || ""}`.trim() : "") ||
                user.email ||
                (userProfile?.userId?.email) || 
                "Professional";
              return (
                <div key={`${req._id}-${user._id}`} onClick={() => handleRequestClick({...req, professionalData: user}, 'interested', 'request')} className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
                  <div className="flex items-center justify-center p-3 shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                      {userProfile?.profilePhoto ? (
                        <img src={getImageUrl(userProfile.profilePhoto)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl font-bold text-gray-600">{displayName.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                  <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                  <div className="flex items-center justify-between w-full pr-4 px-3 py-3">
                    <div className="min-w-0 flex-1 pr-2">
                      <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">{displayName}</h1>
                      <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                        {userProfile?.userId?.additionalDetails?.domain || req.service}
                      </p>
                      {req.createdAt && (
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          {" • "}{new Date(req.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }

  return (
    <div className="h-130 lg:h-123 overflow-y-auto scrollbar-hide">
      {/* Forwarded Requests Section */}
      {forwardedRequests.map((req) => {
        const raiserProfile = getRaiserProfile(req);
        const raiserName = raiserProfile ? (raiserProfile.name || raiserProfile.email) : (req.raisedBy?.name || req.userId?.name || req.raisedBy?.email || "User");
        return (
          <div key={req._id} className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
            <div onClick={() => handleRequestClick(req, 'forwarded')} className="flex items-stretch flex-1 min-w-0">
              <div className="flex items-center justify-center p-3 shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                  {raiserProfile?.profilePhoto ? (
                    <img src={getImageUrl(raiserProfile.profilePhoto)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">{raiserName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </div>
              <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
              <div className="flex-1 min-w-0 px-3 py-3">
                <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">{raiserName}</h1>
                <p className="text-[#001032] text-xs line-clamp-1 mt-1">{req.service}</p>
                {req.createdAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    {" • "}{new Date(req.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Raised Requests Section */}
      {raisedRequests.map((req) => (
        <div key={req._id} onClick={() => handleRequestClick(req, 'raised')} className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
          <div className="flex items-center justify-center p-3 shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
              <span className="text-xl font-bold text-gray-600">{(req.service || "U").charAt(0).toUpperCase()}</span>
            </div>
          </div>
          <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
          <div className="flex-1 min-w-0 px-3 py-3">
            <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">{req.service}</h1>
            <p className="text-[#001032] text-xs line-clamp-1 mt-1">{req.description}</p>
            {req.createdAt && (
              <p className="text-xs text-gray-500 mt-2">
                {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                {" • "}{new Date(req.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* My Interested Requests Section */}
      {myInterestedRequests.map((req) =>
        req.interestedBy.map((user) => {
          const isAccepted = req.acceptedProvider === user._id;
          const userProfile = profiles.find(p => {
            const pUserId = (p.userId?._id || p.userId)?.toString();
            const targetUserId = (user._id || user)?.toString();
            return pUserId === targetUserId;
          });
          const displayName = 
            userProfile?.name || 
            user.name || 
            (user.firstName || user.lastName ? `${user.firstName || ""} ${user.lastName || ""}`.trim() : "") ||
            (userProfile?.userId?.firstName || userProfile?.userId?.lastName ? `${userProfile.userId.firstName || ""} ${userProfile.userId.lastName || ""}`.trim() : "") ||
            user.email ||
            (userProfile?.userId?.email) || 
            "Professional";
          return (
            <div key={`${req._id}-${user._id}`} onClick={() => handleRequestClick({...req, professionalData: user}, 'interested', 'request')} className="flex items-stretch mb-1 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-22 cursor-pointer">
              <div className="flex items-center justify-center p-3 shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
                  {userProfile?.profilePhoto ? (
                    <img src={getImageUrl(userProfile.profilePhoto)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-gray-600">{displayName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </div>
              <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
              <div className="flex items-center justify-between w-full pr-4 px-3 py-3">
                <div className="min-w-0 flex-1 pr-2">
                  <h1 className="text-[#001032] font-semibold text-sm line-clamp-1">{displayName}</h1>
                  <p className="text-[#001032] text-xs line-clamp-1 mt-1">
                    {userProfile?.userId?.additionalDetails?.domain || req.service}
                  </p>
                  {req.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {" • "}{new Date(req.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllTabSec;