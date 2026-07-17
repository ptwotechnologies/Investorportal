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
import CancelledTabSec from "./CancelledTabSec";
import { IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import TwinCardModal from "./TwinCardModal";
import InterestUpgradeModal from "./InterestUpgradeModal";
import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LuRocket } from "react-icons/lu";
import RequestSuccessModal from "./RequestSuccessModal";
import { toast } from "react-hot-toast";

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
  const location = useLocation();
  const [showEmptyRequestPopup, setShowEmptyRequestPopup] = useState(false);
  const [showOpportunityPopup, setShowOpportunityPopup] = useState(false); // Managed dynamically based on available matching opportunities
  const [showExploreProfessionalsBanner, setShowExploreProfessionalsBanner] = useState(false);
  const [spMode, setSpMode] = useState(localStorage.getItem("spMode") || "provider");
  
  useEffect(() => {
    const handleSpModeChange = () => {
      setSpMode(localStorage.getItem("spMode") || "provider");
    };
    window.addEventListener("spModeChanged", handleSpModeChange);
    return () => window.removeEventListener("spModeChanged", handleSpModeChange);
  }, []);

  const [activeTab, setActiveTab] = useState(location.state?.defaultTab || "all");
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

  const [showProviderModal, setShowProviderModal] = useState(false);
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [showTwinCardModal, setShowTwinCardModal] = useState(false);
  const [showInterestUpgradeModal, setShowInterestUpgradeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedRequest, setPublishedRequest] = useState(null);
  const [showAwaitingResponseBanner, setShowAwaitingResponseBanner] = useState(false);

  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [userPlanAmount, setUserPlanAmount] = useState(0);
  const [profileCompletion, setProfileCompletion] = useState(100);
  const [showProfileReminder, setShowProfileReminder] = useState(false);
  const [reminderType, setReminderType] = useState(80); // 80 or 20
  const [profile, setProfile] = useState(null);
  const [showMobileCredits, setShowMobileCredits] = useState(false);
  const [hasLoadedRequests, setHasLoadedRequests] = useState(false);
  const [hasLoadedUserData, setHasLoadedUserData] = useState(false);

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

        // Awaiting Response Trigger logic
        const userId = localStorage.getItem("userId");
        let hasPendingAwaitingResponse = false;
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        const requestsList = res.data || [];
        requestsList.forEach(req => {
          if (req.status !== "deal_created" && req.status !== "completed" && req.interestedBy && req.interestedBy.length > 0) {
            const createdDate = new Date(req.createdAt);
            if (createdDate < oneDayAgo) {
              hasPendingAwaitingResponse = true;
            }
          }
        });
        
        const awaitingResponseDismissed = localStorage.getItem(`request_page_awaiting_response_dismissed_${userId}`) === "true";
        setShowAwaitingResponseBanner(hasPendingAwaitingResponse && !awaitingResponseDismissed);
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setHasLoadedRequests(true);
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
        if (res.data.spMode) {
          setSpMode(res.data.spMode);
        }

        const userId = res.data._id;
        
        // Dynamic check for Service Professional matching opportunity alert
        if (res.data.role === "service_professional") {
          try {
            const receivedRes = await axios.get(`${serverUrl}/requests/received`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const matchingRequests = receivedRes.data.forwardedRequests || [];
            if (matchingRequests.length > 0) {
              const opportunityDismissed = localStorage.getItem(`new_opportunity_banner_dismissed_${userId}`);
              if (!opportunityDismissed) {
                setShowOpportunityPopup(true);
              } else {
                setShowOpportunityPopup(false);
              }
            } else {
              setShowOpportunityPopup(false);
            }
          } catch (error) {
            console.error("Error checking forwarded requests", error);
            setShowOpportunityPopup(false);
          }
        } else {
          setShowOpportunityPopup(false);
        }

        // Fetch Profile for completion check
        const profileRes = await axios.get(`${serverUrl}/profile/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const completion = calculateCompletion(profileRes.data);
        setProfileCompletion(completion);
        setProfile(profileRes.data);
        
        // Tiered reminders: 80% and 100%
        if (!location.state?.showEmptyRequestPopup) {
          if (completion < 80) {
            setReminderType(80);
            setShowProfileReminder(true);
          } else if (completion < 100) {
            setReminderType(100);
            setShowProfileReminder(true);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setHasLoadedUserData(true);
      }
    };

    fetchRequests();
    fetchUserData();

    const handleModeChange = () => {
      const updatedMode = localStorage.getItem("spMode");
      if (updatedMode) {
        setSpMode(updatedMode);
      }
    };

    window.addEventListener("spModeChanged", handleModeChange);
    return () => window.removeEventListener("spModeChanged", handleModeChange);
  }, []);

  useEffect(() => {
    if (!profile) return; // Wait until profile loads to avoid undefined userId key

    if (currentUserRole === "startup") {
      const fortyEightHoursAgo = new Date();
      fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

      const hasUnresolvedOpportunity = raisedRequests.some(r => {
        const createdDate = new Date(r.createdAt);
        const isOlderThan48h = createdDate < fortyEightHoursAgo;
        const isUnresolved = r.status !== "deal_created" && r.status !== "completed";
        return isOlderThan48h && isUnresolved;
      });

      const userId = profile?.userId?._id || profile?.userId;
      if (!userId) return;

      const dismissed = localStorage.getItem(`explore_professionals_dismissed_${userId}`) === "true";
      setShowExploreProfessionalsBanner(hasUnresolvedOpportunity && !dismissed);
    } else {
      setShowExploreProfessionalsBanner(false);
    }
  }, [raisedRequests, currentUserRole, profile]);

  useEffect(() => {
    if (location.state?.showEmptyRequestPopup) {
      setShowEmptyRequestPopup(true);
      window.history.replaceState({}, document.title);
    } else if (hasLoadedRequests && hasLoadedUserData) {
      const isEligibleToRaise = currentUserRole === "startup" || currentUserRole === "investor" || (currentUserRole === "service_professional" && spMode === "buyer");
      if (isEligibleToRaise && raisedRequests.length === 0) {
        setShowEmptyRequestPopup(true);
      }
    }
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
      window.history.replaceState({}, document.title);
    }
  }, [location, hasLoadedRequests, hasLoadedUserData, currentUserRole, raisedRequests.length]);

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

  useEffect(() => {
    if (activeTab === "newRequest" && currentUserRole === "service_professional" && spMode === "provider") {
      setActiveTab("all");
      setShowProviderModal(true);
    }
  }, [activeTab, currentUserRole, spMode]);

  const checkProviderMode = () => {
    if (currentUserRole === "service_professional" && spMode === "buyer") {
      setShowBuyerModal(true);
      return false;
    }
    return true;
  };

  const handleCreateRequest = (newRequest) => {
    setRaisedRequests((prev) => [newRequest, ...prev]);
    setPublishedRequest(newRequest);
    setShowSuccessModal(true);
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
    <div className="lg:bg-gray-100 lg:mx-4 h-[calc(100dvh-60px)] lg:h-auto overflow-hidden lg:overflow-visible flex flex-col"> 
      <div className="bg-gray-100 w-full mx-auto pt-4 lg:pt-2 flex flex-col flex-1 min-h-0 pb-4 lg:pb-0">
         <div  id="topbar" className="flex items-stretch  gap-1 lg:gap-2 mb-2 hidden lg:flex">
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
                {profile?.isFreePlan !== undefined && profile?.role !== "investor" && (
                  <div
                    onClick={() => setShowMobileCredits(true)}
                    className={`hidden lg:flex border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl bg-white lg:px-4 px-2.5 items-center gap-2 py-1.5 shrink-0 group hover:border-[#59549F] transition-all duration-300 cursor-pointer lg:w-[59.2%] ${profile?.isFreePlan ? "justify-between" : "justify-end"}`}
                  >
                    {profile?.isFreePlan && currentUserRole !== "service_professional" && currentUserRole !== "professional" && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#59549F] text-white text-lg font-bold shadow-md">
                          {profile.credits ?? 0}
                        </div>
                        <div className="flex flex-col items-start">
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
                    )}
                    {(currentUserRole === "service_professional" || currentUserRole === "professional") ? (
                      <div
                        onClick={async (e) => {
                          e.stopPropagation();
                          const currentMode = localStorage.getItem("spMode") || "provider";
                          const newMode = currentMode === "provider" ? "buyer" : "provider";
                          localStorage.setItem("spMode", newMode);
                          window.dispatchEvent(new Event("spModeChanged"));
                          try {
                            await axios.put(`${serverUrl}/user/sp-mode`, { spMode: newMode }, {
                              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                            });
                            if (window.globalUserCache) window.globalUserCache.spMode = newMode;
                          } catch (error) {
                            console.error("Failed to update spMode on backend", error);
                            localStorage.setItem("spMode", currentMode);
                            window.dispatchEvent(new Event("spModeChanged"));
                          }
                        }}
                        className="px-3 py-1.5 flex items-center gap-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl group cursor-pointer"
                      >
                        <div className="flex flex-col text-right">
                          <span className="text-[12px] font-semibold text-[#59549f]">
                            {spMode === "provider" ? "Switch to Buyer" : "Switch to Provider"}
                          </span>
                          <span className="text-[10px] text-gray-500 leading-tight">
                            {spMode === "provider" ? "Experience buyer portal" : "Experience provider portal"}
                          </span>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer shrink-0">
                          <div className={`w-9 h-5 rounded-full transition-colors ${spMode === "buyer" ? "bg-[#59549f]" : "bg-gray-300 group-hover:bg-gray-400"}`}></div>
                          <div className={`absolute left-[3px] top-[3px] w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-sm ${spMode === "buyer" ? "translate-x-4" : ""}`}></div>
                        </div>
                      </div>
                    ) : profile?.isFreePlan ? (
                      <div className="flex bg-[#D8D6F8] text-[#59549F] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[#59549F]/20 shadow-md group-hover:bg-[#59549F] group-hover:text-white duration-300">
                        Unlock More Opportunities
                      </div>
                    ) : currentUserRole === "startup" ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          window.dispatchEvent(new CustomEvent("showComingSoonModal", { detail: { title: "Switch to Professional" } }));
                        }}
                        className="px-3 py-1.5 flex items-center gap-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl group cursor-pointer"
                      >
                        <div className="flex flex-col text-right">
                          <span className="text-[12px] font-semibold text-[#59549f]">Switch to Professional</span>
                          <span className="text-[10px] text-gray-500 leading-tight">Explore professional tools</span>
                        </div>
                        <div className="relative inline-flex items-center cursor-pointer shrink-0">
                          <div className="w-9 h-5 bg-gray-300 rounded-full transition-colors group-hover:bg-gray-400"></div>
                          <div className="absolute left-[3px] top-[3px] w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-sm"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex bg-[#D8D6F8] text-[#59549F] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[#59549F]/20 shadow-md group-hover:bg-[#59549F] group-hover:text-white duration-300">
                        Unlock More Opportunities
                      </div>
                    )}
                  </div>
                )}
              </div>

      {/* Awaiting Response Trigger Banner */}
      {showAwaitingResponseBanner && (
        <div className="mx-2.5 my-3 p-4 bg-gradient-to-r from-[#F5F4FF] to-[#EBE9FE] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0">⏳</span>
            <div className="text-left">
              <h3 className="font-bold text-sm text-[#001032]">Action Required</h3>
              <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed font-medium">
                A proposal is awaiting your response.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto mt-2 md:mt-0 justify-end">
            <button 
              onClick={() => {
                setActiveTab("raised");
              }}
              className="bg-[#59549F] hover:bg-[#48438A] text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Continue Negotiation
            </button>
            <button
              onClick={() => {
                const userId = localStorage.getItem("userId");
                localStorage.setItem(`request_page_awaiting_response_dismissed_${userId}`, "true");
                setShowAwaitingResponseBanner(false);
              }}
              className="text-[#001032]/60 hover:text-[#001032] text-xs font-semibold hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Dynamic matching startup request available testing banner */}
      {showOpportunityPopup && (
        <div className="mx-2.5 my-3 p-4 bg-gradient-to-r from-[#59549F] to-[#48438A] text-white rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl shrink-0">📋</span>
            <div className="text-left">
              <h3 className="font-bold text-sm">New Opportunity Available</h3>
              <p className="text-xs text-white/90 mt-0.5 leading-relaxed">
                A startup request matching your expertise is now available.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <button
              onClick={() => {
                setShowOpportunityPopup(false);
                setActiveTab("received");
              }}
              className="bg-white hover:bg-purple-50 text-[#59549F] font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer"
            >
              View Opportunity
            </button>
            <button
              onClick={() => {
                setShowOpportunityPopup(false);
              }}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <RxCross2 size={18} />
            </button>
          </div>
        </div>
      )}
      {/* Explore Professionals Banner for Startup */}
      {showExploreProfessionalsBanner && currentUserRole === "startup" && (
        <div className="mx-2.5 my-3 p-4 bg-gradient-to-r from-[#59549F] to-[#48438A] text-white rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
          <div className="flex items-center gap-3 text-left">
            <span className="text-2xl shrink-0">🔍</span>
            <div>
              <h3 className="font-bold text-sm">Curated Execution Partners</h3>
              <p className="text-xs text-white/90 mt-0.5 leading-relaxed">
                Explore curated execution partners aligned with your startup needs.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <button
              onClick={() => {
                const userId = profile?.userId?._id || profile?.userId;
                localStorage.setItem(`explore_professionals_dismissed_${userId}`, "true");
                setShowExploreProfessionalsBanner(false);
                setActiveTab("received");
              }}
              className="bg-white hover:bg-purple-50 text-[#59549F] font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              View Received Tab
            </button>
            <button
              onClick={() => {
                const userId = profile?.userId?._id || profile?.userId;
                localStorage.setItem(`explore_professionals_dismissed_${userId}`, "true");
                setShowExploreProfessionalsBanner(false);
              }}
              className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            >
              <RxCross2 size={18} />
            </button>
          </div>
        </div>
      )}

        <div className="flex gap-4 flex-1 min-h-0">
          <div
            className={`${widths.left} ${mobileView === "right" ? "hidden md:block" : "block"} flex flex-col gap-2 transition-all duration-300 flex-1 min-h-0`}
          >
            <div className="border border-gray-400 bg-white rounded-md shadow-md lg:px-4 lg:pt-4 p-2 lg:h-[88vh] flex-1 min-h-0 overflow-hidden flex flex-col">
              <Tabs
                value={activeTab}
                onValueChange={(value) => {
                  setActiveTab(value);
                  if (value === "newRequest") {
                    setMobileView("left");
                  }
                }}
                className="w-full flex-1 flex flex-col min-h-0"
              >
                <div className="flex items-center gap-2 w-full ">
                  <button
                    onClick={() => {
                      if (currentUserRole === "service_professional" && spMode === "provider") {
                        setShowProviderModal(true);
                      } else {
                        setActiveTab("newRequest");
                        setMobileView("left");
                      }
                    }}
                    className="bg-[#D8D6F8] text-[#59549F] lg:py-1 p-1.5 rounded-sm lg:w-[28%] w-[30%] text-sm lg:text-[16px]  font-medium shadow-[inset_0_0_12px_#00000040]"
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

                <TabsList className="w-full bg-transparent gap-2 h-7 p-0 flex justify-start overflow-x-auto scrollbar-hide">
                  <TabsTrigger
                    value="all"
                    className="px-6 py-1 h-7.5 border border-[#D9D9D9] rounded-sm lg:flex-1 shrink-0 whitespace-nowrap text-sm lg:text-[16px] data-[state=active]:text-[#59549F] data-[state=active]:bg-[#D8D6F8] data-[state=active]:shadow-[inset_0_0_12px_#00000040]!"
                  >
                    All
                  </TabsTrigger>

                  <TabsTrigger
                    value="received"
                    className="px-5 py-1 h-7.5 rounded-sm border border-[#D9D9D9] lg:flex-1 shrink-0 whitespace-nowrap text-sm lg:text-[16px] data-[state=active]:text-[#59549F] data-[state=active]:bg-[#D8D6F8] data-[state=active]:shadow-[inset_0_0_12px_#00000040]!"
                  >
                    Received
                    {unseenCount > 0 && (
                      <span className="bg-[#B42A2C] text-white text-xs rounded-full px-1.5 py-0.5 mx-1">
                        {unseenCount}
                      </span>
                    )}
                  </TabsTrigger>

                  {(currentUserRole === "startup" || spMode === "buyer") && (
                    <TabsTrigger
                      value="raised"
                      className="px-5 py-1 h-7.5 rounded-sm border border-[#D9D9D9] lg:flex-1 shrink-0 whitespace-nowrap text-sm lg:text-[16px] data-[state=active]:text-[#59549F] data-[state=active]:bg-[#D8D6F8] data-[state=active]:shadow-[inset_0_0_12px_#00000040]!"
                    >
                      Raised
                    </TabsTrigger>
                  )}

                  <TabsTrigger
                    value="cancelled"
                    className="px-5 py-1 h-7.5 rounded-sm border border-[#D9D9D9] lg:flex-1 shrink-0 whitespace-nowrap text-sm lg:text-[16px] data-[state=active]:text-[#59549F] data-[state=active]:bg-[#D8D6F8] data-[state=active]:shadow-[inset_0_0_12px_#00000040]!"
                  >
                    Cancelled
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 flex flex-col min-h-0">
                  <TabsContent value="newRequest" className="mt-0 flex-1 flex flex-col min-h-0">
                    <NewRequest
                      onCreateRequest={handleCreateRequest}
                      triggerUpgradeModal={triggerUpgradeModal}
                    />
                  </TabsContent>

                  <TabsContent value="all" className="mt-0 flex-1 flex flex-col min-h-0">
                    <AllTabSec
                      setSelectedRequest={setSelectedRequest}
                      selectedRequest={selectedRequest}
                      setMobileView={setMobileView}
                      setAllHandlers={setAllHandlers}
                      triggerUpgradeModal={triggerUpgradeModal}
                      checkProviderMode={checkProviderMode}
                    />
                  </TabsContent>

                  <TabsContent value="received" className="mt-0 flex-1 flex flex-col min-h-0">
                    <ReceivedTabSec
                      setSelectedRequest={setSelectedRequest}
                      selectedRequest={selectedRequest}
                      setMobileView={setMobileView}
                      setReceivedHandlers={setReceivedHandlers}
                      decrementUnseenCount={decrementUnseenCount}
                      triggerUpgradeModal={triggerUpgradeModal}
                      checkProviderMode={checkProviderMode}
                    />
                  </TabsContent>

                  {(currentUserRole === "startup" || spMode === "buyer") && (
                    <TabsContent value="raised" className="mt-0 flex-1 flex flex-col min-h-0">
                      <RaisedTabSec
                        requests={raisedRequests.filter(req => req.status !== "cancelled")}
                        setRaisedRequests={setRaisedRequests}
                        setSelectedRequest={setSelectedRequest}
                        selectedRequest={selectedRequest}
                        setMobileView={setMobileView}
                      />
                    </TabsContent>
                  )}

                  <TabsContent value="cancelled" className="mt-0 flex-1 flex flex-col min-h-0">
                    <CancelledTabSec
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
             handleInterest={(...args) => {
               if(checkProviderMode()) allHandlers.handleInterest?.(...args);
             }}
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
    setMobileView={setMobileView}
    handleInterest={(...args) => {
      if(checkProviderMode()) receivedHandlers.handleInterest?.(...args);
    }}
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
                    currentPlanAmount: userPlanAmount || 0,
                    upgradeType: "growth"
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

      {/* Provider Mode Restriction Modal */}
      {showProviderModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center backdrop-blur-sm bg-black/60 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowProviderModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[#59549F] transition-colors"
            >
              <IoClose size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#F8F7FF] rounded-full flex items-center justify-center mb-3 text-xl text-[#59549F] shadow-sm border border-[#E9E7FD]">
                🔄
              </div>
              <h2 className="text-lg font-semibold text-[#001032] mb-1">Provider Mode Active</h2>
              <p className="text-gray-500 mb-4 text-sm leading-tight">
                You are currently acting as a Provider. To raise a service request, you need to switch to <b>Buyer</b> mode.
              </p>
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    await axios.put(`${serverUrl}/user/sp-mode`, { spMode: "buyer" }, {
                      headers: { Authorization: `Bearer ${token}` }
                    });
                    setSpMode("buyer");
                    localStorage.setItem("spMode", "buyer");
                    if (window.globalUserCache) window.globalUserCache.spMode = "buyer";
                    window.dispatchEvent(new Event("spModeChanged"));
                    setShowProviderModal(false);
                    setActiveTab("newRequest");
                    setMobileView("left");
                    toast.success("Switched to Buyer mode");
                  } catch (error) {
                    toast.error("Failed to switch mode");
                  }
                }}
                className="w-full py-1.5 bg-[#59549F] text-white rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Switch to Buyer Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Mode Restriction Modal (for showing interest) */}
      {showBuyerModal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center backdrop-blur-sm bg-black/60 p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setShowBuyerModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[#59549F] transition-colors"
            >
              <IoClose size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#F8F7FF] rounded-full flex items-center justify-center mb-3 text-xl text-[#59549F] shadow-sm border border-[#E9E7FD]">
                🔄
              </div>
              <h2 className="text-lg font-semibold text-[#001032] mb-1">Buyer Mode Active</h2>
              <p className="text-gray-500 mb-4 text-sm leading-tight">
                You are currently acting as a Buyer. To express interest in providing a service, you need to switch to <b>Provider</b> mode.
              </p>
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    await axios.put(`${serverUrl}/user/sp-mode`, { spMode: "provider" }, {
                      headers: { Authorization: `Bearer ${token}` }
                    });
                    setSpMode("provider");
                    localStorage.setItem("spMode", "provider");
                    if (window.globalUserCache) window.globalUserCache.spMode = "provider";
                    window.dispatchEvent(new Event("spModeChanged"));
                    setShowBuyerModal(false);
                    toast.success("Switched to Provider mode");
                  } catch (error) {
                    toast.error("Failed to switch mode");
                  }
                }}
                className="w-full py-1 bg-[#59549F] text-white rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Switch to Provider Mode
              </button>
            </div>
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
      {/* ✅ Premium Profile Completion Reminder Modal - Compact Version */}
      {showProfileReminder && !showEmptyRequestPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-[520px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#E9E7FD] animate-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowProfileReminder(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#59549F] transition-colors z-20"
            >
              <RxCross2 size={20} />
            </button>

            <div className="flex flex-col md:flex-row items-stretch min-h-[280px]"> 
              
              {/* Visual Sidebar/Header - Compact */}
              <div className="w-full md:w-[30%] bg-gradient-to-br from-[#59549F] to-[#2D317A] p-6 flex flex-col items-center justify-center text-white relative overflow-hidden">
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-white/20">
                    <LuRocket size={28} className="text-white drop-shadow-md" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-3xl font-black">{Math.round(profileCompletion)}%</p>
                    <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.15em]">Score</p>
                  </div>
                </div>
              </div>

              {/* Content Section - Compact */}
              <div className="flex-1 p-3 md:p-4 flex flex-col justify-center bg-white">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#F8F7FF] text-[#59549F] rounded-full text-[9px] font-bold uppercase tracking-wider mb-3 border border-[#E9E7FD]">
                    <div className="w-1.5 h-1.5 bg-[#59549F] rounded-full animate-pulse"></div>
                    Action Required
                  </div>
                  <h2 className="text-[18px] font-bold text-[#2D317A] mb-2 leading-tight">
                    {reminderType === 80 
                      ? "Boost Your Visibility" 
                      : "Master Your Profile"}
                  </h2>
                  <p className="text-[#5A5E9F] text-[12px] leading-relaxed font-medium">
                    {reminderType === 80 ? (
                      currentUserRole === "startup"
                        ? "Investors prioritize startups with 80%+ profile completion. Finish yours to get noticed faster."
                        : "Profiles with 80%+ completion appear higher in search results. Complete your details now."
                    ) : (
                      currentUserRole === "startup"
                        ? "A 100% complete profile builds maximum trust and increases your response rate by 3x."
                        : "100% complete profiles receive the highest quality leads and professional trust."
                    )}
                  </p>
                </div>

                {/* Progress Indicator - Compact */}
                <div className="mb-8 space-y-1.5">
                  <div className="flex justify-between items-end">
                     <span className="text-[10px] font-bold text-[#59549F] uppercase tracking-wider">Progress</span>
                     <span className="text-[10px] font-bold text-gray-400">{Math.round(profileCompletion)} / 100</span>
                  </div>
                  <div className="h-2 w-full bg-[#F3F2FF] rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-gradient-to-r from-[#59549F] to-[#2D317A] rounded-full transition-all duration-1000 ease-out shadow-sm"
                       style={{ width: `${profileCompletion}%` }}
                     ></div>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex-[1.5] py-2 bg-[#D8D6F8] text-[#59549F] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-lg font-bold text-[12px]  hover:bg-[#48438A] transform active:scale-[0.98] transition-all"
                  >
                    Complete Profile
                  </button>
                  <button
                    onClick={() => setShowProfileReminder(false)}
                    className="flex-1 py-2 bg-[#F8F7FF] text-[#59549F] rounded-lg font-bold text-[12px] hover:bg-[#EEEDFF] transition-all border border-[#E9E7FD]"
                  >
                    Later
                  </button>
                </div>
              </div>
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
                  currentPlanAmount: userPlanAmount || 0,
                  upgradeType: "growth"
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
      {showEmptyRequestPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 border border-[#E9E7FD] animate-in zoom-in-95 duration-300 text-center">
            {/* Close Button */}
            <button 
              onClick={() => setShowEmptyRequestPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-[#59549F] transition-colors"
            >
              <RxCross2 size={20} />
            </button>
            
            <div className="w-12 h-12 bg-[#F8F7FF] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E9E7FD]">
              <span className="text-xl">📋</span>
            </div>
            
            <h3 className="text-lg font-bold text-[#2D317A] mb-2 leading-snug">
              No Request Created Yet
            </h3>
            
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              You haven’t created any execution requests yet.
            </p>
            
            <button
              onClick={() => {
                setShowEmptyRequestPopup(false);
                setActiveTab("newRequest");
              }}
              className="w-full py-2.5 bg-[#59549F] text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-md"
            >
              Create First Request
            </button>
          </div>
        </div>
      )}

      <RequestSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onViewRequest={() => {
          setShowSuccessModal(false);
          setActiveTab("raised");
          if (publishedRequest) {
            setSelectedRequest(publishedRequest);
            setMobileView("right");
          }
        }}
      />

    </div>
  );
};

export default RequestSec;