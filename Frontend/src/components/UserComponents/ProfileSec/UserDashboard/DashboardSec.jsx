import React from "react";
import ProgressBar, { ProgressBar2, ProgressBar3 } from "./ProgressBar";
import {
  FaCalendar,
  FaCalendarCheck,
  FaImage,
  FaRegCalendarCheck,
  FaStar,
} from "react-icons/fa";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoMdCheckmark } from "react-icons/io";
import Graph1 from "./Graph1";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useNotifications } from "@/context/NotificationContext";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "@/App";

const DashboardSec = () => {
  const percentage = 75;
  const percentage2 = 25;

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMobileCredits, setShowMobileCredits] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const [showVisibilityBoostBanner, setShowVisibilityBoostBanner] = useState(false);
  const [showNewOpportunityBanner, setShowNewOpportunityBanner] = useState(false);
  const [showExploreProfessionalsBanner, setShowExploreProfessionalsBanner] = useState(false);
  const [showDraftRecoveryBanner, setShowDraftRecoveryBanner] = useState(false);
  const [showFirstProposalBanner, setShowFirstProposalBanner] = useState(false);
  const [showMultipleProposalsBanner, setShowMultipleProposalsBanner] = useState(false);
  const [showAwaitingResponseBanner, setShowAwaitingResponseBanner] = useState(false);
  const [showDealActivatedModal, setShowDealActivatedModal] = useState(false);
  const [showStartupMomentumBanner, setShowStartupMomentumBanner] = useState(false);
  const [showPaymentReleasedModal, setShowPaymentReleasedModal] = useState(false);
  const [showPaymentReleasedBanner, setShowPaymentReleasedBanner] = useState(false);
  const [showFastResponderBanner, setShowFastResponderBanner] = useState(false);
  const [showReputationMomentumBanner, setShowReputationMomentumBanner] = useState(false);
  const [showOpportunityReminderBanner, setShowOpportunityReminderBanner] = useState(false);
  const [showEcosystemActivityBanner, setShowEcosystemActivityBanner] = useState(false);
  const [showVisibilityUpgradeBanner, setShowVisibilityUpgradeBanner] = useState(false);
  const [showRepeatOpportunityBanner, setShowRepeatOpportunityBanner] = useState(false);
  const [releasedPaymentData, setReleasedPaymentData] = useState(null);
  const [showExpansionBanner, setShowExpansionBanner] = useState(false);
  const [showStartupViewedBanner, setShowStartupViewedBanner] = useState(false);
  const [showStartupShortlistedBanner, setShowStartupShortlistedBanner] = useState(false);
  const [showProposalSuggestionBanner, setShowProposalSuggestionBanner] = useState(false);
  const [showProposalViewedBanner, setShowProposalViewedBanner] = useState(false);
  const [showProposalSubmittedModal, setShowProposalSubmittedModal] = useState(false);
  const [submittedProposalId, setSubmittedProposalId] = useState(null);
  const [showDealCompletionModal, setShowDealCompletionModal] = useState(false);
  const [completedDealData, setCompletedDealData] = useState(null);

  useEffect(() => {
    if (showProfileModal || showDealCompletionModal || showProposalSubmittedModal || showDealActivatedModal || showPaymentReleasedModal) {
      document.body.style.overflow = "hidden"; // scroll lock
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showProfileModal]);

  const members = Array(4).fill(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [stats, setStats] = useState({
    registered: 0,
    requests: 0,
    onApproval: 0,
    activityPercentage: 0
  });

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

  const [newRegistrations, setNewRegistrations] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const timeAgo = (dateString) => {
    if (!dateString) return "—";
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    return `${diffHours} h`;
  };

  const handleWelcomeBannerDismiss = () => {
    const userId = profile?.userId?._id || profile?.userId;
    if (userId) {
      localStorage.setItem(`welcome_seen_${userId}`, "true");
    }
    setShowWelcomeBanner(false);
  };

  const handleWelcomeBannerCTA = () => {
    const userId = profile?.userId?._id || profile?.userId;
    if (userId) {
      localStorage.setItem(`welcome_seen_${userId}`, "true");
    }
    setShowWelcomeBanner(false);
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // Fire all requests in parallel for maximum speed
      const [
        profileRes,
        myRequestsRes,
        receivedRes,
        allProfilesRes,
        connectionsRes,
        dealsRes
      ] = await Promise.all([
        axios.get(`${serverUrl}/profile/`, { headers }),
        axios.get(`${serverUrl}/requests/`, { headers }),
        axios.get(`${serverUrl}/requests/received`, { headers }),
        axios.get(`${serverUrl}/profile/all`, { headers }),
        axios.get(`${serverUrl}/connections/my/`, { headers }),
        axios.get(`${serverUrl}/api/deals/my-deals`, { headers }).catch(() => ({ data: [] }))
      ]);

      // Process Profile Data
      setProfile(profileRes.data);
      const completion = calculateCompletion(profileRes.data);
      setProfileCompletion(completion);
      
      // Welcome Trigger check
      const profileData = profileRes.data;
      const isEligibleRole = profileData.role === "startup" || profileData.role === "service_professional" || profileData.role === "investor";
      const isApproved = profileData.paymentStatus === "approved";
      const userId = profileData.userId?._id || profileData.userId;
      if (isEligibleRole && isApproved && userId) {
        const welcomeSeen = localStorage.getItem(`welcome_seen_${userId}`);
        if (!welcomeSeen) {
          setShowWelcomeBanner(true);
        }
      }

      // Show modal only if profile is less than 80% completed
      if (completion < 80) {
        setShowProfileModal(true);
      } else {
        setShowProfileModal(false);
      }

      // 80% Visibility Boost / Verified Investor Trigger check
      if (userId) {
        const isStartupOrSP = profileData.role === "startup" || profileData.role === "service_professional";
        const isInvestor = profileData.role === "investor";

        if (isStartupOrSP && completion >= 80) {
          const bannerDismissed = localStorage.getItem(`visibility_boost_banner_dismissed_${userId}`);
          if (!bannerDismissed) {
            setShowVisibilityBoostBanner(true);
          }
        } else if (isInvestor && isApproved) {
          const bannerDismissed = localStorage.getItem(`verified_investor_banner_dismissed_${userId}`);
          if (!bannerDismissed) {
            setShowVisibilityBoostBanner(true);
          }
        }
      }

      // Process Requests Data
      const totalRequests = myRequestsRes.data.length;
      const receivedRequests = receivedRes.data.forwardedRequests || [];

      // New Opportunity Trigger check for Service Professionals
      if (userId && profileData.role === "service_professional" && receivedRequests.length > 0) {
        const opportunityDismissed = localStorage.getItem(`new_opportunity_banner_dismissed_${userId}`);
        if (!opportunityDismissed) {
          setShowNewOpportunityBanner(true);
        }
      }

      // Check for Explore Professionals Trigger for Startups
      let isExploreProfessionalsActive = false;
      if (profileData.role === "startup") {
        const raisedRequests = myRequestsRes.data || [];
        const fortyEightHoursAgo = new Date();
        fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

        isExploreProfessionalsActive = raisedRequests.some(r => {
          const createdDate = new Date(r.createdAt);
          const isOlderThan48h = createdDate < fortyEightHoursAgo;
          const isUnresolved = r.status !== "deal_created" && r.status !== "completed";
          return isOlderThan48h && isUnresolved;
        });
      }
      const isExploreDismissed = localStorage.getItem(`explore_professionals_dismissed_${userId}`) === "true";
      setShowExploreProfessionalsBanner(isExploreProfessionalsActive && !isExploreDismissed);

      // Check for Draft Recovery Trigger
      let isDraftRecoveryActive = false;
      if (userId) {
        const savedDraft = localStorage.getItem(`deal_draft_autosave_${userId}`);
        if (savedDraft) {
          try {
            const draftData = JSON.parse(savedDraft);
            const lastSavedAt = draftData.lastSavedAt || Date.now();
            const sixHours = 6 * 60 * 60 * 1000;
            const isOlderThan6h = (Date.now() - lastSavedAt) > sixHours;
            
            if (isOlderThan6h) {
              isDraftRecoveryActive = true;
            }
          } catch (e) {
            console.error("[DASHBOARD] Failed to parse saved draft", e);
          }
        }
      }
      const isRecoveryDismissed = localStorage.getItem(`deal_draft_recovery_dismissed_${userId}`) === "true";
      setShowDraftRecoveryBanner(isDraftRecoveryActive && !isRecoveryDismissed);

      // Check for Proposal Triggers for Startups
      if (profileData.role === "startup") {
        const raisedRequests = myRequestsRes.data || [];
        const totalProposalsCount = raisedRequests.reduce((acc, req) => {
          return acc + (req.interestedBy ? req.interestedBy.length : 0);
        }, 0);

        if (totalProposalsCount > 0 && totalProposalsCount < 3) {
          const firstPropDismissed = localStorage.getItem(`first_proposal_dismissed_${userId}`) === "true";
          setShowFirstProposalBanner(!firstPropDismissed);
          setShowMultipleProposalsBanner(false);
        } else if (totalProposalsCount >= 3) {
          const multiPropDismissed = localStorage.getItem(`multiple_proposals_dismissed_${userId}`) === "true";
          setShowMultipleProposalsBanner(!multiPropDismissed);
          setShowFirstProposalBanner(false);
        } else {
          setShowFirstProposalBanner(false);
          setShowMultipleProposalsBanner(false);
        }

        let hasPendingAwaitingResponse = false;
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        raisedRequests.forEach(req => {
          if (req.status !== "deal_created" && req.status !== "completed" && req.interestedBy && req.interestedBy.length > 0) {
            const createdDate = new Date(req.createdAt);
            if (createdDate < oneDayAgo) {
              hasPendingAwaitingResponse = true;
            }
          }
        });
        const awaitingResponseDismissed = localStorage.getItem(`awaiting_response_dismissed_${userId}`) === "true";
        setShowAwaitingResponseBanner(hasPendingAwaitingResponse && !awaitingResponseDismissed);
      }
      // New Opportunity Trigger (Service Professional Only)
      if (profileData.role === "service_professional" && userId) {
        const availableRequests = receivedRes.data || [];
        const unactionedRequests = availableRequests.filter(req => {
          const isInterested = req.interestedBy?.some(u => u._id === userId || u === userId);
          const isIgnored = req.ignoredBy?.some(u => u._id === userId || u === userId);
          return !isInterested && !isIgnored && req.status !== "deal_created" && req.status !== "completed";
        });

        if (unactionedRequests.length > 0 || localStorage.getItem('debug_new_opportunity_trigger') === "true") {
          const oppDismissed = localStorage.getItem(`new_opportunity_banner_dismissed_${userId}`) === "true";
          setShowNewOpportunityBanner(!oppDismissed);
        }

        const shortlistedRequests = availableRequests.filter(req => {
          return req.shortlistedBy?.some(u => u._id === userId || u === userId) || req.invitedBy?.some(u => u._id === userId || u === userId);
        });
        
        if (shortlistedRequests.length > 0 || localStorage.getItem('debug_startup_shortlisted_trigger') === "true") {
          const shortDismissed = localStorage.getItem(`startup_shortlisted_banner_dismissed_${userId}`) === "true";
          setShowStartupShortlistedBanner(!shortDismissed);
        }

        let hasViewedButNotSubmitted = false;
        availableRequests.forEach(req => {
          const reqId = req._id || req.id;
          const viewedTimestampStr = localStorage.getItem(`viewed_request_${reqId}_${userId}`);
          if (viewedTimestampStr) {
            const viewedTimestamp = parseInt(viewedTimestampStr, 10);
            const isInterested = req.interestedBy?.some(u => u._id === userId || u === userId);
            const isIgnored = req.ignoredBy?.some(u => u._id === userId || u === userId);
            const timeSinceViewed = Date.now() - viewedTimestamp;
            const sixHours = 6 * 60 * 60 * 1000;
            
            if (!isInterested && !isIgnored && timeSinceViewed > sixHours) {
              hasViewedButNotSubmitted = true;
            }
          }
        });

        if (hasViewedButNotSubmitted || localStorage.getItem('debug_proposal_suggestion_trigger') === "true") {
          const suggestionDismissed = localStorage.getItem(`proposal_suggestion_dismissed_${userId}`) === "true";
          setShowProposalSuggestionBanner(!suggestionDismissed);
        }

        const submittedRequests = availableRequests.filter(req => {
          return req.interestedBy?.some(u => u._id === userId || u === userId);
        });

        if (submittedRequests.length > 0 || localStorage.getItem('debug_proposal_submitted_trigger') === "true") {
          const latestSubmitted = submittedRequests.length > 0 ? submittedRequests[submittedRequests.length - 1] : { _id: "debug" };
          const submittedSeen = localStorage.getItem(`proposal_submitted_seen_${latestSubmitted._id}_${userId}`) === "true";
          if (!submittedSeen) {
            setSubmittedProposalId(latestSubmitted._id);
            setShowProposalSubmittedModal(true);
          }
        }

        const viewedProposals = submittedRequests.filter(req => {
          return req.viewedByStartup || localStorage.getItem(`debug_proposal_viewed_${req._id || req.id}`) === "true";
        });

        if (viewedProposals.length > 0 || localStorage.getItem('debug_proposal_viewed_trigger') === "true") {
          const viewedDismissed = localStorage.getItem(`proposal_viewed_banner_dismissed_${userId}`) === "true";
          setShowProposalViewedBanner(!viewedDismissed);
        }

        let hasAwaitingResponse = false;
        submittedRequests.forEach(req => {
          const proposalTimeStr = localStorage.getItem(`proposal_submitted_time_${req._id || req.id}_${userId}`);
          const submittedTimestamp = proposalTimeStr ? parseInt(proposalTimeStr, 10) : new Date(req.createdAt || Date.now()).getTime();
          const twentyFourHours = 24 * 60 * 60 * 1000;
          
          if (!req.viewedByStartup && (Date.now() - submittedTimestamp > twentyFourHours)) {
            hasAwaitingResponse = true;
          }
        });

        if (hasAwaitingResponse || localStorage.getItem('debug_awaiting_response_trigger') === "true") {
          const awaitingDismissed = localStorage.getItem(`awaiting_response_banner_dismissed_${userId}`) === "true";
          setShowAwaitingResponseBanner(!awaitingDismissed);
        }
      }

      // Startup Viewed Profile Trigger (Service Professional/Investor Only)
      if ((profileData.role === "service_professional" || profileData.role === "investor") && userId) {
        const hasStartupInterest = connectionsRes.data?.received?.some(c => c.senderId?.role === "startup") || localStorage.getItem('debug_startup_viewed_trigger') === "true";
        if (hasStartupInterest) {
          const viewedDismissed = localStorage.getItem(`startup_viewed_banner_dismissed_${userId}`) === "true";
          setShowStartupViewedBanner(!viewedDismissed);
        }
      }
      
      // Startup Momentum Trigger check
      if (profileData.role === "startup" && userId) {
        // High ecosystem activity condition (based on connections or debug flag)
        const hasHighActivity = connectionsRes.data?.length >= 0 || localStorage.getItem(`debug_startup_momentum_trigger`) === "true";
        if (hasHighActivity) {
          const momentumDismissed = localStorage.getItem(`startup_momentum_dismissed_${userId}`) === "true";
          setShowStartupMomentumBanner(!momentumDismissed);
        }
      }
      
      if (userId) {
        const isDealActivated = localStorage.getItem(`deal_activated_trigger_${userId}`) === "true";
        setShowDealActivatedModal(isDealActivated);

        // Deal Completion Trigger check
        if (dealsRes && dealsRes.data) {
          const completedDeals = dealsRes.data.filter(d => d.status === 'Completed' || d.status === 'completed' || d.status === 'Completed_Simulation' || localStorage.getItem('debug_deal_completion_trigger') === "true");
          if (completedDeals.length > 0) {
            const latestCompleted = completedDeals[completedDeals.length - 1];
            const hasSeenCompletion = localStorage.getItem(`deal_completion_seen_${latestCompleted._id || "debug"}_${userId}`);
            if (!hasSeenCompletion) {
              setCompletedDealData(latestCompleted);
              setShowDealCompletionModal(true);
            }
            
            // Expansion Trigger Check
            const lastDealDate = new Date(latestCompleted.updatedAt || latestCompleted.createdAt || Date.now());
            const daysSinceCompletion = (Date.now() - lastDealDate.getTime()) / (1000 * 60 * 60 * 24);
            
            // Check if there are any requests made AFTER the last completed deal
            const hasNewRequests = myRequestsRes.data.some(r => new Date(r.createdAt) > lastDealDate);
            
            if (!hasNewRequests && (daysSinceCompletion >= 7 || localStorage.getItem('debug_expansion_trigger') === "true")) {
              const expansionDismissed = localStorage.getItem(`expansion_banner_dismissed_${userId}`) === "true";
              setShowExpansionBanner(!expansionDismissed);
            }
            
            // Repeat Opportunity Trigger
            if (profileData.role === "service_professional" && (daysSinceCompletion >= 5 || localStorage.getItem('debug_repeat_opportunity_trigger') === "true")) {
              const repeatOpportunityDismissed = localStorage.getItem(`repeat_opportunity_dismissed_${userId}`) === "true";
              setShowRepeatOpportunityBanner(!repeatOpportunityDismissed);
            }
            
            // Reputation Momentum Trigger
            if (profileData.role === "service_professional" && (completedDeals.length > 0 || localStorage.getItem('debug_reputation_momentum_trigger') === "true")) {
               const reputationDismissed = localStorage.getItem(`reputation_momentum_banner_dismissed_${userId}`) === "true";
               setShowReputationMomentumBanner(!reputationDismissed);
            }
          }

          // Payment Released Trigger
          let hasReleasedPayment = false;
          let latestReleased = null;
          dealsRes.data.forEach(deal => {
            const releasedMs = deal.milestones?.filter(m => m.status === 'Released' || m.status === 'Paid');
            if (releasedMs && releasedMs.length > 0) {
              hasReleasedPayment = true;
              latestReleased = releasedMs[releasedMs.length - 1];
            }
          });

          if (hasReleasedPayment || localStorage.getItem('debug_payment_released_trigger') === "true") {
            const paymentSeen = localStorage.getItem(`payment_released_seen_${latestReleased?._id || "debug"}_${userId}`);
            if (!paymentSeen) {
              setReleasedPaymentData(latestReleased);
              setShowPaymentReleasedModal(true);
            }
            const bannerDismissed = localStorage.getItem(`payment_released_banner_dismissed_${userId}`) === "true";
            setShowPaymentReleasedBanner(!bannerDismissed);
          }
          
          // Fast Responder Trigger
          if (profileData.role === "service_professional" && localStorage.getItem('debug_fast_responder_trigger') === "true") {
             const fastResponderDismissed = localStorage.getItem(`fast_responder_banner_dismissed_${userId}`) === "true";
             setShowFastResponderBanner(!fastResponderDismissed);
          }
        }
      }

      // Decide which requests to show based on role
      if (profileRes.data.role === "startup") {
        setRecentRequests(myRequestsRes.data.slice(0, 3) || []);
      } else {
        setRecentRequests(receivedRequests.slice(0, 3) || []);
        
        // Opportunity Reminder Trigger
        const hasOpenOpportunity = receivedRequests.some(req => {
           const hoursOpen = (Date.now() - new Date(req.createdAt).getTime()) / (1000 * 60 * 60);
           return hoursOpen >= 24 && req.status === "Pending"; 
        }) || localStorage.getItem('debug_opportunity_reminder_trigger') === "true";

        if (hasOpenOpportunity) {
           const reminderDismissed = localStorage.getItem(`opportunity_reminder_banner_dismissed_${userId}`) === "true";
           setShowOpportunityReminderBanner(!reminderDismissed);
        }
      }

      // Process New Registrations
      const sortedUsers = allProfilesRes.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4)
        .map(p => ({
          name: p.name || "User",
          role: p.userId?.role?.replace("_", " ") || "Member",
          hours: timeAgo(p.createdAt)
        }));
      setNewRegistrations(sortedUsers);

      // Process Connections Data
      const { sent, accepted } = connectionsRes.data;
      const registeredCount = accepted?.length || 0;
      const onApprovalCount = sent?.length || 0;

      // Calculate weekly stats (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const weeklyConnects = accepted.filter(c => new Date(c.createdAt) >= sevenDaysAgo).length;

      // Calculate activity percentage
      const activity = Math.min(100, (registeredCount + totalRequests + onApprovalCount) * 10);

      setStats({
        registered: registeredCount,
        requests: totalRequests,
        onApproval: onApprovalCount,
        activityPercentage: activity || 64,
        weeklyConnects: weeklyConnects
      });

      // Ecosystem Activity Trigger
      const hasHighEngagement = activity > 0 || localStorage.getItem('debug_ecosystem_activity_trigger') === "true";
      if (hasHighEngagement && userId) {
         const activityDismissed = localStorage.getItem(`ecosystem_activity_banner_dismissed_${userId}`) === "true";
         setShowEcosystemActivityBanner(!activityDismissed);
      }

      // Visibility Upgrade Trigger
      const isOnFreePlan = !profileData.plan || profileData.plan.amount === 0 || localStorage.getItem('debug_visibility_upgrade_trigger') === "true";
      if (isOnFreePlan && userId) {
         const visibilityDismissed = localStorage.getItem(`visibility_upgrade_banner_dismissed_${userId}`) === "true";
         setShowVisibilityUpgradeBanner(!visibilityDismissed);
      }

    } catch (err) {
      console.error("Dashboard fetching error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    window.addEventListener("profile-updated", fetchData);
    return () => {
      window.removeEventListener("profile-updated", fetchData);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="lg:bg-gray-200 h-screen pt-2 px-2 pb-2 lg:pb-0 animate-pulse">
        {/* Topbar Skeleton */}
        <div className="flex items-stretch w-full px-2 gap-2 mb-2">
          <div className="flex-1 h-14 bg-white border-2 border-gray-200 rounded-xl shadow-inner"></div>
          <div className="hidden lg:block w-[64%] h-14 bg-white border-2 border-gray-200 rounded-xl shadow-inner"></div>
        </div>

        <div className="flex gap-3 px-3">
          <div className="w-[70%] space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 h-[47vh] bg-white rounded-2xl shadow-inner"></div>
              <div className="flex-1 h-[47vh] bg-white rounded-2xl shadow-inner"></div>
            </div>
            <div className="h-[41vh] bg-white rounded-2xl shadow-inner"></div>
          </div>
          <div className="w-[30%] h-[89.5vh] bg-white rounded-2xl shadow-inner"></div>
        </div>
      </div>
    );
  }

  const { isPortfolioMissing, notifications } = useNotifications();
  const completionThreshold = profile?.role === "investor" ? 60 : 50;
  const isProfileIncomplete = profileCompletion < completionThreshold;
  const isRequestEmpty = profile?.role === "startup" && stats.requests === 0;

  return (
    <div className="relative">
      {/* Deal Completion Success Modal */}
      {showDealCompletionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col items-center text-center relative">
            <button
              onClick={() => {
                const userId = profile?.userId?._id || profile?.userId;
                localStorage.setItem(`deal_completion_seen_${completedDealData?._id || "debug"}_${userId}`, "true");
                setShowDealCompletionModal(false);
              }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <RxCross2 size={20} />
            </button>
            <div className="w-20 h-20 bg-[#D8D6F8]/40 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl text-[#59549F]">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-[#001032] mb-3">Congratulations!</h2>
            <p className="text-[#001032]/80 text-base leading-relaxed mb-8">
              Your deal has been completed successfully.
            </p>
            <div className="w-full flex flex-col gap-3">
              <Link
                to="/request"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`deal_completion_seen_${completedDealData?._id || "debug"}_${userId}`, "true");
                  setShowDealCompletionModal(false);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-[#D8D6F8] to-[#C9C7F0] text-[#59549F] font-bold rounded-xl shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all text-center block"
              >
                Create New Request
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Trigger Toast */}
      {showWelcomeBanner && (
        <motion.div
          initial={{ y: -50, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: -50, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-4 left-1/2 z-[9999] w-[92%] sm:w-[90%] max-w-[650px] bg-[#59549F] text-white p-3.5 sm:p-4 rounded-xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-300"
        >
          <div className="flex items-start gap-3 w-full sm:w-auto">
            <span className="text-xl shrink-0 mt-0.5 sm:mt-0 text-white">✨</span>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                {profile?.role === "startup"
                  ? "Welcome to Copteno. Complete your startup profile to start connecting with professionals and investors."
                  : profile?.role === "investor"
                  ? "Welcome to Copteno. Set up your investor profile to start discovering curated startup opportunities."
                  : "Welcome to Copteno. Complete your professional profile to start receiving startup opportunities."}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end sm:justify-start gap-2.5 w-full sm:w-auto mt-2 sm:mt-0 shrink-0 border-t border-white/15 sm:border-0 pt-2.5 sm:pt-0">
            <Link
              to="/profile"
              onClick={handleWelcomeBannerCTA}
              className="bg-white hover:bg-purple-50 text-[#59549F] font-semibold py-1.5 px-4 rounded-lg text-xs transition-all duration-300 shadow-md text-center flex-1 sm:flex-none whitespace-nowrap"
            >
              Complete Profile
            </Link>
            <button
              onClick={handleWelcomeBannerDismiss}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors shrink-0"
            >
              <RxCross2 size={16} />
            </button>
          </div>
        </motion.div>
      )}
      <div
        className={`lg:bg-gray-200 h-auto lg:h-screen pt-2 lg:px-0 pb-2 lg:pb-0 flex flex-col transition-all duration-300 ${
          showProfileModal ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Visibility Boost / Verified Investor Dashboard Banner */}
        {showVisibilityBoostBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#59549F] to-[#48438A] text-white rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">
                {profile?.role === "investor" ? "🎖️" : "🚀"}
              </span>
              <div className="text-left">
                <h3 className="font-bold text-sm">
                  {profile?.role === "investor" ? "Verified Investor Status Activated" : "Visibility Boost Activated"}
                </h3>
                <p className="text-xs text-white/90 mt-0.5 leading-relaxed">
                  {profile?.role === "startup" 
                    ? "Visibility Boost Activated. Your startup is now prioritized in discovery and investor recommendations."
                    : profile?.role === "investor"
                    ? "Your investor profile is now verified across the ecosystem."
                    : "Visibility Boost Activated. Your profile is now prioritized in startup recommendations."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  const key = profile?.role === "investor" 
                    ? `verified_investor_banner_dismissed_${userId}` 
                    : `visibility_boost_banner_dismissed_${userId}`;
                  localStorage.setItem(key, "true");
                  setShowVisibilityBoostBanner(false);
                  navigate("/connect");
                }}
                className="bg-white hover:bg-purple-50 text-[#59549F] font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer"
              >
                {profile?.role === "startup" 
                  ? "Explore Discovery" 
                  : profile?.role === "investor"
                  ? "Explore Startups"
                  : "Explore Opportunities"}
              </button>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  const key = profile?.role === "investor" 
                    ? `verified_investor_banner_dismissed_${userId}` 
                    : `visibility_boost_banner_dismissed_${userId}`;
                  localStorage.setItem(key, "true");
                  setShowVisibilityBoostBanner(false);
                }}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Startup Momentum Banner */}
        {showStartupMomentumBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#D7EBE4] to-[#C3DFD5] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#3CC033]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">📈</span>
              <div className="text-left">
                <h3 className="font-bold text-sm text-[#001032]">High Ecosystem Activity</h3>
                <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed">
                  Your startup activity and visibility are increasing across the ecosystem.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`startup_momentum_dismissed_${userId}`, "true");
                  setShowStartupMomentumBanner(false);
                  navigate("/connect");
                }}
                className="bg-[#001032] hover:opacity-90 text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                View Activity
              </button>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`startup_momentum_dismissed_${userId}`, "true");
                  setShowStartupMomentumBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Expansion Banner */}
        {showExpansionBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#FFF5D1] to-[#FFEAB6] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#FBC02D]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">🌱</span>
              <div className="text-left">
                <h3 className="font-bold text-sm text-[#001032]">Ready to Scale?</h3>
                <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed">
                  Need support for your next phase of growth?
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/connect"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`expansion_banner_dismissed_${userId}`, "true");
                  setShowExpansionBanner(false);
                }}
                className="bg-[#001032] hover:opacity-90 text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Explore Professionals
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`expansion_banner_dismissed_${userId}`, "true");
                  setShowExpansionBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Startup Viewed Profile Banner */}
        {showStartupViewedBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#D7EBE4] to-[#C3DFD5] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#3CC033]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">👀</span>
              <div className="text-left">
                <h3 className="font-bold text-sm text-[#001032]">Profile Activity</h3>
                <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed">
                  Startups are actively exploring your profile.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/connect"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`startup_viewed_banner_dismissed_${userId}`, "true");
                  setShowStartupViewedBanner(false);
                }}
                className="bg-[#001032] hover:opacity-90 text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                View Insights
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`startup_viewed_banner_dismissed_${userId}`, "true");
                  setShowStartupViewedBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* New Opportunity Operational Alert Banner for Service Professional */}
        {showNewOpportunityBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#59549F] to-[#48438A] text-white rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
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
              <Link
                to="/request"
                state={{ defaultTab: "received" }}
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`new_opportunity_banner_dismissed_${userId}`, "true");
                  setShowNewOpportunityBanner(false);
                }}
                className="bg-white hover:bg-purple-50 text-[#59549F] font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer text-center"
              >
                View Opportunity
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`new_opportunity_banner_dismissed_${userId}`, "true");
                  setShowNewOpportunityBanner(false);
                }}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Startup Shortlisted Banner */}
        {showStartupShortlistedBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#E6E2FF] to-[#D5D0F5] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">⭐</span>
              <div className="text-left">
                <h3 className="font-bold text-sm text-[#001032]">Profile Shortlisted</h3>
                <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed">
                  A startup shortlisted your profile for consideration.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/request"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`startup_shortlisted_banner_dismissed_${userId}`, "true");
                  setShowStartupShortlistedBanner(false);
                }}
                className="bg-[#59549F] hover:bg-[#48438A] text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Open Request
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`startup_shortlisted_banner_dismissed_${userId}`, "true");
                  setShowStartupShortlistedBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Repeat Opportunity Banner */}
        {showRepeatOpportunityBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#F5F4FF] to-[#EBE9FE] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">🚀</span>
              <div className="text-left">
                <h3 className="font-bold text-sm text-[#001032]">Repeat Opportunity</h3>
                <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed">
                  New startup opportunities matching your expertise are now available.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/request"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`repeat_opportunity_dismissed_${userId}`, "true");
                  setShowRepeatOpportunityBanner(false);
                }}
                className="bg-[#59549F] hover:bg-[#48438A] text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Explore Requests
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`repeat_opportunity_dismissed_${userId}`, "true");
                  setShowRepeatOpportunityBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Proposal Suggestion Banner */}
        {showProposalSuggestionBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#F5F4FF] to-[#EBE9FE] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">⏳</span>
              <div className="text-left">
                <h3 className="font-bold text-sm text-[#001032]">Action Required</h3>
                <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed">
                  This opportunity is still accepting proposals.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/request"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`proposal_suggestion_dismissed_${userId}`, "true");
                  setShowProposalSuggestionBanner(false);
                }}
                className="bg-[#59549F] hover:bg-[#48438A] text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Submit Proposal
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`proposal_suggestion_dismissed_${userId}`, "true");
                  setShowProposalSuggestionBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Proposal Viewed Banner */}
        {showProposalViewedBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#F5F4FF] to-[#EBE9FE] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#59549F]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">👁️</span>
              <div className="text-left">
                <h3 className="font-bold text-sm text-[#001032]">Proposal Insights</h3>
                <p className="text-xs text-[#001032]/80 mt-0.5 leading-relaxed">
                  A startup reviewed your proposal.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/request"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`proposal_viewed_banner_dismissed_${userId}`, "true");
                  setShowProposalViewedBanner(false);
                }}
                className="bg-[#59549F] hover:bg-[#48438A] text-white font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Continue Engagement
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`proposal_viewed_banner_dismissed_${userId}`, "true");
                  setShowProposalViewedBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Awaiting Response Banner */}
        {showAwaitingResponseBanner && (
          <div className="mx-2.5 my-2 p-4 bg-gradient-to-r from-[#FFFBEB] to-[#FEF3C7] text-[#001032] rounded-2xl shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] border border-[#F59E0B]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">⌛</span>
              <div className="text-left">
                <h3 className="font-medium text-sm text-[#001032]">Proposal Tracking</h3>
                <p className="text-xs font-normal text-[#001032]/80 mt-0.5 leading-relaxed">
                  Your proposal is awaiting startup response.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
              <Link
                to="/request"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`awaiting_response_banner_dismissed_${userId}`, "true");
                  setShowAwaitingResponseBanner(false);
                }}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Track Status
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`awaiting_response_banner_dismissed_${userId}`, "true");
                  setShowAwaitingResponseBanner(false);
                }}
                className="text-[#001032]/60 hover:text-[#001032] p-1 rounded-full hover:bg-white/40 transition-colors cursor-pointer shrink-0"
              >
                <RxCross2 size={18} />
              </button>
            </div>
          </div>
        )}
        {/* Global Topbar - Spans full width across both columns */}
        <div id="topbar" className="flex items-stretch w-[100%] px-2 gap-1 lg:gap-2 mb-2 shrink-0">
          <div
            className="flex justify-between items-center flex-1 border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl lg:px-4 px-2 py-2 lg:mr-1 lg:ml-1 bg-white"
          >
            <div>
              <p className="font-semibold text-[#001032] text-sm lg:text-[16px] px-0.5">
                Welcome, {profile?.companyName || profile?.name || "User"}!
              </p>
            </div>
            <div className="flex items-center gap-1 lg:gap-x-3">
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
              className="hidden lg:flex border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl bg-white lg:px-4 px-2.5 items-center justify-between gap-2 py-1.5 shrink-0 group hover:border-[#59549F] transition-all duration-300 cursor-pointer lg:mr-1 lg:w-[64.4%]"
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

        {/* Desktop Layout */}
        <div className="hidden lg:block flex-1 overflow-hidden">
          <div className="bg-gray-200 px-3 pt-1 flex gap-3 h-full overflow-hidden pb-3">
            {/* Scrollable Left Column */}
            <div id="left" className="w-[70%] h-full overflow-y-auto scrollbar-hide pb-6 flex flex-col gap-3 pr-1">
              
              {/* Row 1: Who Searched Your Profile & Trigger/Automation Cards */}
              <div id="desktop-top-row-1" className="flex items-stretch gap-3 w-full">
                
                {/* Card 1: Who Searched Your Profile (LinkedIn-style) */}
                <div className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 h-[47vh] w-[50%] flex flex-col justify-between">
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <h1 className="text-3xl font-semibold text-[#202020] my-2 ">
                      Who Searched Your Profile
                    </h1>
                    
                    <div className="flex items-center gap-3 my-2 shrink-0">
                      <h1 className="text-4xl font-bold text-[#59549F]">247</h1>
                      <span className="text-green-600 bg-green-100 text-xs px-2 py-0.5 rounded-full font-semibold flex items-center shrink-0">
                        ↑ 18.4%
                      </span>
                      <span className="text-gray-500 text-xs font-medium truncate">this week</span>
                    </div>

                    <div className="flex flex-col gap-2.5 my-2 overflow-y-auto flex-1 pr-1 scrollbar-hide">
                      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#E8E7FD] text-[#59549F] flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                          TV
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs text-[#202020] truncate">TechVentures Capital</p>
                          <p className="text-[10px] text-[#6F6F6F] truncate">Investor • Searched via "FinTech Startup"</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#0B5EFF] flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                          AN
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-xs text-[#202020] truncate">Angel Network India</p>
                          <p className="text-[10px] text-[#6F6F6F] truncate">Syndicate • Viewed Pitch Deck</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 shrink-0">
                    <button className="w-full text-center text-xs font-semibold text-[#59549F] hover:underline cursor-pointer">
                      View all search history →
                    </button>
                  </div>
                </div>

                {/* Card 2: Ecosystem Alerts & Automations */}
                <div className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 h-[47vh] w-[50%] flex flex-col justify-between">
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <h1 className="text-3xl font-semibold text-[#202020] my-2 ">
                      Ecosystem Insights
                    </h1>

                    <div className="flex flex-col gap-2.5 my-3 overflow-y-auto flex-1 pr-1 scrollbar-hide">
                      {!isPortfolioMissing && !isProfileIncomplete && !isRequestEmpty && !showDraftRecoveryBanner && !showMultipleProposalsBanner && !showAwaitingResponseBanner && !showPaymentReleasedBanner && !showFastResponderBanner && !showReputationMomentumBanner ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-8">
                          <span className="text-2xl mb-2">🎉</span>
                          <p className="text-xs font-semibold text-gray-700">All caught up!</p>
                          <p className="text-[10px] text-gray-400 mt-1 max-w-[180px]">Your profile and ecosystem insights are completely optimized.</p>
                        </div>
                      ) : (
                        <>
                          {showReputationMomentumBanner && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-gradient-to-r from-[#F5F3FF] to-[#FAF5FF] border border-[#DDD6FE]/60 rounded-xl text-[#001032] shrink-0 shadow-sm animate-in fade-in duration-300">
                              <span className="text-sm shrink-0">📈</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-[#6D28D9]">Reputation Momentum</p>
                                <p className="mt-0.5 text-[#6D28D9]/90 font-medium">
                                  Your completion performance is increasing your startup visibility.
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <Link 
                                    to="/analytics" 
                                    className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:opacity-90 text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    View Analytics
                                  </Link>
                                  <button
                                    onClick={() => {
                                      const userId = profile?.userId?._id || profile?.userId;
                                      localStorage.setItem(`reputation_momentum_banner_dismissed_${userId}`, "true");
                                      setShowReputationMomentumBanner(false);
                                    }}
                                    className="text-[#6D28D9]/80 hover:text-[#6D28D9] text-[9px] font-semibold hover:underline cursor-pointer"
                                  >
                                    Dismiss
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {showFastResponderBanner && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-gradient-to-r from-[#FFF4ED] to-[#FFF9F5] border border-[#F5E6DA]/60 rounded-xl text-[#001032] shrink-0 shadow-sm animate-in fade-in duration-300">
                              <span className="text-sm shrink-0">⚡</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-[#E65100]">Performance Insights</p>
                                <p className="mt-0.5 text-[#E65100]/90 font-medium">
                                  You are responding faster than most professionals in your category.
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <Link 
                                    to="/profile" 
                                    className="bg-gradient-to-r from-[#FF9800] to-[#E65100] hover:opacity-90 text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    View Performance
                                  </Link>
                                  <button
                                    onClick={() => {
                                      const userId = profile?.userId?._id || profile?.userId;
                                      localStorage.setItem(`fast_responder_banner_dismissed_${userId}`, "true");
                                      setShowFastResponderBanner(false);
                                    }}
                                    className="text-[#E65100]/80 hover:text-[#E65100] text-[9px] font-semibold hover:underline cursor-pointer"
                                  >
                                    Dismiss
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {showPaymentReleasedBanner && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border border-[#059669]/40 rounded-xl text-[#001032] shrink-0 shadow-sm animate-in fade-in duration-300">
                              <span className="text-sm shrink-0">💰</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-[#059669]">Payment Received</p>
                                <p className="mt-0.5 text-[#059669]/90 font-medium">
                                  Milestone payment has been released successfully.
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <Link 
                                    to="/deal/documentation" 
                                    className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:opacity-90 text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    View Transaction
                                  </Link>
                                  <button
                                    onClick={() => {
                                      const userId = profile?.userId?._id || profile?.userId;
                                      localStorage.setItem(`payment_released_banner_dismissed_${userId}`, "true");
                                      setShowPaymentReleasedBanner(false);
                                    }}
                                    className="text-[#059669]/80 hover:text-[#059669] text-[9px] font-semibold hover:underline cursor-pointer"
                                  >
                                    Dismiss
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {showAwaitingResponseBanner && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-gradient-to-r from-[#FFF5F5] to-[#FFFAFA] border border-[#FC8181]/40 rounded-xl text-[#742A2A] shrink-0 shadow-sm animate-in fade-in duration-300">
                              <span className="text-sm shrink-0">⏳</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-[#9B2C2C]">Action Required</p>
                                <p className="mt-0.5 text-[#C53030]/90 font-medium">
                                  A proposal is awaiting your response.
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <Link 
                                    to="/request" 
                                    className="bg-gradient-to-r from-[#E53E3E] to-[#C53030] hover:opacity-90 text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    Continue Negotiation
                                  </Link>
                                  <button
                                    onClick={() => {
                                      const userId = profile?.userId?._id || profile?.userId;
                                      localStorage.setItem(`awaiting_response_dismissed_${userId}`, "true");
                                      setShowAwaitingResponseBanner(false);
                                    }}
                                    className="text-[#E53E3E]/80 hover:text-[#C53030] text-[9px] font-semibold hover:underline cursor-pointer"
                                  >
                                    Dismiss
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {showMultipleProposalsBanner && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-gradient-to-r from-[#F8F7FF] to-[#F1F0FF] border border-[#59549F]/30 rounded-xl text-[#001032] shrink-0 shadow-sm animate-in fade-in duration-300">
                              <span className="text-sm shrink-0">📊</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-[#59549F]">Multiple Options</p>
                                <p className="mt-0.5 text-gray-600 font-medium">
                                  You now have multiple execution options available for comparison.
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <Link 
                                    to="/request" 
                                    className="bg-gradient-to-r from-[#59549F] to-[#48438A] hover:opacity-90 text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    Compare Proposals
                                  </Link>
                                  <button
                                    onClick={() => {
                                      const userId = profile?.userId?._id || profile?.userId;
                                      localStorage.setItem(`multiple_proposals_dismissed_${userId}`, "true");
                                      setShowMultipleProposalsBanner(false);
                                    }}
                                    className="text-[#59549F]/80 hover:text-[#59549F] text-[9px] font-semibold hover:underline cursor-pointer"
                                  >
                                    Dismiss
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {showDraftRecoveryBanner && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl text-[#5B21B6] shrink-0">
                              <span className="text-sm shrink-0">📝</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-[#4C1D95]">Draft Recovery</p>
                                <p className="mt-0.5 text-[#5B21B6]/90">
                                  Your request draft is waiting to be published.
                                </p>
                                <div className="mt-2 flex justify-between items-center">
                                  <Link 
                                    to="/deal/dealdraft" 
                                    className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    Continue Draft
                                  </Link>
                                  <button
                                    onClick={() => {
                                      const userId = profile?.userId?._id || profile?.userId;
                                      localStorage.setItem(`deal_draft_recovery_dismissed_${userId}`, "true");
                                      setShowDraftRecoveryBanner(false);
                                    }}
                                    className="text-[#59549F]/80 hover:text-[#59549F] text-[9px] font-semibold hover:underline cursor-pointer"
                                  >
                                    Dismiss
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {isRequestEmpty && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-amber-50 border border-amber-200/50 rounded-xl text-amber-900 shrink-0">
                              <span className="text-sm shrink-0">📋</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-amber-950">Create Your First Request</p>
                                <p className="mt-0.5 text-amber-900/90">
                                  You haven’t created any execution requests yet.
                                </p>
                                <div className="mt-2 flex justify-start">
                                  <Link 
                                    to="/request" 
                                    state={{ showEmptyRequestPopup: true }}
                                    className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    Create First Request
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                          {isPortfolioMissing && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-amber-50 border border-amber-200/50 rounded-xl text-amber-900 shrink-0">
                              <span className="text-sm shrink-0">⚠️</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-amber-950">Showcase Your Work</p>
                                <p className="mt-0.5 text-amber-900/90">
                                  Your profile has been active without a portfolio. Add case studies or past work to showcase your expertise and stand out to potential partners.
                                </p>
                                <div className="mt-2 flex justify-start">
                                  <Link 
                                    to="/profile" 
                                    className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    Upload Portfolio
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                          {isProfileIncomplete && (
                            <div className="flex items-start gap-2.5 p-2.5 bg-amber-50 border border-amber-200/50 rounded-xl text-amber-900 shrink-0">
                              <span className="text-sm shrink-0">⚠️</span>
                              <div className="text-[10px] leading-relaxed w-full">
                                <p className="font-bold text-amber-950">Complete Your Profile</p>
                                <p className="mt-0.5 text-amber-900/90">
                                  {profile?.role === "startup" 
                                    ? "Your startup profile is incomplete. Complete your profile to improve discoverability and trust."
                                    : profile?.role === "investor"
                                    ? "Complete your investor profile to unlock stronger startup matching."
                                    : "Professionals with complete profiles receive significantly more startup engagement."}
                                </p>
                                <div className="mt-2 flex justify-start">
                                  <Link 
                                    to="/profile" 
                                    className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                                  >
                                    Complete Profile
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {showExploreProfessionalsBanner && (
                <div className="rounded-2xl bg-gradient-to-r from-[#59549F] to-[#48438A] p-4 text-white flex items-center justify-between gap-4 shadow-[0px_4px_12px_rgba(89,84,159,0.2)] border border-[#59549F]/20 animate-in fade-in slide-in-from-top-2 duration-300 my-2">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-2xl shrink-0">🔍</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">Explore Professionals</h3>
                      <p className="text-xs text-white/90 mt-0.5 leading-relaxed">
                        Explore curated execution partners aligned with your startup needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <Link 
                      to="/request" 
                      state={{ defaultTab: "received" }}
                      onClick={() => {
                        const userId = profile?.userId?._id || profile?.userId;
                        localStorage.setItem(`explore_professionals_dismissed_${userId}`, "true");
                        setShowExploreProfessionalsBanner(false);
                      }}
                      className="bg-white hover:bg-purple-50 text-[#59549F] font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Discover Professionals
                    </Link>
                    <button
                      onClick={() => {
                        const userId = profile?.userId?._id || profile?.userId;
                        localStorage.setItem(`explore_professionals_dismissed_${userId}`, "true");
                        setShowExploreProfessionalsBanner(false);
                      }}
                      className="text-white/80 hover:text-white text-xs font-semibold hover:underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}

              {showFirstProposalBanner && (
                <div className="rounded-2xl bg-gradient-to-r from-[#59549F] to-[#48438A] p-4 text-white flex items-center justify-between gap-4 shadow-[0px_4px_12px_rgba(89,84,159,0.2)] border border-[#59549F]/20 animate-in fade-in slide-in-from-top-2 duration-300 my-2">
                  <div className="flex items-center gap-3 text-left">
                    <span className="text-2xl shrink-0">🎉</span>
                    <div>
                      <h3 className="font-bold text-sm text-white">First Proposal Received</h3>
                      <p className="text-xs text-white/90 mt-0.5 leading-relaxed">
                        You received your first proposal on Copteno.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <Link 
                      to="/request" 
                      state={{ defaultTab: "received" }}
                      onClick={() => {
                        const userId = profile?.userId?._id || profile?.userId;
                        localStorage.setItem(`first_proposal_dismissed_${userId}`, "true");
                        setShowFirstProposalBanner(false);
                      }}
                      className="bg-white hover:bg-purple-50 text-[#59549F] font-bold py-1.5 px-4 rounded-xl text-xs shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Review Proposal
                    </Link>
                    <button
                      onClick={() => {
                        const userId = profile?.userId?._id || profile?.userId;
                        localStorage.setItem(`first_proposal_dismissed_${userId}`, "true");
                        setShowFirstProposalBanner(false);
                      }}
                      className="text-white/80 hover:text-white text-xs font-semibold hover:underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}


              {/* Row 2: Progress Statistics & Profile Row */}
              <div id="top" className="flex items-stretch gap-3">
                <div
                  id="left"
                  className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 h-[47vh] w-[50%]"
                >
                  <h1 className="text-3xl font-semibold text-[#202020] my-3">
                    Progress Statistics
                  </h1>
                  <div className="flex items-center gap-3 my-6 text-[#202020]">
                    <h1 className="text-2xl font-semibold ">{stats.activityPercentage}%</h1>
                    <p className="w-[20%] font-normal text-md leading-5">
                      Total Activity
                    </p>
                  </div>

                  <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-5">
                    <div className="w-full">
                      <ProgressBar percentage={Math.min(100, (stats.onApproval / 20) * 100)} />
                      <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.onApproval / 20) * 100))}%</p>
                    </div>
                    <div className="w-full">
                      <ProgressBar2 percentage={Math.min(100, (stats.registered / 20) * 100)} />
                      <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.registered / 20) * 100))}%</p>
                    </div>
                    <div className="w-full">
                      <ProgressBar3 percentage={Math.min(100, (stats.requests / 20) * 100)} />
                      <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.requests / 20) * 100))}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-1 rounded-3xl">
                    <div>
                      <div className="bg-[#760BFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <FaImage />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        {stats.onApproval}
                      </p>
                      <p className="text-[#202020]">On Approval</p>
                    </div>
                    <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                    <div>
                      <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <RiCheckDoubleLine />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        {stats.registered}
                      </p>
                      <p>Registered</p>
                    </div>

                    <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                    <div>
                      <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <FaCalendarCheck />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        {stats.requests}
                      </p>
                      <p>Requests</p>
                    </div>
                  </div>
                </div>

                <div
                  id="right"
                  className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5  h-[47vh] w-[50%] flex flex-col justify-between"
                >
                  <div id="top-sec">
                    <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-semibold text-[#202020] my-2">
                        Profile
                      </h1>
                    </div>
                    <div className="min-h-[60px]"> 
                      <p className="text-sm text-[#6F6F6F] w-[90%] my-1 line-clamp-3">
                        {profile?.bio || "Your profile bio will appear here once you complete your profile. Add details about yourself to attract more opportunities."}
                      </p>
                    </div>
                  </div>

                  <div id="bottom-sec">
                    <div className="flex justify-between items-center gap-5 mt-2 mb-2">
                      <div id="members" className="w-[50%] ">
                        <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                          <p className="text-lg text-gray-500 text-center pb-1">
                            People
                          </p>
                          <div className="flex -space-x-2 justify-center">
                            {members.map((_, i) => (
                              <div
                                key={i}
                                className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div id="subscription" className=" w-[50%] ">
                        <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                          <p className="text-lg text-gray-500 text-center pb-1">
                            Optimisation
                          </p>

                          <div className="w-full bg-yellow-100 rounded-xl h-10 overflow-hidden">
                            <div
                              className="bg-yellow-400 h-full rounded-xl flex items-center justify-center transition-all"
                              style={{ width: `${profileCompletion}%` }}
                            >
                              <span className="text-gray-800 font-bold text-sm">
                                {Math.round(profileCompletion)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3">
                      <div className="bg-yellow-200 rounded-xl">
                        <div
                          className="bg-yellow-400 h-[10px] flex items-center justify-center transition-all rounded-xl"
                          style={{ width: `${profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-2">
                      <Link to="/profile">
                        <button className="w-full py-1">Complete Your Profile</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requests Section */}
              <div id="bottom" className="bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl mt-0 h-[41vh]">
                <div className="flex items-center justify-between px-5 py-4">
                  <h1 className="text-3xl text-[#202020] font-semibold">
                    Requests
                  </h1>
                  <div className="flex items-center gap-1 ">
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                      <IoIosArrowRoundBack size={25} />
                    </div>
                    <h1 className="text-[#202020] font-medium ">Today</h1>
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                      <IoIosArrowRoundForward size={25} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 px-4 overflow-x-auto pb-2">
                  {recentRequests.length > 0 ? (
                    recentRequests.map((req, idx) => {
                      const isDark = idx % 2 === 1;
                      const isSentByMe = profile?.role === "startup";
                      const raiser = req.raisedBy;
                      
                      const raiserName = isSentByMe 
                        ? (req.service || "My Request") 
                        : (raiser?.businessDetails?.firstName 
                          ? `${raiser.businessDetails.firstName} ${raiser.businessDetails.lastName || ""}`
                          : "Unknown User");
                      
                      const raiserRole = isSentByMe 
                        ? (req.status || "Raised") 
                        : (raiser?.role || "User");

                      return (
                        <div 
                          key={req._id}
                          className={`border min-w-[31%] max-w-[35%] p-3 rounded-3xl mb-2 flex flex-col justify-between ${
                            isDark ? "bg-[#001426] text-white" : "bg-[#F1F1F1] text-[#202020]"
                          }`}
                        >
                          <div>
                            <p className={`${isDark ? "text-gray-400" : "text-[#6F6F6F]"} text-sm`}>
                              {formatTime(req.createdAt)}
                            </p>
                            <h1 className="my-3 leading-5 font-semibold text-lg line-clamp-2">
                              {req.service}
                            </h1>
                          </div>
                          <div>
                            <Link to="/requests">
                              <button className={`py-1 px-4 my-1 mb-4 rounded-md transition-all ${
                                isDark 
                                  ? "bg-[#FF6812] text-white hover:bg-white hover:text-[#FF6812]" 
                                  : "bg-[#FF6812] text-white hover:bg-white hover:text-[#FF6812]"
                              }`}>
                                Check status
                              </button>
                            </Link>
                            <div className="flex items-center gap-2 my-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-300"}`}>
                                <CgProfile size={20} />
                              </div>
                              <div className="text-sm">
                                <p className="font-medium">{raiserName}</p>
                                <p className="opacity-70 capitalize">{raiserRole.replace("_", " ")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full text-center py-10 text-gray-400">
                      No recent requests found.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              id="right"
              className="w-[30%] h-full bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl p-4 text-[#202020] overflow-y-auto scrollbar-hide pb-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold my-4">Activity</p>
                <div className="flex items-center gap-1 border border-[#6F6F6F] p-1 px-3 rounded-2xl">
                  <FaCalendar />
                  <p>last 7 days</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 py-5">
                <p className="text-3xl font-semibold">{stats.weeklyConnects || 0}</p>
                <p className="text-md font-medium">Connects</p>
              </div>

              <div>
                <Graph1 />
              </div>

              <div className="bg-[#F1F1F1] px-8 py-4 mt-4 rounded-2xl">
                <h3 className="text-gray-900 text-[18px] font-semibold mb-3">
                  New Registrations
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  {newRegistrations.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-start gap-3">
                        {idx === 0 ? (
                          <RiCheckDoubleLine
                            size={24}
                            className="text-blue-500 text-xs mt-1"
                          />
                        ) : (
                          <RiCheckLine
                            size={24}
                            className="text-gray-400 text-xs mt-1"
                          />
                        )}
                        <div>
                          <p className="text-sm mb-1 text-gray-500">
                            {item.name}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.hours}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden bg-gray-100 h-auto">
          <div>
            {/* Mobile Card 1: Who Searched Your Profile */}
            <div className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 mt-2 m-2 flex flex-col justify-between min-h-[300px]">
              <div className="flex flex-col flex-1 overflow-hidden">
                <h1 className="text-xl font-semibold text-[#202020] my-1">
                  Who Searched Your Profile
                </h1>
                
                <div className="flex items-center gap-3 my-2 shrink-0">
                  <h1 className="text-3xl font-bold text-[#59549F]">247</h1>
                  <span className="text-green-600 bg-green-100 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center shrink-0">
                    ↑ 18.4%
                  </span>
                  <span className="text-gray-500 text-[10px] font-medium truncate">this week</span>
                </div>

                <div className="flex flex-col gap-2.5 my-2">
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#E8E7FD] text-[#59549F] flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                      TV
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs text-[#202020] truncate">TechVentures Capital</p>
                      <p className="text-[10px] text-[#6F6F6F] truncate">Investor • Searched via "FinTech Startup"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#E1F0FF] text-[#0B5EFF] flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                      AN
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs text-[#202020] truncate">Angel Network India</p>
                      <p className="text-[10px] text-[#6F6F6F] truncate">Syndicate • Viewed Pitch Deck</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 mt-2 shrink-0">
                <button className="w-full text-center text-xs font-semibold text-[#59549F] hover:underline cursor-pointer">
                  View all search history →
                </button>
              </div>
            </div>

            {showExploreProfessionalsBanner && (
              <div className="rounded-2xl bg-gradient-to-r from-[#59549F] to-[#48438A] p-4 text-white flex flex-col items-start gap-3 shadow-[0px_4px_12px_rgba(89,84,159,0.2)] border border-[#59549F]/20 animate-in fade-in slide-in-from-top-2 duration-300 mx-2 my-2 text-left">
                <div className="flex items-start gap-2.5">
                  <span className="text-xl shrink-0">🔍</span>
                  <div>
                    <h3 className="font-bold text-xs text-white">Explore Professionals</h3>
                    <p className="text-[10px] text-white/90 mt-0.5 leading-relaxed">
                      Explore curated execution partners aligned with your startup needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full mt-1">
                  <Link 
                    to="/request" 
                    state={{ defaultTab: "received" }}
                    onClick={() => {
                      const userId = profile?.userId?._id || profile?.userId;
                      localStorage.setItem(`explore_professionals_dismissed_${userId}`, "true");
                      setShowExploreProfessionalsBanner(false);
                    }}
                    className="bg-white hover:bg-purple-50 text-[#59549F] font-bold py-1 px-3.5 rounded-lg text-[10px] shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    Discover Professionals
                  </Link>
                  <button
                    onClick={() => {
                      const userId = profile?.userId?._id || profile?.userId;
                      localStorage.setItem(`explore_professionals_dismissed_${userId}`, "true");
                      setShowExploreProfessionalsBanner(false);
                    }}
                    className="text-white/80 hover:text-white text-[10px] font-semibold hover:underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Card 2: Ecosystem Insights */}
            <div className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 mt-3 m-2 flex flex-col justify-between min-h-[300px]">
              <div className="flex flex-col flex-1 overflow-hidden">
                <h1 className="text-xl font-semibold text-[#202020] my-1">
                  Ecosystem Insights
                </h1>
                <div className="flex flex-col gap-2.5 my-3">
                  {!isPortfolioMissing && !isProfileIncomplete && !isRequestEmpty && !showDraftRecoveryBanner ? (
                    <div className="flex flex-col items-center justify-center h-full text-center py-6">
                      <span className="text-2xl mb-2">🎉</span>
                      <p className="text-xs font-semibold text-gray-700">All caught up!</p>
                      <p className="text-[10px] text-gray-400 mt-1 max-w-[180px]">Your profile and ecosystem insights are completely optimized.</p>
                    </div>
                  ) : (
                    <>
                      {showDraftRecoveryBanner && (
                        <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl text-[#5B21B6] shrink-0">
                          <span className="text-sm shrink-0">📝</span>
                          <div className="text-[10px] leading-relaxed w-full">
                            <p className="font-bold text-[#4C1D95]">Draft Recovery</p>
                            <p className="mt-0.5 text-[#5B21B6]/90">
                              Your request draft is waiting to be published.
                            </p>
                            <div className="mt-2 flex justify-between items-center">
                              <Link 
                                to="/deal/dealdraft" 
                                className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                              >
                                Continue Draft
                              </Link>
                              <button
                                onClick={() => {
                                  const userId = profile?.userId?._id || profile?.userId;
                                  localStorage.setItem(`deal_draft_recovery_dismissed_${userId}`, "true");
                                  setShowDraftRecoveryBanner(false);
                                }}
                                className="text-[#59549F]/80 hover:text-[#59549F] text-[9px] font-semibold hover:underline cursor-pointer"
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {isRequestEmpty && (
                        <div className="flex items-start gap-2.5 p-2.5 bg-amber-50 border border-amber-200/50 rounded-xl text-amber-900 shrink-0">
                          <span className="text-sm shrink-0">📋</span>
                          <div className="text-[10px] leading-relaxed w-full">
                            <p className="font-bold text-amber-950">Create Your First Request</p>
                            <p className="mt-0.5 text-amber-900/90">
                              You haven’t created any execution requests yet.
                            </p>
                            <div className="mt-2 flex justify-start">
                              <Link 
                                to="/request" 
                                state={{ showEmptyRequestPopup: true }}
                                className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                              >
                                Create First Request
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                      {isPortfolioMissing && (
                        <div className="flex items-start gap-2.5 p-2.5 bg-amber-50 border border-amber-200/50 rounded-xl text-amber-900 shrink-0">
                          <span className="text-sm shrink-0">⚠️</span>
                          <div className="text-[10px] leading-relaxed w-full">
                            <p className="font-bold text-amber-950">Showcase Your Work</p>
                            <p className="mt-0.5 text-amber-900/90">
                              Your profile has been active without a portfolio. Add case studies or past work to showcase your expertise and stand out to potential partners.
                            </p>
                            <div className="mt-2 flex justify-start">
                              <Link 
                                to="/profile" 
                                className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                              >
                                Upload Portfolio
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                      {isProfileIncomplete && (
                        <div className="flex items-start gap-2.5 p-2.5 bg-amber-50 border border-amber-200/50 rounded-xl text-amber-900 shrink-0">
                          <span className="text-sm shrink-0">⚠️</span>
                          <div className="text-[10px] leading-relaxed w-full">
                            <p className="font-bold text-amber-950">Complete Your Profile</p>
                            <p className="mt-0.5 text-amber-900/90">
                              {profile?.role === "startup" 
                                ? "Your startup profile is incomplete. Complete your profile to improve discoverability and trust."
                                : profile?.role === "investor"
                                ? "Complete your investor profile to unlock stronger startup matching."
                                : "Professionals with complete profiles receive significantly more startup engagement."}
                            </p>
                            <div className="mt-2 flex justify-start">
                              <Link 
                                to="/profile" 
                                className="bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1 px-3.5 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                              >
                                Complete Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>


            <div id="right" className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-3 py-4 mt-3 m-2 flex flex-col justify-between min-h-[320px]">
              <div id="top-sec">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-[#202020] my-1 flex items-center gap-1.5">
                    Profile
                    {profile?.role === "investor" && profile?.paymentStatus === "approved" && (
                      <span className="inline-flex items-center gap-0.5 bg-[#E8F8F5] text-[#2ECC71] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#2ECC71]/20 shadow-sm shrink-0">
                        🎖️ Verified
                      </span>
                    )}
                  </h1>
                </div>
                <div className="min-h-[42px]">
                  <p className="text-xs text-[#6F6F6F] my-1 line-clamp-3">
                    {profile?.bio || "Your profile bio will appear here once you complete your profile."}
                  </p>
                </div>
              </div>

              <div id="bottom-sec">
                <div className="flex justify-between items-center gap-3 mt-4 mb-2">
                  <div id="members" className="w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                      <p className="text-sm text-gray-500 text-center pb-1">
                        People
                      </p>
                      <div className="flex -space-x-2 justify-center">
                        {members.map((_, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div id="subscription" className=" w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                      <p className="text-sm text-gray-500 text-center pb-1">
                        Optimisation
                      </p>

                      <div className="w-full bg-yellow-200 rounded-xl h-8 overflow-hidden my-1">
                        <div
                          className="bg-yellow-400 h-full rounded-xl flex items-center justify-center transition-all"
                          style={{ width: `${profileCompletion}%` }}
                        >
                          <span className="text-gray-800 font-bold text-xs">
                            {Math.round(profileCompletion)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3">
                  <div className="bg-yellow-200 rounded-xl">
                    <div
                      className="bg-yellow-400 h-[8px] flex items-center justify-center transition-all rounded-xl"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-2">
                  <Link to="/profile">
                    <button className="w-full py-1">Complete Your Profile</button>
                  </Link>
                </div>
              </div>
            </div>

            <div id="left" className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 mt-3 m-2 ">
              <h1 className="text-xl font-semibold text-[#202020] my-4">
                Progress Statistics
              </h1>
              <div className="flex items-center gap-3 my-6 text-[#202020]">
                <h1 className="text-2xl font-semibold ">{stats.activityPercentage}%</h1>
                <p className="w-[20%] font-normal text-sm leading-5">
                  Total Activity
                </p>
              </div>

              <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-7">
                <div className="w-full">
                  <ProgressBar percentage={Math.min(100, (stats.onApproval / 20) * 100)} />
                  <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.onApproval / 20) * 100))}%</p>
                </div>
                <div className="w-full">
                  <ProgressBar2 percentage={Math.min(100, (stats.registered / 20) * 100)} />
                  <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.registered / 20) * 100))}%</p>
                </div>
                <div className="w-full">
                  <ProgressBar3 percentage={Math.min(100, (stats.requests / 20) * 100)} />
                  <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.requests / 20) * 100))}%</p>
                </div>
              </div>

              <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-3 rounded-3xl">
                <div>
                  <div className="bg-[#760BFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaImage />
                  </div>
                  <p className="text-center  text-sm text-[#202020]">{stats.onApproval}</p>
                  <p className="text-[#202020] text-xs">On Approval</p>
                </div>
                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <RiCheckDoubleLine />
                  </div>
                  <p className="text-center  text-sm text-[#202020]">{stats.registered}</p>
                  <p className="text-[#202020] text-xs">Registered</p>
                </div>

                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaCalendarCheck />
                  </div>
                  <p className="text-center  text-[#202020] text-sm">{stats.requests}</p>
                  <p className="text-[#202020] text-xs">Requests</p>
                </div>
              </div>
            </div>

            <div id="bottom" className="bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl p-5 mt-3 m-2">
              <div className="flex items-center justify-between  py-2">
                <h1 className="text-xl text-[#202020] font-semibold">
                  Requests
                </h1>
                <div className="flex items-center gap-1 ">
                  <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                    <IoIosArrowRoundBack size={25} />
                  </div>
                  <h1 className="text-[#202020] font-medium ">Today</h1>
                  <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                    <IoIosArrowRoundForward size={25} />
                  </div>
                </div>
              </div>

              {/* Opportunity Reminder Banner */}
              {showOpportunityReminderBanner && (
                <div className="bg-gradient-to-r from-[#FFF4ED] to-[#FFF9F5] border border-[#F5E6DA]/60 rounded-xl p-3 mb-4 flex items-center justify-between shadow-sm animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🔔</span>
                    <div>
                      <p className="text-sm font-bold text-[#E65100]">Opportunity Reminder</p>
                      <p className="text-xs text-[#E65100]/90">A relevant startup opportunity is still accepting proposals.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/requests" className="bg-gradient-to-r from-[#FF9800] to-[#E65100] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                      Submit Proposal
                    </Link>
                    <button onClick={() => {
                        const userId = profile?.userId?._id || profile?.userId;
                        localStorage.setItem(`opportunity_reminder_banner_dismissed_${userId}`, "true");
                        setShowOpportunityReminderBanner(false);
                      }} 
                      className="text-[#E65100]/60 hover:text-[#E65100] p-1 transition-colors"
                    >
                      <RxCross2 size={16} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center gap-2 py-2">
                {recentRequests.length > 0 ? (
                  recentRequests.map((req, idx) => {
                    const isDark = idx % 2 === 1;
                    const isSentByMe = profile?.role === "startup";
                    const raiser = req.raisedBy;

                    const raiserName = isSentByMe 
                      ? (req.service || "My Request") 
                      : (raiser?.businessDetails?.firstName 
                        ? `${raiser.businessDetails.firstName} ${raiser.businessDetails.lastName || ""}`
                        : "Unknown User");

                    const raiserRole = isSentByMe 
                      ? (req.status || "Raised") 
                      : (raiser?.role || "User");

                    return (
                      <div 
                        key={req._id}
                        className={`border w-full p-4 rounded-3xl mb-2 ${
                          isDark ? "bg-[#001426] text-white" : "bg-[#F1F1F1] text-[#202020]"
                        }`}
                      >
                        <p className={`${isDark ? "text-gray-300" : "text-[#6F6F6F]"} text-sm`}>
                          {formatTime(req.createdAt)}
                        </p>
                        <h1 className="my-3 w-[85%] leading-5 font-semibold text-lg line-clamp-2">
                          {req.service}
                        </h1>
                        <Link to="/requests">
                          <button className="bg-[#FF6812] text-white py-1 px-4 my-1 mb-4 rounded-md hover:bg-white hover:text-[#FF6812] transition-all">
                            Check status
                          </button>
                        </Link>
                        <div className="flex items-center gap-2 my-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-300"}`}>
                            <CgProfile size={20} />
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">{raiserName}</p>
                            <p className="opacity-70 capitalize">{raiserRole.replace("_", " ")}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full text-center py-6 text-gray-400 text-sm">
                    No recent requests found.
                  </div>
                )}
              </div>
            </div>

            <div
              id="right"
              className="mt-2 m-2 h-[96vh] bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl p-4 text-[#202020]"
            >
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold my-4">Activity</p>
                <div className="flex items-center gap-1 border border-[#6F6F6F] p-1 px-3 rounded-2xl">
                  <FaCalendar />
                  <p>last 7 days</p>
                </div>
              </div>

              {/* Ecosystem Activity Banner */}
              {showEcosystemActivityBanner && (
                <div className="bg-gradient-to-r from-[#F0FDF4] to-[#F8FAFC] border border-[#BBF7D0]/60 rounded-xl p-3 mt-1 mb-3 flex items-center justify-between shadow-sm animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🌟</span>
                    <div>
                      <p className="text-sm font-bold text-[#166534]">Ecosystem Activity</p>
                      <p className="text-xs text-[#166534]/90">Your profile engagement and opportunity visibility are increasing.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/analytics" className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                      View Activity
                    </Link>
                    <button onClick={() => {
                        const userId = profile?.userId?._id || profile?.userId;
                        localStorage.setItem(`ecosystem_activity_banner_dismissed_${userId}`, "true");
                        setShowEcosystemActivityBanner(false);
                      }} 
                      className="text-[#166534]/60 hover:text-[#166534] p-1 transition-colors"
                    >
                      <RxCross2 size={16} />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-5 p-5 py-8">
                <p className="text-3xl font-semibold">{stats.weeklyConnects || 0}</p>
                <p className="text-md font-medium">Connects</p>
              </div>

              <div>
                <Graph1 />
              </div>

              {/* Visibility Upgrade Banner */}
              {showVisibilityUpgradeBanner && (
                <div className="bg-gradient-to-br from-[#FFF8E7] to-[#FFF3CD] border border-[#FFD700]/40 rounded-2xl p-4 mt-5 shadow-sm relative overflow-hidden group animate-in fade-in">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#FFD700]/20 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#F59E0B] flex items-center justify-center shadow-inner">
                          <span className="text-white text-sm">👑</span>
                        </div>
                        <h4 className="font-bold text-[#B45309] text-sm uppercase tracking-wider">Premium Access</h4>
                      </div>
                      <button 
                        onClick={() => {
                          const userId = profile?.userId?._id || profile?.userId;
                          localStorage.setItem(`visibility_upgrade_banner_dismissed_${userId}`, "true");
                          setShowVisibilityUpgradeBanner(false);
                        }}
                        className="text-[#B45309]/40 hover:text-[#B45309] transition-colors"
                      >
                        <RxCross2 size={18} />
                      </button>
                    </div>
                    
                    <p className="text-[#92400E] text-xs leading-relaxed font-medium">
                      Upgrade to improve visibility and access more startup opportunities.
                    </p>
                    
                    <Link 
                      to="/pricing"
                      state={{ 
                        isUpgradeFlow: true, 
                        role: profile?.role, 
                        currentPlanAmount: profile?.plan?.amount || 0,
                        upgradeType: "growth"
                      }}
                      className="mt-1 w-full bg-gradient-to-r from-[#B45309] to-[#92400E] hover:from-[#92400E] hover:to-[#78350F] text-white text-xs font-bold py-2.5 rounded-xl shadow-md text-center transition-all duration-300 transform active:scale-[0.98]"
                    >
                      Upgrade Plan
                    </Link>
                  </div>
                </div>
              )}

              <div className="bg-[#F1F1F1] px-8 py-6 mt-5 rounded-2xl">
                <h3 className="text-gray-900 text-[18px] font-semibold mb-3">
                  New Registrations
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  {newRegistrations.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-start gap-3">
                        {idx === 0 ? (
                          <RiCheckDoubleLine
                            size={24}
                            className="text-blue-500 text-xs mt-1"
                          />
                        ) : (
                          <RiCheckLine
                            size={24}
                            className="text-gray-400 text-xs mt-1"
                          />
                        )}
                        <div>
                          <p className="text-sm mb-1 text-gray-500">
                            {item.name}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.hours}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deal Completion Success Modal */}
      {showDealCompletionModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#FFF4ED] rounded-full flex items-center justify-center mb-4 shrink-0">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-[#001032] mb-2">Deal Completed!</h2>
            <p className="text-sm text-[#001032]/70 mb-8 leading-relaxed">
              Your project has been completed successfully.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <Link
                to={`/deal/documentation`}
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`deal_completion_seen_${completedDealData?._id || "debug"}_${userId}`, "true");
                  setShowDealCompletionModal(false);
                }}
                className="w-full bg-[#E65100] hover:bg-[#EF6C00] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center"
              >
                Request Review
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`deal_completion_seen_${completedDealData?._id || "debug"}_${userId}`, "true");
                  setShowDealCompletionModal(false);
                }}
                className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#001032] font-semibold py-3 px-4 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Submitted Success Modal */}
      {showProposalSubmittedModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#F3E8FF] rounded-full flex items-center justify-center mb-4 shrink-0">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-[#001032] mb-2">Proposal Sent!</h2>
            <p className="text-sm text-[#001032]/70 mb-8 leading-relaxed">
              Your proposal has been sent successfully.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => {
                  localStorage.setItem(`proposal_submitted_seen_${submittedProposalId}_${userId}`, "true");
                  setShowProposalSubmittedModal(false);
                  navigate("/request");
                }}
                className="w-full bg-[#9333EA] hover:bg-[#7E22CE] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all"
              >
                Track Proposal
              </button>
              <button
                onClick={() => {
                  localStorage.setItem(`proposal_submitted_seen_${submittedProposalId}_${userId}`, "true");
                  setShowProposalSubmittedModal(false);
                }}
                className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#001032] font-semibold py-3 px-4 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deal Activated Success Toast */}
      {showDealActivatedModal && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center bg-white rounded-2xl p-3 md:p-4 shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.3)] border border-[#E8F5E9] w-[95%] md:w-[90%] max-w-[450px] animate-in slide-in-from-top-8 fade-in duration-300">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-[#E8F5E9] rounded-full flex items-center justify-center mr-2 md:mr-4 shrink-0">
            <span className="text-lg md:text-xl text-[#2B4E38]"><IoMdCheckmark /></span>
          </div>
          <div className="flex-1 mr-2 md:mr-4">
            <h3 className="font-bold text-[#001032] text-xs md:text-sm">Deal Accepted!</h3>
            <p className="text-[10px] md:text-xs text-[#001032]/70 mt-0.5 leading-tight">Your deal workspace is now active.</p>
          </div>
          <div className="flex flex-row gap-1.5 md:gap-2 shrink-0">
            <Link
              to="/deal/documentation"
              onClick={() => {
                const userId = profile?.userId?._id || profile?.userId;
                localStorage.setItem(`deal_activated_trigger_${userId}`, "false");
                setShowDealActivatedModal(false);
              }}
              className="bg-[#2B4E38] hover:bg-[#1F3A2A] text-white text-[9px] md:text-[10px] font-bold py-1.5 px-2 md:px-3 rounded-lg shadow-sm transition-all text-center"
            >
              Workspace
            </Link>
            <button
              onClick={() => {
                const userId = profile?.userId?._id || profile?.userId;
                localStorage.setItem(`deal_activated_trigger_${userId}`, "false");
                setShowDealActivatedModal(false);
              }}
              className="bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#001032] text-[9px] md:text-[10px] font-semibold py-1.5 px-2 md:px-3 rounded-lg transition-all text-center"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Payment Released Success Modal */}
      {showPaymentReleasedModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#D1FAE5] rounded-full flex items-center justify-center mb-4 shrink-0">
              <span className="text-3xl text-[#059669]">💰</span>
            </div>
            <h2 className="text-2xl font-bold text-[#001032] mb-2">Payment Released!</h2>
            <p className="text-sm text-[#001032]/70 mb-8 leading-relaxed">
              Milestone payment has been released successfully.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <Link
                to="/deal/documentation"
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`payment_released_seen_${releasedPaymentData?._id || "debug"}_${userId}`, "true");
                  setShowPaymentReleasedModal(false);
                }}
                className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center"
              >
                View Transaction
              </Link>
              <button
                onClick={() => {
                  const userId = profile?.userId?._id || profile?.userId;
                  localStorage.setItem(`payment_released_seen_${releasedPaymentData?._id || "debug"}_${userId}`, "true");
                  setShowPaymentReleasedModal(false);
                }}
                className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#001032] font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl p-5 relative shadow-xl animate-fadeIn">
            {/* Close Icon */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <RxCross2 size={22} />
            </button>

            {/* Content */}
            <h2 className="text-xl font-semibold text-[#001426] mb-2 text-center">
              Complete Your Profile ✨
            </h2>

            <p className="text-sm text-gray-600 text-center mb-4">
              Complete your profile to increase your visibility, connect with
              the right people, and unlock personalised opportunities tailored
              for you.
            </p>

            <Link to="/profile">
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full bg-[#59549F] text-white py-2 rounded-lg font-medium hover:bg-[#4a4686]"
              >
                Complete Profile Now
              </button>
            </Link>
          </div>
        </div>
      )   }  
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
                  currentPlanAmount: profile?.plan?.amount || 0,
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
    </div>
  );
};

export default DashboardSec;
