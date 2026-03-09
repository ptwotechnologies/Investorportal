import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RightAllTab = ({ selectedRequest, setSelectedRequest }) => {
  const [showConfirm, setShowConfirm] = React.useState({
      requestId: null,
      providerId: null,
    });
  const handleClose = () => {
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

      // Update local selectedRequest state
      setSelectedRequest((prev) =>
        prev && prev._id === requestId
          ? { ...prev, status: "interested" }
          : prev,
      );
    } catch (err) {
      console.error("Interest error:", err);
    }
  };

   const handleIgnore = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${serverUrl}/requests/ignore`,
        { requestId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Update local state so button disables & text changes
      setSelectedRequest((prev) =>
        prev ? { ...prev, isIgnored: true } : prev,
      );

      // Close confirm modal
      setShowConfirm({ requestId: null, providerId: null });
    } catch (err) {
      console.error("Ignore error:", err);
    }
  };

  if (!selectedRequest) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center ">
        <div className="flex flex-col items-center  p-8 text-center  border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4 ">
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

  return (
    <div className="w-full h-full flex flex-col lg:p-4 p-2 bg-white rounded-md">
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

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
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
                    },
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Service Type
            </h4>
            <p className="text-sm text-[#001032]">{selectedRequest.service}</p>
          </div>

          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Description
            </h4>
            <p className="text-sm text-[#001032] leading-relaxed">
              {selectedRequest.description}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Status</h4>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                selectedRequest.requestType === "forwarded"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {selectedRequest.requestType === "forwarded"
                ? "Forwarded to You"
                : "Pending"}
            </span>
          </div>

          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Request ID
            </h4>
            <p className="text-xs text-gray-700 font-mono break-all">
              {selectedRequest._id || selectedRequest.id || "N/A"}
            </p>
          </div>

          {selectedRequest.requestType === "forwarded" ? (
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => handleInterest(selectedRequest._id)}
                disabled={
                  selectedRequest.status === "interested" ||
                  selectedRequest.isIgnored
                }
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                  selectedRequest.status === "interested" ||
                  selectedRequest.isIgnored
                    ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed"
                    : "bg-[#F8DEDE] text-[#B94444]"
                }`}
              >
                <FaCheckCircle />{" "}
                {selectedRequest.status === "interested"
                  ? "Interested"
                  : "Interest"}
              </button>
              <button
                onClick={() =>
                  setShowConfirm({
                    requestId: selectedRequest._id,
                    providerId: null,
                  })
                }
                disabled={
                  selectedRequest.status === "interested" ||
                  selectedRequest.isIgnored
                }
                className={`flex-1 bg-[#D8D6F8] text-[#59549F] py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                  selectedRequest.status === "interested" ||
                  selectedRequest.isIgnored
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
              >
                <FaTimesCircle />{" "}
                {selectedRequest.isIgnored ? "Ignored" : "Ignore"}
              </button>
              {showConfirm.requestId === selectedRequest._id &&
              !selectedRequest.isIgnored && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 border w-24 z-50">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      onClick={() => handleIgnore(selectedRequest._id)}
                      className="bg-[#F8DEDE] text-[#B94444] px-3 py-1 rounded-full text-xs w-full shadow-[inset_0_0_12px_#00000040]"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() =>
                        setShowConfirm({ requestId: null, providerId: null })
                      }
                      className="bg-white text-[#001032] px-3 py-1 rounded-full text-xs w-full shadow-[inset_0_0_12px_#00000040]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3 pt-4">
              <button className="flex-1 border-2 border-gray-300 text-gray-700 lg:py-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightAllTab;
