import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { serverUrl } from "@/App";
import axios from "axios";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isPortfolioMissing, setIsPortfolioMissing] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [socket, setSocket] = useState(null);
  const [tokenVal, setTokenVal] = useState(localStorage.getItem("token"));
  const [currentUserId, setCurrentUserId] = useState(null);

  // Track token changes in LocalStorage for Single Page Application switches
  useEffect(() => {
    const handleCheck = setInterval(() => {
      const currentToken = localStorage.getItem("token");
      if (currentToken !== tokenVal) {
        setTokenVal(currentToken);
      }
    }, 1000);
    return () => clearInterval(handleCheck);
  }, [tokenVal]);

  const fetchProfileAndUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      // Fetch profile to check portfolio items
      const profileRes = await axios.get(`${serverUrl}/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => null);

      if (profileRes && profileRes.data) {
        const hasPortfolio = profileRes.data.portfolio && profileRes.data.portfolio.length > 0;
        setIsPortfolioMissing(!hasPortfolio);

        const userId = profileRes.data.userId?._id || profileRes.data.userId;
        if (userId) {
          setCurrentUserId(userId);
        }

        // Intrusive popup modal only triggers after 24 hours
        const signupDate = profileRes.data.userId?.createdAt 
          ? new Date(profileRes.data.userId.createdAt) 
          : new Date();
        const hoursSinceSignup = (Date.now() - signupDate.getTime()) / (1000 * 60 * 60);
        
        if (!hasPortfolio && hoursSinceSignup > 24) {
          setShowPortfolioModal(true);
        } else {
          setShowPortfolioModal(false);
        }
      }
    } catch (err) {
      console.error("[NOTIFICATION CONTEXT] Error fetching profile", err);
    }
  };

  // Link OneSignal to User
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        const userId = String(userData._id || userData.id);
        if (userId && window.OneSignalDeferred) {
          window.OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.login(userId);
            console.log("[ONESIGNAL] Linked user:", userId);
          });
        }
      } catch (err) {
        console.error("OneSignal login error:", err);
      }
    }
  }, [tokenVal]);

  // Setup Socket.IO connection
  useEffect(() => {
    if (!tokenVal) {
      setSocket(null);
      setNotifications([]);
      setIsPortfolioMissing(false);
      setShowPortfolioModal(false);
      return;
    }

    fetchProfileAndUser();

    const newSocket = io(serverUrl, {
      transports: ["websocket", "polling"]
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("[SOCKET] Connected to server");
      
      // Register socket with user identity
      axios.get(`${serverUrl}/user/me`, {
        headers: { Authorization: `Bearer ${tokenVal}` }
      }).then(res => {
        newSocket.emit("register", res.data._id);
      }).catch(err => console.error("[SOCKET] Error registering identity", err));
    });

    newSocket.on("notification", (newNotification) => {
      console.log("[SOCKET] Received push notification:", newNotification);
      
      // Instantly add ANY incoming notification to the list so the green dot updates
      setNotifications(prev => {
        if (prev.some(n => n._id === newNotification._id)) return prev;
        return [newNotification, ...prev];
      });

      // Special handling for portfolio missing trigger
      if (newNotification.type === "missing_portfolio") {
        setIsPortfolioMissing(true);
        setShowPortfolioModal(true);
      }
    });

    newSocket.on("deal_updated", () => {
      console.log("[SOCKET] Deal updated, triggering real-time UI refresh");
      // Fire global event to tell Sidebar and Mobile Navbar to refresh their data
      window.dispatchEvent(new Event("sidebar-refresh"));
    });

    newSocket.on("clear_notification", (id) => {
      console.log("[SOCKET] Received clear push event for:", id);
      if (id === "dynamic_missing_portfolio") {
        setIsPortfolioMissing(false);
        setShowPortfolioModal(false);
        setNotifications(prev => prev.filter(n => n._id !== id));
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [tokenVal]);

  // Fetch standard database notifications
  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      // Refresh profile state during standard fetches to ensure isPortfolioMissing stays completely synchronized
      const profileRes = await axios.get(`${serverUrl}/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => null);

      let currentMissingState = isPortfolioMissing;
      let userId = null;
      let userRole = null;
      let isApproved = false;
      let profileCompletion = 0;

      if (profileRes && profileRes.data) {
        const profileData = profileRes.data;
        const hasPortfolio = profileData.portfolio && profileData.portfolio.length > 0;
        currentMissingState = !hasPortfolio;
        setIsPortfolioMissing(currentMissingState);
        userId = profileData.userId?._id || profileData.userId;
        userRole = profileData.role;
        isApproved = profileData.paymentStatus === "approved";

        // Calculate profile completion percentage
        const fields = [
          profileData.bio,
          profileData.state,
          profileData.city,
          profileData.about,
          profileData.topSkills?.length > 0,
          profileData.profilePhoto,
          profileData.coverImage,
          profileData.experience?.length > 0,
          profileData.portfolio?.length > 0,
          profileData.socialMedia?.linkedin,
        ];
        const filledFields = fields.filter((f) => !!f).length;
        profileCompletion = (filledFields / fields.length) * 100;
      }

      const res = await axios.get(`${serverUrl}/profile/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      let list = res.data.map(n => {
        if (n.title && n.title.includes("Showcase Your Work")) {
          return { ...n, type: "missing_portfolio" };
        }
        return n;
      });

      // Prepend dynamic missing portfolio warning if active and not already in list
      if (currentMissingState && !list.some(n => n.type === "missing_portfolio")) {
        const isRead = userId ? localStorage.getItem(`read_notification_dynamic_missing_portfolio_${userId}`) === "true" : false;
        list = [{
          _id: "dynamic_missing_portfolio",
          title: "⚠️ Showcase Your Work",
          message: "Your profile has been active without a portfolio. Add case studies or past work to showcase your expertise and stand out to potential partners.",
          isRead: isRead,
          type: "missing_portfolio"
        }, ...list];
      }

      // Prepend dynamic profile completion warning if active and not already in list
      if (userRole && (userRole === "startup" || userRole === "service_professional" || userRole === "investor")) {
        const threshold = userRole === "investor" ? 60 : 50;
        if (profileCompletion < threshold && !list.some(n => n.type === "incomplete_profile")) {
          let incompleteMessage = "";
          if (userRole === "startup") {
            incompleteMessage = "Your startup profile is incomplete. Complete your profile to improve discoverability and trust.";
          } else if (userRole === "investor") {
            incompleteMessage = "Complete your investor profile to unlock stronger startup matching.";
          } else {
            incompleteMessage = "Professionals with complete profiles receive significantly more startup engagement.";
          }

          const isRead = userId ? localStorage.getItem(`read_notification_dynamic_incomplete_profile_${userId}`) === "true" : false;
          list = [{
            _id: "dynamic_incomplete_profile",
            title: "⚠️ Complete Your Profile",
            message: incompleteMessage,
            isRead: isRead,
            type: "incomplete_profile"
          }, ...list];
        }
      }

      // Prepend dynamic welcome notification if active and not already in list
      if (userId && isApproved && (userRole === "startup" || userRole === "service_professional" || userRole === "investor")) {
        const welcomeSeen = localStorage.getItem(`welcome_seen_${userId}`);
        if (!welcomeSeen) {
          let welcomeMessage = "";
          if (userRole === "startup") {
            welcomeMessage = "Welcome to Copteno. Complete your startup profile to start connecting with professionals and investors.";
          } else if (userRole === "investor") {
            welcomeMessage = "Welcome to Copteno. Set up your investor profile to start discovering curated startup opportunities.";
          } else {
            welcomeMessage = "Welcome to Copteno. Complete your professional profile to start receiving startup opportunities.";
          }

          const isRead = localStorage.getItem(`read_notification_dynamic_welcome_notification_${userId}`) === "true";
          list = [{
            _id: "dynamic_welcome_notification",
            title: "✨ Welcome to Copteno!",
            message: welcomeMessage,
            isRead: isRead,
            type: "welcome_trigger",
            link: "/profile"
          }, ...list];
        }
      }

      // Prepend dynamic new opportunity warning for Service Professional if they have forwarded requests
      if (userId && userRole === "service_professional") {
        try {
          const receivedRes = await axios.get(`${serverUrl}/requests/received`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const matchingRequests = receivedRes.data.forwardedRequests || [];
          if (matchingRequests.length > 0) {
            const opportunitySeen = localStorage.getItem(`new_opportunity_seen_${userId}`);
            if (!opportunitySeen) {
              const isRead = localStorage.getItem(`read_notification_dynamic_new_opportunity_${userId}`) === "true";
              list = [{
                _id: "dynamic_new_opportunity",
                title: "📋 New Opportunity Available",
                message: "A startup request matching your expertise is now available.",
                isRead: isRead,
                type: "new_opportunity"
              }, ...list];
            }
          }
        } catch (error) {
          console.error("[NOTIFICATION CONTEXT] Failed to fetch opportunity check", error);
        }
      }

      // Prepend dynamic Explore Professionals notification for Startup if conditions are met
      if (userId && userRole === "startup") {
        try {
          const resRequests = await axios.get(`${serverUrl}/requests`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const raisedRequests = resRequests.data || [];
          
          const fortyEightHoursAgo = new Date();
          fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

          const hasUnresolvedOpportunity = raisedRequests.some(r => {
            const createdDate = new Date(r.createdAt);
            const isOlderThan48h = createdDate < fortyEightHoursAgo;
            const isUnresolved = r.status !== "deal_created" && r.status !== "completed";
            return isOlderThan48h && isUnresolved;
          });

          if (hasUnresolvedOpportunity) {
            const isRead = localStorage.getItem(`read_notification_dynamic_explore_professionals_${userId}`) === "true";
            list = [{
              _id: "dynamic_explore_professionals",
              title: "🔍 Explore Curated Partners",
              message: "Explore curated execution partners aligned with your startup needs.",
              isRead: isRead,
              type: "explore_professionals",
              link: "/request"
            }, ...list];
          }
        } catch (error) {
          console.error("[NOTIFICATION CONTEXT] Failed to fetch explore professionals check", error);
        }
      }

      // Prepend dynamic Draft Recovery notification if conditions are met
      if (userId) {
        const savedDraft = localStorage.getItem(`deal_draft_autosave_${userId}`);
        if (savedDraft) {
          try {
            const draftData = JSON.parse(savedDraft);
            const lastSavedAt = draftData.lastSavedAt || Date.now();
            const sixHours = 6 * 60 * 60 * 1000;
            const isOlderThan6h = (Date.now() - lastSavedAt) > sixHours;
            
            if (isOlderThan6h) {
              const isRead = localStorage.getItem(`read_notification_dynamic_draft_recovery_${userId}`) === "true";
              list = [{
                _id: "dynamic_draft_recovery",
                title: "📝 Continue Your Draft",
                message: "Your request draft is waiting to be published.",
                isRead: isRead,
                type: "draft_recovery",
                link: "/deal/dealdraft"
              }, ...list];
            }
          } catch (e) {
            console.error("[NOTIFICATION CONTEXT] Failed to parse saved draft", e);
          }
        }
      }

      // Prepend dynamic Request Live notification if conditions are met
      if (userId && userRole === "startup") {
        try {
          const resRequests = await axios.get(`${serverUrl}/requests`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const raisedRequests = resRequests.data || [];
          
          const totalProposals = raisedRequests.reduce((acc, req) => {
            return acc + (req.interestedBy ? req.interestedBy.length : 0);
          }, 0);

          if (totalProposals > 0 && totalProposals < 3) {
            const isRead = localStorage.getItem(`read_notification_dynamic_first_proposal_${userId}`) === "true";
            list = [{
              _id: "dynamic_first_proposal",
              title: "🎉 First Proposal Received",
              message: "You received your first proposal on Copteno.",
              isRead: isRead,
              type: "first_proposal",
              link: "/request"
            }, ...list];
          }

          const oneDayAgo = new Date();
          oneDayAgo.setDate(oneDayAgo.getDate() - 1);

          let hasPendingAwaitingResponse = false;
          raisedRequests.forEach(req => {
            if (req.status !== "deal_created" && req.status !== "completed" && req.interestedBy && req.interestedBy.length > 0) {
              const createdDate = new Date(req.createdAt);
              if (createdDate < oneDayAgo) {
                hasPendingAwaitingResponse = true;
              }
            }
          });

          if (hasPendingAwaitingResponse) {
            const isRead = localStorage.getItem(`read_notification_dynamic_awaiting_response_${userId}`) === "true";
            list = [{
              _id: "dynamic_awaiting_response",
              title: "⏳ Action Required",
              message: "A proposal is awaiting your response.",
              isRead: isRead,
              type: "awaiting_response",
              link: "/request"
            }, ...list];
          }
          

          raisedRequests.forEach(req => {
            const createdDate = new Date(req.createdAt);
            if (createdDate > oneDayAgo) {
              const isRead = localStorage.getItem(`read_notification_dynamic_request_live_${req._id || req.id}_${userId}`) === "true";
              list = [{
                _id: `dynamic_request_live_${req._id || req.id}`,
                title: "🚀 Request Live",
                message: `Your request for "${req.service}" is now live. Relevant professionals are being notified.`,
                isRead: isRead,
                type: "request_published",
                link: "/request"
              }, ...list];
            }
          });
        } catch (error) {
          console.error("[NOTIFICATION CONTEXT] Failed to fetch recent requests check", error);
        }
      }

      // Prepend dynamic Deal triggers
      if (userId) {
        try {
          const resDeals = await axios.get(`${serverUrl}/api/deals/my-deals`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const allDeals = resDeals.data || [];
          
          // Pending Approval Trigger (Startup Only)
          if (userRole === "startup") {
            let hasPendingMilestone = false;
            allDeals.forEach(deal => {
              if (deal.milestones && deal.milestones.length > 0) {
                const pending = deal.milestones.some(m => m.status === "Completed");
                if (pending) hasPendingMilestone = true;
              }
            });

            if (hasPendingMilestone) {
              const isRead = localStorage.getItem(`read_notification_dynamic_pending_milestone_${userId}`) === "true";
              list = [{
                _id: "dynamic_pending_milestone",
                title: "⏳ Pending Approval",
                message: "A milestone is awaiting your approval.",
                isRead: isRead,
                type: "pending_approval",
                link: "/deal/active"
              }, ...list];
            }
          }

          // Deal Completion Trigger
          const completedDeals = allDeals.filter(d => d.status === 'Completed' || d.status === 'completed' || d.status === 'Completed_Simulation' || localStorage.getItem('debug_deal_completion_trigger') === "true");
          if (completedDeals.length > 0) {
             const latestCompleted = completedDeals[completedDeals.length - 1];
             const isRead = localStorage.getItem(`read_notification_dynamic_deal_completion_${latestCompleted._id || "debug"}_${userId}`) === "true";
             list = [{
                _id: `dynamic_deal_completion_${latestCompleted._id || "debug"}`,
                title: "🎉 Deal Completed!",
                message: "Your deal has been completed successfully.",
                isRead: isRead,
                type: "deal_completion",
                link: "/request"
             }, ...list];
          }

        } catch (error) {
          console.error("[NOTIFICATION CONTEXT] Failed to fetch deals for dynamic triggers", error);
        }
      }

      // New Opportunity Trigger (Service Professional)
      if (userId && userRole === "service_professional") {
        try {
          const resReceived = await axios.get(`${serverUrl}/requests/received`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const availableRequests = resReceived.data || [];
          const unactionedRequests = availableRequests.filter(req => {
            const isInterested = req.interestedBy?.some(u => u._id === userId || u === userId);
            const isIgnored = req.ignoredBy?.some(u => u._id === userId || u === userId);
            return !isInterested && !isIgnored && req.status !== "deal_created" && req.status !== "completed";
          });

          if (unactionedRequests.length > 0 || localStorage.getItem('debug_new_opportunity_trigger') === "true") {
             const isRead = localStorage.getItem(`read_notification_dynamic_new_opp_${userId}`) === "true";
             list = [{
                _id: "dynamic_new_opp",
                title: "📋 New Opportunity",
                message: "A startup request matching your expertise is now available.",
                isRead: isRead,
                type: "new_opportunity",
                link: "/request"
             }, ...list];
          }

          // Startup Shortlisted Trigger (Service Professional)
          const shortlistedRequests = availableRequests.filter(req => {
            return req.shortlistedBy?.some(u => u._id === userId || u === userId) || req.invitedBy?.some(u => u._id === userId || u === userId);
          });

          if (shortlistedRequests.length > 0 || localStorage.getItem('debug_startup_shortlisted_trigger') === "true") {
             const isRead = localStorage.getItem(`read_notification_dynamic_shortlisted_${userId}`) === "true";
             list = [{
                _id: "dynamic_shortlisted",
                title: "⭐ Profile Shortlisted",
                message: "A startup shortlisted your profile for consideration.",
                isRead: isRead,
                type: "startup_shortlisted",
                link: "/request"
             }, ...list];
          }

          // Proposal Submitted Trigger (Service Professional)
          const submittedRequests = availableRequests.filter(req => {
            return req.interestedBy?.some(u => u._id === userId || u === userId);
          });

          if (submittedRequests.length > 0 || localStorage.getItem('debug_proposal_submitted_trigger') === "true") {
             const latestSubmitted = submittedRequests.length > 0 ? submittedRequests[submittedRequests.length - 1] : { _id: "debug" };
             const isRead = localStorage.getItem(`read_notification_dynamic_submitted_${latestSubmitted._id}_${userId}`) === "true";
             list = [{
                _id: `dynamic_submitted_${latestSubmitted._id}`,
                title: "✅ Proposal Submitted",
                message: "Your proposal has been sent successfully.",
                isRead: isRead,
                type: "proposal_submitted",
                link: "/request"
             }, ...list];
          }

          // Proposal Viewed Trigger (Service Professional)
          const viewedProposals = submittedRequests.filter(req => {
            return req.viewedByStartup || localStorage.getItem(`debug_proposal_viewed_${req._id || req.id}`) === "true";
          });

          if (viewedProposals.length > 0 || localStorage.getItem('debug_proposal_viewed_trigger') === "true") {
             const latestViewed = viewedProposals.length > 0 ? viewedProposals[viewedProposals.length - 1] : { _id: "debug" };
             const isRead = localStorage.getItem(`read_notification_dynamic_proposal_viewed_${latestViewed._id}_${userId}`) === "true";
             list = [{
                _id: `dynamic_proposal_viewed_${latestViewed._id}`,
                title: "👁️ Proposal Insights",
                message: "A startup reviewed your proposal.",
                isRead: isRead,
                type: "proposal_viewed",
                link: "/request"
             }, ...list];
          }

          // Deal Accepted Trigger (Service Professional)
          if (localStorage.getItem(`deal_activated_trigger_${userId}`) === "true") {
             const isRead = localStorage.getItem(`read_notification_dynamic_deal_accepted_${userId}`) === "true";
             list = [{
                _id: `dynamic_deal_accepted`,
                title: "🤝 Deal Accepted!",
                message: "Your deal workspace is now active.",
                isRead: isRead,
                type: "deal_accepted",
                link: "/deal/documentation"
             }, ...list];
          }

          // Milestone Approval Trigger (Service Professional)
          if (localStorage.getItem(`debug_milestone_approval_trigger`) === "true") {
             const isRead = localStorage.getItem(`read_notification_dynamic_milestone_approved_${userId}`) === "true";
             list = [{
                _id: `dynamic_milestone_approved`,
                title: "💰 Payment Update",
                message: "A milestone has been approved successfully.",
                isRead: isRead,
                type: "milestone_approved",
                link: "/deal/documentation"
             }, ...list];
          }

          // Payment Released Trigger (Service Professional)
          if (localStorage.getItem(`debug_payment_released_trigger`) === "true") {
             const isRead = localStorage.getItem(`read_notification_dynamic_payment_released_${userId}`) === "true";
             list = [{
                _id: `dynamic_payment_released`,
                title: "💸 Payment Received!",
                message: "Milestone payment has been released successfully.",
                isRead: isRead,
                type: "payment_released",
                link: "/deal/documentation"
             }, ...list];
          }
        } catch (error) {
          console.error("[NOTIFICATION CONTEXT] Failed to fetch received requests for new opportunity trigger", error);
        }
      }

      // Workspace Inactivity Trigger (Applies to any role with deals)
      if (userId) {
        try {
          const dealsRes = await axios.get(`${serverUrl}/api/deals/my-deals`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const deals = dealsRes.data || [];
          let hasInactiveDeal = false;
          let inactiveDealId = null;

          deals.forEach(deal => {
             const lastUpdate = new Date(deal.updatedAt || deal.createdAt).getTime();
             const seventyTwoHours = 72 * 60 * 60 * 1000;
             // Only flag as inactive if it's not completed
             if (deal.status !== 'Completed' && deal.status !== 'completed' && deal.status !== 'Completed_Simulation') {
               if (Date.now() - lastUpdate > seventyTwoHours) {
                  hasInactiveDeal = true;
                  inactiveDealId = deal._id;
               }
             }
          });

          if (hasInactiveDeal || localStorage.getItem('debug_workspace_inactivity_trigger') === "true") {
             const isRead = localStorage.getItem(`read_notification_dynamic_workspace_inactivity_${inactiveDealId || "debug"}_${userId}`) === "true";
             list = [{
                _id: `dynamic_workspace_inactivity_${inactiveDealId || "debug"}`,
                title: "⚠️ Inactive Workspace",
                message: "This workspace has been inactive for the last 3 days.",
                isRead: isRead,
                type: "workspace_inactivity",
                link: "/deal/documentation"
             }, ...list];
          }
        } catch (error) {
           console.error("[NOTIFICATION CONTEXT] Failed to fetch deals for workspace inactivity trigger", error);
        }
      }

      // Prepend dynamic No Login Recovery notification
      if (userId) {
        try {
          const userStr = localStorage.getItem("user");
          const userData = userStr ? JSON.parse(userStr) : null;
          
          // Evaluate last activity date (falling back to updatedAt if lastLogin isn't strictly tracked yet)
          const lastActivityDate = userData?.lastLogin || userData?.updatedAt;
          
          if (lastActivityDate) {
            const daysSinceActivity = (Date.now() - new Date(lastActivityDate).getTime()) / (1000 * 60 * 60 * 24);
            
            // Trigger if it's been 5 days (or if debugging flag is enabled)
            if (daysSinceActivity >= 5 || localStorage.getItem("debug_no_login_trigger") === "true") {
              const isRead = localStorage.getItem(`read_notification_dynamic_recovery_${userId}`) === "true";
              const roleMessage = userData?.role === "startup" 
                ? "New activity and opportunities are waiting on your Copteno workspace." 
                : "New startup opportunities and proposal updates are waiting.";
                
              list = [{
                _id: "dynamic_recovery",
                title: "👋 Welcome Back!",
                message: roleMessage,
                isRead: isRead,
                type: "recovery",
                link: "/dashboard"
              }, ...list];
            }
          }
        } catch (error) {
          console.error("[NOTIFICATION CONTEXT] Failed to evaluate No Login Recovery trigger", error);
        }
      }

      setNotifications(list);
    } catch (err) {
      console.error("[NOTIFICATION CONTEXT] Failed to fetch notifications list", err);
    }
  };

  const markAllNotificationsAsRead = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      // Synchronously write dynamic notifications read status to localStorage to avoid async race conditions
      if (currentUserId) {
        localStorage.setItem(`read_notification_dynamic_missing_portfolio_${currentUserId}`, "true");
        localStorage.setItem(`read_notification_dynamic_incomplete_profile_${currentUserId}`, "true");
        localStorage.setItem(`read_notification_dynamic_welcome_notification_${currentUserId}`, "true");
        localStorage.setItem(`read_notification_dynamic_new_opportunity_${currentUserId}`, "true");
        localStorage.setItem(`read_notification_dynamic_explore_professionals_${currentUserId}`, "true");
      }

      setNotifications(prev => prev.map(n => {
        if (n._id && n._id.startsWith("dynamic_") && currentUserId) {
          localStorage.setItem(`read_notification_${n._id}_${currentUserId}`, "true");
        }
        return { ...n, isRead: true };
      }));
      await axios.post(`${serverUrl}/profile/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("[NOTIFICATION CONTEXT] Failed to mark all as read", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [isPortfolioMissing, tokenVal]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      isPortfolioMissing,
      showPortfolioModal,
      setShowPortfolioModal,
      fetchNotifications,
      markAllNotificationsAsRead,
      refreshProfile: fetchProfileAndUser
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
