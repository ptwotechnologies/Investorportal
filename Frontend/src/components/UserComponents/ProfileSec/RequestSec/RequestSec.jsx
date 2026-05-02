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
import TwinCardModal from "./TwinCardModal";
import InterestUpgradeModal from "./InterestUpgradeModal";
import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const calculateCompletion = (data) => {
  if (!data) return 0;
  const fields = [
    data.bio,
    data.state,
    data.city,
    data.about,
    data.topSkills?.length > 0,
    data.profilePhoto,
    data.coverImage,
    data.experience?.length > 0,
    data.portfolio?.length > 0,
    data.socialMedia?.linkedin,
  ];
  const filledFields = fields.filter((f) => !!f).length;
  return (filledFields / fields.length) * 100;
};

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

  const [requestAttemptCount, setRequestAttemptCount] = useState(0);

  const [showTwinCardModal, setShowTwinCardModal] = useState(false);
  const [showInterestUpgradeModal, setShowInterestUpgradeModal] = useState(false);

  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [userPlanAmount, setUserPlanAmount] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(100);
  const [showProfileReminder, setShowProfileReminder] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showMobileCredits, setShowMobileCredits] = useState(false);

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

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/user/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCurrentUserRole(res.data.role);
        setUserPlanAmount(res.data.plan?.amount || 0);

        // Fetch Profile for completion check
        const profileRes = await axios.get(`${serverUrl}/profile/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const completion = calculateCompletion(profileRes.data);
        setProfileCompletion(completion);
        setProfile(profileRes.data);
        
        // Show reminder if less than 80%
        if (completion < 80) {
          setShowProfileReminder(true);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchRequests();
    fetchUserData();
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
    if (type === 'request') {
      const newCount = requestAttemptCount + 1;
      setRequestAttemptCount(newCount);
      
      // Threshold: Show twin card on 3rd+ consecutive attempt in this session
      if (newCount >= 3) {
        setShowTwinCardModal(true);
        return;
      }
    }

    if (type === 'interest') {
      setShowInterestUpgradeModal(true);
      return;
    }

    setUpgradeModalType(type);
    setShowUpgradeModal(true);
  }, [requestAttemptCount]);

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
      <div className="bg-gray-100 w-full mx-auto pt-7 lg:pt-2">
         <div  id="topbar" className="flex items-stretch  gap-1 lg:gap-2 mb-2">
                <div
                  className="flex justify-between items-center flex-1 border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl lg:px-4 px-3 py-2 lg:mr-2  bg-white"
                >
                  <div >
                    <p className="font-semibold text-[#001032] text-sm lg:text-[16px] px-0.5">
                      Welcome, {profile?.companyName || profile?.name || "User"}!
                    </p>
                  </div>
                  <div className="flex items-center gap-1 lg:gap-x-3">
                    {/* {profile?.profilePhoto ? (
                      <img
                        src={`${serverUrl}${profile.profilePhoto}`}
                        alt="profile"
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <CgProfile className="text-gray-500" size={25} />
                    )}
                    {profile?.role === "startup" && (
                      <p className="bg-[#D8D6F8] text-[#59549F] rounded-md text-[10px] lg:text-xs hidden lg:block px-2 py-1 transition-all border border-[#59549F]/10 shadow-[inner_0_0_10px_rgba(0,0,0,0.1)]">
                        Switch to professional
                      </p>
                    )} */}
        
                    {/* Mobile Star Button (Inside Welcome Box) */}
                    {profile?.isFreePlan && (
                      <button
                        onClick={() => setShowMobileCredits(true)}
                        className="lg:hidden flex items-center justify-center w-8 h-8 bg-[#D8D6F8] rounded-md border border-[#59549F]/10 shadow-[inner_0_0_10px_rgba(0,0,0,0.1)] shrink-0"
                      >
                        <div className="w-5 h-5 rounded-full bg-white border-2 border-[#59549F] flex items-center justify-center">
                          <FaStar size={12} className="text-[#59549F]" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
        
                {/* Desktop Credits Widget */}
                {profile?.isFreePlan && (
                  <div
                    onClick={() => setShowMobileCredits(true)}
                    className="hidden lg:flex border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl bg-white lg:px-4 px-2.5 items-center justify-between gap-2 py-1.5 shrink-0 group hover:border-[#59549F] transition-all duration-300 cursor-pointer  lg:w-[59.2%]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#59549F] text-white text-lg font-bold shadow-md">
                        {profile.credits ?? 0}
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-[18px] font-semibold text-[#59549F] leading-tight w-full text-left">
                          Opportunities Available
                        </p>
                        <div className="-mt-0.5">
                          <span className="bg-[#D8D6F8] text-[#59549F] px-2 py-0.5 rounded-full text-[9px] font-medium shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] whitespace-nowrap">
                            More connections are waiting
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex bg-[#D8D6F8] text-[#59549F] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[#59549F]/20 shadow-md group-hover:bg-[#59549F] group-hover:text-white duration-300">
                      Unlock More Opportunities
                    </div>
                  </div>
                )}
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
                      setRaisedRequests={setRaisedRequests}
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
                setRaisedRequests={setRaisedRequests}
                selectedRequest={selectedRequest}
                setSelectedRequest={setSelectedRequest}
                setMobileView={setMobileView}
              />
            )}

            {activeTab === "all" && <RightAllTab 
            selectedRequest={selectedRequest}
             setSelectedRequest={setSelectedRequest}
             setRaisedRequests={setRaisedRequests}
             setMobileView={setMobileView}
             handleInterest={allHandlers.handleInterest}
             handleIgnore={allHandlers.handleIgnore}
             handleAccept={allHandlers.handleAccept}
             showConfirm={allHandlers.showConfirm}
             setShowConfirm={allHandlers.setShowConfirm}
             interestSurvey={allHandlers.interestSurvey}
             setInterestSurvey={allHandlers.setInterestSurvey}
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
    interestSurvey={receivedHandlers.interestSurvey}
    setInterestSurvey={receivedHandlers.setInterestSurvey}
  />
)}

           {activeTab === "raised" && (
  <RightRaised
    requests={raisedRequests}
    setRaisedRequests={setRaisedRequests}
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center backdrop-blur-sm bg-black/60 p-4">
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
                  <span className="text-[#59549F]">Opportunities</span> Waiting
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
                navigate("/pricing", { 
                  state: { 
                    isUpgradeFlow: true, 
                    role: currentUserRole || (activeTab === "received" ? "serviceProfessional" : "startup"), 
                    currentPlanAmount: userPlanAmount || 0 
                  } 
                });
                setShowUpgradeModal(false);
              }}
              className="w-full py-3 bg-[#181555] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 mb-2"
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

      {/* ✅ special Twin Card Upgrade Modal for persistent users */}
      {showTwinCardModal && (
        <TwinCardModal 
          onClose={() => setShowTwinCardModal(false)} 
          lightbulbImg="/lightbulb_idea.png"
          lockImg="/request_locked.png"
          userRole={currentUserRole || "startup"}
          userAmount={userPlanAmount || 0}
        />
      )}

      {/* ✅ special Interest Upgrade Modal for professionals */}
      {showInterestUpgradeModal && (
        <InterestUpgradeModal 
          onClose={() => setShowInterestUpgradeModal(false)} 
          userRole={currentUserRole || "serviceProfessional"}
          userAmount={userPlanAmount || 0}
        />
      )}
      {/* ✅ Profile Completion Reminder Modal */}
      {showProfileReminder && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-[400px] rounded-lg p-6 relative shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden"
            style={{ 
              background: `linear-gradient( #F3F3FF 0%, #DEDEFF 100%)` 
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowProfileReminder(false)}
              className=" absolute top-2 right-2 text-[#181555] hover:opacity-70 transition-all z-10"
            >
              <RxCross2 size={20} />
            </button>

            {/* Header Text Box */}
            <div className="bg-[#181555] rounded-md py-2.5 px-4 mb-4 shadow-md mt-3">
              <h2 className="text-base md:text-sm font-semibold text-white text-center leading-tight">
                {currentUserRole === "startup" 
                  ? "Increase Your Chances Before Connecting" 
                  : "Get More Opportunities with a Strong Profile"}
              </h2>
            </div>

            {/* Description */}
            <p className="text-center mb-5 px-2 leading-snug font-medium text-[11px] md:text-[12px]" style={{ color: '#525252' }}>
              {currentUserRole === "startup"
                ? "Startups with a complete profile are significantly more likely to attract investor attention and build a strong first impression"
                : "Professionals with a complete profile are more likely to receive relevant service requests and build trust with startups"}
            </p>

            {/* Highlight Box */}
            <div className="bg-white/80 border border-[#DEDEFF] rounded-2xl py-3 px-4 mb-6 shadow-sm">
              <p className="text-center font-bold text-gray-800 text-[11px] md:text-[12px]">
                {currentUserRole === "startup"
                  ? "Investors prefer startups with 80%+ profile completion"
                  : "Profiles with 80%+ completion get higher visibility"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/profile")}
                className="flex-1 py-2 bg-[#181555] text-white rounded-md font-semibold text-[12px] hover:opacity-90 transition-all shadow-md"
              >
                Complete your profile
              </button>
              <button
                onClick={() => setShowProfileReminder(false)}
                className="shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] flex-1 py-2 bg-white text-gray-800  rounded-md font-semibold text-[12px] hover:bg-gray-50 transition-all "
              >
                Continue anyway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade & Credits Popup */}
      {showMobileCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-5 relative shadow-2xl border border-[#D8D6F8] animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowMobileCredits(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <RxCross2 size={22} />
            </button>

            {/* Header Section */}
            <div className="flex items-start gap-3 mb-2 pt-1">
              <div className="w-12 h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center text-2xl shadow-inner shrink-0">
                ⭐
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#001032] leading-tight">
                  {profile?.role === "startup" ? "Unlock More" : "Grow Your"}<br />
                  <span className="text-[#59549F]">
                    {profile?.role === "startup" ? "Opportunities" : "Business"}
                  </span> Waiting
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              {profile?.role === "startup" 
                ? "You've reached your free access limit. More investors and professionals are ready to connect with you."
                : "You've reached your free access limit. More high-intent startups are looking for professionals like you."}
            </p>

            {/* Yellow Highlight Box */}
            <div className="bg-[#FFF8E7] border border-[#FFD700] rounded-xl px-3 py-2 flex items-center gap-3 mb-3">
              <span className="text-yellow-500 text-xl">⚡</span>
              <div>
                <p className="text-xs font-bold text-[#B8860B]">
                  Unlock full ecosystem access
                </p>
                <p className="text-[10px] text-gray-600">to continue building valuable connections</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-4 mb-4">
              <p className="text-[11px] font-bold text-[#001032] mb-3 uppercase tracking-wider opacity-70">
                WITH FULL ACCESS, YOU CAN:
              </p>
              <ul className="space-y-2">
                {[
                  {
                    icon: "🤝",
                    color: "bg-blue-100",
                    text: profile?.role === "startup" ? "Connect with multiple investors" : "Connect with high-intent startups",
                  },
                  { 
                    icon: "⚡", 
                    color: "bg-green-100", 
                    text: profile?.role === "startup" ? "Get faster responses to requests" : "Get more relevant client matches" 
                  },
                  {
                    icon: "📈",
                    color: "bg-purple-100",
                    text: profile?.role === "startup" ? "Increase visibility to top investors" : "Showcase profile to decision makers",
                  },
                  { 
                    icon: "🏆", 
                    color: "bg-orange-100", 
                    text: "Execute deals without limits" 
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-xs shrink-0 shadow-sm`}>
                      {item.icon}
                    </div>
                    <span className="text-[12px] text-[#4A4E91] font-medium leading-tight">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                to="/pricing"
                state={{ 
                  isUpgradeFlow: true, 
                  role: profile?.role, 
                  currentPlanAmount: userPlanAmount || 0 
                }}
                onClick={() => setShowMobileCredits(false)}
                className="w-full py-2.5 bg-[#181555] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-[#181555]/20 transition-all transform active:scale-[0.98] tracking-wide"
              >
                🔒 Unlock Full Access
              </Link>
              
              <button
                onClick={() => setShowMobileCredits(false)}
                className="w-full py-1.5 text-gray-400 font-bold text-[10px] hover:text-gray-600 transition-colors tracking-widest uppercase"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestSec;