import React, { useEffect, useState, useCallback } from "react";
import { FaUser } from "react-icons/fa";
import { TfiList } from "react-icons/tfi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewRequest from "./NewRequest";
import RightRaised from "./RightRaised";
import RaisedTabSec from "./RaisedTabSec";
import ReceivedTabSec from "./ReceivedTabSec";
import RightNewRequest from "./RightNewRequest";
import axios from "axios";
import { serverUrl } from "@/App";
import RightReceived from "./RightReceived";
import AllTabSec from "./AllTabSec";
import RightAllTab from "./RightAllTab";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RequestSec = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeModalType, setUpgradeModalType] = useState("interest"); // 'request' or 'interest'
  const [raisedRequests, setRaisedRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [mobileView, setMobileView] = useState("left");
  const [unseenCount, setUnseenCount] = useState(0);
  const [allHandlers, setAllHandlers] = useState({
    handleInterest: null,
    handleIgnore: null,
    handleAccept: null,
    showConfirm: { requestId: null, providerId: null },
    setShowConfirm: null,
  });
  const [receivedHandlers, setReceivedHandlers] = useState({
    handleInterest: null,
    handleIgnore: null,
    handleAccept: null,
    showConfirm: { requestId: null, providerId: null },
    setShowConfirm: null,
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRaisedRequests(res.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  // Fetch unseen count whenever active tab changes, so notifications stay up-to-date
  useEffect(() => {
    const fetchUnseenCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/requests/received`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const unseenForwarded = res.data.forwardedRequests.filter(req => !req.isSeen).length;
        const unseenInterested = res.data.myInterestedRequests.filter(req => !req.isSeen).length;

        setUnseenCount(unseenForwarded + unseenInterested);
      } catch (err) {
        console.error("Error fetching unseen requests:", err);
      }
    };

    fetchUnseenCount();
  }, [activeTab]);

  const handleCreateRequest = (newRequest) => {
    setRaisedRequests((prev) => [newRequest, ...prev]);
    setMobileView("right");
  };

  const triggerUpgradeModal = useCallback((type) => {
    setUpgradeModalType(type);
    setShowUpgradeModal(true);
  }, []);

  const getCardWidths = () => {
    switch (activeTab) {
      case "newRequest":
        return { left: "w-full md:w-[60%]", right: "w-full md:w-[40%]" };
      case "received":
        return { left: "w-full md:w-[40%]", right: "w-full md:w-[60%]" };
      case "raised":
        return { left: "w-full md:w-[40%]", right: "w-full md:w-[60%]" };
      case "all":
      default:
        return { left: "w-full md:w-[40%]", right: "w-full md:w-[60%]" };
    }
  };

  const decrementUnseenCount = useCallback(() => {
    setUnseenCount((prev) => Math.max(0, prev - 1));
  }, []);

  const widths = getCardWidths();

  return (
    <div className="lg:bg-gray-100 lg:mx-4">
      <div className="bg-gray-100 w-full mx-auto pt-4">
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg lg:px-10 mb-4 justify-between items-center">
          <h1 className="text-md font-semibold text-gray-800">
            Welcome, Startup India Pvt. Ltd.
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <FaUser
              className="text-gray-600 border border-gray-600 p-1 rounded-full"
              size={24}
            />
            <span className="font-semibold text-gray-800">
              Switch to professional
            </span>
          </button>
        </div>

        <div className="flex gap-4">
          <div
            className={`${widths.left} ${mobileView === "right" ? "hidden md:block" : "block"} flex flex-col gap-2 transition-all duration-300`}
          >
            <div className="border border-gray-400 bg-white rounded-md shadow-md lg:px-4 lg:pt-4 p-2 lg:h-[88vh] h-[calc(100dvh-110px)] overflow-hidden">
              <Tabs
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value);
                  if (value === "newRequest") {
                    setMobileView("left");
                  }
                }}
                className="w-full"
              >
                <div className="flex items-center gap-2 w-full ">
                  <button
                    onClick={() => {
                      setActiveTab("newRequest");
                      setMobileView("left");
                    }}
                    className="bg-[#D8D6F8] text-[#59549F] lg:py-1 p-1.5 rounded-sm lg:w-[28%] w-[30%] text-sm lg:text-[16px]  transition-colors shadow-[inset_0_0_12px_#00000040]"
                  >
                    New Request
                  </button>

                  <div className="flex items-center justify-between gap-2 border-2 border-[#D9D9D9] lg:w-[82%] w-[70%] lg:p-2 lg:py-1 p-1 px-2 rounded-sm">
                    <input
                      type="text"
                      className="w-full outline-none"
                      placeholder="Search requests"
                    />
                    <TfiList
                      size={24}
                      className="text-gray-500 bg-white cursor-pointer"
                    />
                  </div>
                </div>

                <TabsList className="w-full bg-transparent gap-2 h-7 p-0 flex ">
                  <TabsTrigger
                    value="all"
                    className="px-6 py-1 h-7.5 border border-[#D9D9D9] rounded-sm flex-1 text-sm lg:text-[16px] data-[state=active]:text-[#59549F] data-[state=active]:bg-[#D8D6F8] data-[state=active]:shadow-[inset_0_0_12px_#00000040]!"
                  >
                    All
                  </TabsTrigger>

                  <TabsTrigger
                    value="received"
                    className="px-5 py-1 h-7.5 rounded-sm border border-[#D9D9D9] flex-1 text-sm lg:text-[16px] data-[state=active]:text-[#59549F] data-[state=active]:bg-[#D8D6F8] data-[state=active]:shadow-[inset_0_0_12px_#00000040]!"
                  >
                    Received
                    {unseenCount > 0 && (
                      <span className="bg-[#B42A2C] text-white text-xs rounded-full px-1.5 py-0.5 mx-1">
                        {unseenCount}
                      </span>
                    )}
                  </TabsTrigger>

                  <TabsTrigger
                    value="raised"
                    className="px-5 py-1 h-7.5 rounded-sm border border-[#D9D9D9] flex-1 text-sm lg:text-[16px] data-[state=active]:text-[#59549F] data-[state=active]:bg-[#D8D6F8] data-[state=active]:shadow-[inset_0_0_12px_#00000040]!"
                  >
                    Raised
                  </TabsTrigger>
                </TabsList>

                <div className="overflow-y-auto h-[calc(100dvh-210px)] lg:h-[calc(92vh-140px)] scrollbar-hide">
                  <TabsContent value="newRequest" className="mt-0">
                    <NewRequest
                      onCreateRequest={handleCreateRequest}
                      triggerUpgradeModal={triggerUpgradeModal}
                    />
                  </TabsContent>

                  <TabsContent value="all" className="mt-0">
                    <AllTabSec
                      setSelectedRequest={setSelectedRequest}
                      selectedRequest={selectedRequest}
                      setMobileView={setMobileView}
                      setAllHandlers={setAllHandlers}
                      triggerUpgradeModal={triggerUpgradeModal}
                    />
                  </TabsContent>

                  <TabsContent value="received" className="mt-0">
                    <ReceivedTabSec
                      setSelectedRequest={setSelectedRequest}
                      selectedRequest={selectedRequest}
                      setMobileView={setMobileView}
                      setReceivedHandlers={setReceivedHandlers}
                      decrementUnseenCount={decrementUnseenCount}
                      triggerUpgradeModal={triggerUpgradeModal}
                    />
                  </TabsContent>

                  <TabsContent value="raised" className="mt-0">
                    <RaisedTabSec
                      requests={raisedRequests}
                      setSelectedRequest={setSelectedRequest}
                      selectedRequest={selectedRequest}
                      setMobileView={setMobileView}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          <div
            className={`${widths.right.replace("hidden md:block", "hidden md:flex")} ${mobileView === "right" ? "flex" : "hidden md:flex"} h-[88vh] scrollbar-hide overflow-y-auto bg-white rounded-md border border-gray-400 shadow-md transition-all duration-300`}
          >
            {activeTab === "newRequest" && (
              <RightNewRequest
                raisedRequests={raisedRequests}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
                setMobileView={setMobileView}
              />
            )}

            {activeTab === "all" && <RightAllTab 
            selectedRequest={selectedRequest}
             setSelectedRequest={setSelectedRequest}
             setMobileView={setMobileView}
             handleInterest={allHandlers.handleInterest}
             handleIgnore={allHandlers.handleIgnore}
             handleAccept={allHandlers.handleAccept}
             showConfirm={allHandlers.showConfirm}
             setShowConfirm={allHandlers.setShowConfirm}
             />}

            {activeTab === "received" && (
  <RightReceived
    selectedRequest={selectedRequest}
    setSelectedRequest={setSelectedRequest}
    setMobileView={setMobileView}  // ← ADD THIS LINE
    handleInterest={receivedHandlers.handleInterest}
    handleIgnore={receivedHandlers.handleIgnore}
    handleAccept={receivedHandlers.handleAccept}
    showConfirm={receivedHandlers.showConfirm}
    setShowConfirm={receivedHandlers.setShowConfirm}
  />
)}

           {activeTab === "raised" && (
  <RightRaised
    requests={raisedRequests}
    selectedRequest={selectedRequest}
    setSelectedRequest={setSelectedRequest}
    setMobileView={setMobileView}  // ← ADD THIS LINE
  />
)}
          </div>
        </div>
      </div>

      {/* ✅ Centralized Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <IoClose size={22} />
            </button>

            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">⭐</span>
              <div>
                <h2 className="text-lg font-bold text-[#001032] leading-tight">
                  You Have More <br />
                  <span className="text-[#D8D6F8]">Opportunities</span> Waiting
                </h2>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              {upgradeModalType === "request"
                ? "You've already used your free request."
                : "You've already used your free interest."}{" "}
              <br />
              More professionals are ready to respond to your needs.
            </p>

            <div className="bg-[#FFF8E7] border border-[#FFD700] rounded-lg px-4 py-3 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">⚡</span>
                <div>
                  <p className="text-sm font-semibold text-[#B8860B]">
                    Unlock more {upgradeModalType === "request" ? "requests" : "interests"}
                  </p>
                  <p className="text-xs text-gray-600">to continue getting matched instantly</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-4 mb-5">
              <p className="text-sm font-bold text-[#001032] mb-3">With Full Access, you can:</p>
              <ul className="space-y-2">
                {[
                  {
                    icon: "📋",
                    color: "bg-blue-100",
                    text:
                      upgradeModalType === "request"
                        ? "Raise multiple service requests"
                        : "Show interest in multiple requests",
                  },
                  { icon: "⚡", color: "bg-green-100", text: "Get faster & better matches" },
                  {
                    icon: "📈",
                    color: "bg-purple-100",
                    text:
                      upgradeModalType === "request"
                        ? "Increase visibility to top professionals"
                        : "Increase visibility to startups",
                  },
                  { icon: "🤝", color: "bg-orange-100", text: "Execute deals without limits" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-sm shrink-0`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                navigate("/pricing");
                setShowUpgradeModal(false);
              }}
              className="w-full py-3 bg-[#D8D6F8] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 mb-2"
            >
              🔒 Unlock Full Access
            </button>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="w-full py-2 text-gray-500 text-sm font-medium hover:text-gray-700"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestSec;