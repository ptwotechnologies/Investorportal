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
}) => {
  const [forwardedRequests, setForwardedRequests] = useState([]);
  const [myInterestedRequests, setMyInterestedRequests] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    requestId: null,
    providerId: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/requests/received`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForwardedRequests(res.data.forwardedRequests);
        setMyInterestedRequests(res.data.myInterestedRequests);
      } catch (err) {
        console.error("Error fetching received requests:", err);
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
        },
      );

      // local state update for UI
      setForwardedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, interestedBy: [...req.interestedBy, { _id: "you" }] }
            : req,
        ),
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
                  Forwarded
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
                  className="flex-1 bg-[#108349] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#0d6b3a] transition-colors flex items-center justify-center gap-1"
                >
                  <FaCheckCircle /> Interested
                </button>
                <button
                  onClick={() =>
                    setShowConfirm({
                      requestId: selectedRequest._id,
                      providerId: null,
                    })
                  }
                  className="flex-1 bg-[#BA1E1E] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#a01818] transition-colors flex items-center justify-center gap-1"
                >
                  <FaTimesCircle /> Ignore
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop List View - Always show on desktop even when showDetails is true */}
        <div className="hidden md:block h-130 lg:h-123 overflow-y-auto scrollbar-hide">
          {forwardedRequests.map((req) => (
            <div
              key={req._id}
              onClick={() => handleRequestClick(req)}
              className="flex items-center  gap-3 mb-2 rounded-lg  bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25"
            >
              <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
              <div className="w-0.5 h-full p-0 bg-[#0010324D] "></div>
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  px-2">
                  <div className="my-3   ">
                    <h1 className="text-[#001032] font-semibold text-sm">
                      {req.service}
                    </h1>
                    <p className="text-[#001032]  text-xs">{req.description}</p>

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

                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInterest(req._id);
                    }}
                    className="bg-[#108349] text-white px-2 py-1 rounded flex items-center gap-1 text-sm w-24"
                  >
                    <FaCheckCircle /> Interested
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirm({ requestId: req._id, providerId: null });
                    }}
                    className="bg-[#BA1E1E] text-white px-3 py-1 rounded flex items-center gap-1 text-sm  w-24"
                  >
                    <FaTimesCircle /> Ignore
                  </button>

                  {showConfirm.requestId === req._id &&
                    showConfirm.providerId === null && (
                      <div className="absolute bg-white shadow-lg rounded-lg mt-17 border w-24 z-50">
                        <div className="flex flex-col items-center ">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIgnore(req._id);
                              setShowConfirm({
                                requestId: null,
                                providerId: null,
                              });
                            }}
                            className="bg-[#AA2323] text-white px-3 py-1 rounded-full text-xs w-full"
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
                            className="bg-white text-black px-3 py-1 rounded-full text-xs"
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
            className="flex items-center  gap-3 mb-2 rounded-lg  bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25"
          >
            <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
            <div className="w-0.5 h-full p-0 bg-[#0010324D] "></div>
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full  px-2">
                <div className="my-3   ">
                  <h1 className="text-[#001032] font-semibold text-sm">
                    {req.service}
                  </h1>
                  <p className="text-[#001032]  text-xs">{req.description}</p>

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

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInterest(req._id);
                  }}
                  className="bg-[#108349] text-white px-2 py-1 rounded flex items-center gap-1 text-sm w-24"
                >
                  <FaCheckCircle /> Interested
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirm({ requestId: req._id, providerId: null });
                  }}
                  className="bg-[#BA1E1E] text-white px-3 py-1 rounded flex items-center gap-1 text-sm  w-24"
                >
                  <FaTimesCircle /> Ignore
                </button>

                {showConfirm.requestId === req._id &&
                  showConfirm.providerId === null && (
                    <div className="absolute bg-white shadow-lg rounded-lg mt-17 border w-24 z-50">
                      <div className="flex flex-col items-center ">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIgnore(req._id);
                            setShowConfirm({
                              requestId: null,
                              providerId: null,
                            });
                          }}
                          className="bg-[#AA2323] text-white px-3 py-1 rounded-full text-xs w-full"
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
                          className="bg-white text-black px-3 py-1 rounded-full text-xs"
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
                const isAccepted = req.acceptedProvider === user._id; // ✅ check if this user is accepted
                return (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 mb-2 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25"
                  >
                    <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
                    <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>

                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center justify-between lg:gap-x-3 gap-x-2 w-full px-2">
                        <div className="my-3">
                          <h1 className="text-[#001032] font-semibold text-sm">
                            {req.service}
                          </h1>
                          <p className="text-[#001032] text-xs">
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
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col items-center gap-2">
                        {isAccepted ? (
                          // Show Deal button instead of Accept
                          <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1 text-sm w-24"
                            onClick={() => navigate(`/deal`)}
                          >
                            Deal
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleAccept(req._id, user._id)}
                              className="bg-[#108349] text-white px-3 py-1 rounded flex items-center gap-1 text-sm w-24"
                            >
                              <FaCheckCircle /> Accept
                            </button>
                            <button
                              onClick={() =>
                                setShowConfirm({
                                  requestId: req._id,
                                  providerId: user._id,
                                })
                              }
                              className="bg-[#BA1E1E] text-white px-3 py-1 rounded flex items-center gap-1 text-sm w-24"
                            >
                              <FaTimesCircle /> Ignore
                            </button>

                            {showConfirm.requestId === req._id &&
                              showConfirm.providerId === user._id && (
                                <div className="absolute bg-white shadow-lg rounded-lg mt-2 border w-28 z-50">
                                  <div className="flex flex-col items-center">
                                    <button
                                      onClick={() => {
                                        handleIgnore(req._id, user._id);
                                        setShowConfirm({
                                          requestId: null,
                                          providerId: null,
                                        });
                                      }}
                                      className="bg-[#AA2323] text-white px-3 py-1 rounded-full text-xs w-full"
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
                                      className="bg-white text-black px-3 py-1 rounded-full text-xs"
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
