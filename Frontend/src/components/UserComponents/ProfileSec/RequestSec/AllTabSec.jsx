import { serverUrl } from "@/App";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AllTabSec = ({ setSelectedRequest, selectedRequest, setMobileView }) => {
  const [forwardedRequests, setForwardedRequests] = useState([]);
  const [raisedRequests, setRaisedRequests] = useState([]);
  const [myInterestedRequests, setMyInterestedRequests] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirm, setShowConfirm] = useState({
    requestId: null,
    providerId: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch received requests
        const receivedRes = await axios.get(`${serverUrl}/requests/received`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Fetch raised requests
        const raisedRes = await axios.get(`${serverUrl}/requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setForwardedRequests(receivedRes.data.forwardedRequests);
        setMyInterestedRequests(receivedRes.data.myInterestedRequests);
        setRaisedRequests(raisedRes.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchAllRequests();
  }, []);

  const handleRequestClick = (req, type) => {
    setSelectedRequest({ ...req, requestType: type });
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setForwardedRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? { ...req, interestedBy: [...req.interestedBy, { _id: "you" }] }
            : req
        )
      );
    } catch (err) {
      console.error("Error marking interest:", err);
    }
  };

  const handleIgnore = async (requestId, providerId = null) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${serverUrl}/requests/ignore`,
        { requestId, providerId },
        { headers: { Authorization: `Bearer ${token}` } }
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
          prev.filter((req) => req._id !== requestId)
        );
      }
    } catch (err) {
      console.error("Error ignoring request:", err);
    }
  };

  const handleAccept = async (requestId, providerId) => {
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
                        }
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
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  selectedRequest.requestType === 'forwarded' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedRequest.requestType === 'forwarded' ? 'Forwarded' : 'Pending'}
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

              {selectedRequest.requestType === 'forwarded' ? (
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
              ) : (
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-[#1F9E61] text-white py-2 rounded-lg text-xs font-medium hover:bg-[#188c54] transition-colors">
                    Update Request
                  </button>
                  <button className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                    Cancel Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop List View */}
        <div className="hidden md:block h-130 lg:h-123 overflow-y-auto scrollbar-hide">
          {/* Forwarded Requests */}
          {forwardedRequests.map((req) => (
            <div
              key={req._id}
              className={`flex items-center gap-3 mb-2 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25  ${
                selectedRequest?._id === req._id ? " " : ""
              }`}
            >
              <div
                onClick={() => handleRequestClick(req, 'forwarded')}
                className="flex items-center gap-3 flex-1 cursor-pointer min-w-0"
              >
                <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
                <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                <div className="flex-1 min-w-0 px-2 my-3">
                  <h1 className="text-[#001032] font-semibold text-sm">
                    {req.service}
                  </h1>
                  <p className="text-[#001032] text-xs line-clamp-2">
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

              <div className="flex flex-col items-center gap-2 pr-4 shrink-0">
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
                  className="bg-[#BA1E1E] text-white px-3 py-1 rounded flex items-center gap-1 text-sm w-24"
                >
                  <FaTimesCircle /> Ignore
                </button>
                {showConfirm.requestId === req._id &&
                  showConfirm.providerId === null && (
                    <div className="absolute bg-white shadow-lg rounded-lg mt-17 border w-24 z-50">
                      <div className="flex flex-col items-center">
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
          ))}

          {/* Raised Requests */}
          {raisedRequests.map((req) => (
            <div
              key={req._id}
              className={`flex items-center gap-3 mb-2 rounded-lg bg-white  shadow-[inset_0_0_12px_#00000040] transition-all h-25   ${
                selectedRequest?._id === req._id ? "" : ""
              }`}
            >
              <div
                onClick={() => handleRequestClick(req, 'raised')}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
                <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                <div className="flex-1 min-w-0 px-2 my-3">
                  <h1 className="text-[#001032] font-semibold text-sm">
                    {req.service}
                  </h1>
                  <p className="text-[#001032] text-xs line-clamp-2">
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
          ))}

          {/* My Interested Requests */}
          {myInterestedRequests.length > 0 && (
            <div>
              {myInterestedRequests.map((req) =>
                req.interestedBy.map((user) => {
                  const isAccepted = req.acceptedProvider === user._id;
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
                            <p className="text-[#001032] text-xs line-clamp-2">
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
                                  }
                                )}
                                {" • "}
                                {new Date(req.createdAt).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          {isAccepted ? (
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
                })
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  // Default view - Show all cards mixed
  return (
    <div className="h-130 lg:h-123 overflow-y-auto scrollbar-hide">
      {/* Forwarded Requests */}
      {forwardedRequests.map((req) => (
        <div
          key={req._id}
          className="flex items-center gap-3 mb-2 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25  cursor-pointer"
        >
          <div
            onClick={() => handleRequestClick(req, 'forwarded')}
            className="flex items-center gap-3 flex-1 min-w-0"
          >
            <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
            <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
            <div className="flex-1 min-w-0 px-2 my-3">
              <h1 className="text-[#001032] font-semibold text-sm">
                {req.service}
              </h1>
              <p className="text-[#001032] text-xs line-clamp-2">
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

          <div className="flex flex-col items-center gap-2 pr-4 shrink-0">
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
              className="bg-[#BA1E1E] text-white px-3 py-1 rounded flex items-center gap-1 text-sm w-24"
            >
              <FaTimesCircle /> Ignore
            </button>
            {showConfirm.requestId === req._id &&
              showConfirm.providerId === null && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-17 border w-24 z-50">
                  <div className="flex flex-col items-center">
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
      ))}

      {/* Raised Requests */}
      {raisedRequests.map((req) => (
        <div
          key={req._id}
          onClick={() => handleRequestClick(req, 'raised')}
          className="flex items-center gap-3 mb-2 rounded-lg bg-white shadow-[inset_0_0_12px_#00000040] transition-all h-25  cursor-pointer"
        >
          <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200"></div>
          <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
          <div className="flex-1 min-w-0 px-2 my-3">
            <h1 className="text-[#001032] font-semibold text-sm">
              {req.service}
            </h1>
            <p className="text-[#001032] text-xs line-clamp-2">
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
      ))}

      {/* My Interested Requests */}
      {myInterestedRequests.length > 0 && (
        <div>
          {myInterestedRequests.map((req) =>
            req.interestedBy.map((user) => {
              const isAccepted = req.acceptedProvider === user._id;
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
                        <p className="text-[#001032] text-xs line-clamp-2">
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
                              }
                            )}
                            {" • "}
                            {new Date(req.createdAt).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      {isAccepted ? (
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
            })
          )}
        </div>
      )}
    </div>
  );
};

export default AllTabSec;