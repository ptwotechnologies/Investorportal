import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoDiamondOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "@/App";
import axios from "axios";
import { FaLinkedin } from "react-icons/fa6";
import instaIcon from "/instagram.jpeg";
import { FaArrowLeft } from "react-icons/fa";
import { getDomainsForRole } from "./domain.js";
import toast from "react-hot-toast";

const ConnectSec1 = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullSkills, setShowFullSkills] = useState(false);
  const [showFullServices, setShowFullServices] = useState(false);
  const [expandedExp, setExpandedExp] = useState({});
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  const [withdrawProfile, setWithdrawProfile] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [viewingRole, setViewingRole] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    // Transform R2 Private API URL to Public URL
    const publicBaseUrl = "https://pub-cb99bea3292949639f304d67adc5d74e.r2.dev";
    const privateBaseUrl = `https://copteno.c2fc1593db66d893ceff4e23d571cfb6.r2.cloudflarestorage.com`;
    
    if (imageUrl.startsWith(privateBaseUrl)) {
      return imageUrl.replace(privateBaseUrl, publicBaseUrl);
    }
    
    // If already a full URL (R2), return as-is
    if (imageUrl.startsWith("http")) return imageUrl;
    
    // If local path, add serverUrl
    return `${serverUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  };

  const getPortfolioUrl = (fileUrl) => {
    return getImageUrl(fileUrl);
  };

  const skillsArray = Array.isArray(selectedProfile?.topSkills)
    ? selectedProfile.topSkills
    : selectedProfile?.topSkills
      ? selectedProfile.topSkills.split(",").map((s) => s.trim())
      : [];

  const topSkillsText = skillsArray.join(", ");
  const skillsRef = React.useRef(null);
  const [skillsOverflow, setSkillsOverflow] = useState(false);
  const servicesText = selectedProfile?.services?.join(", ") || "";

  const refreshData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userRole = user?.role;

      // Fetch profiles
      const profilesRes = await axios.get(`${serverUrl}/profile/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ IMPORTANT: Filter out any profiles missing a userId to prevent crashes
      const backendProfiles = Array.isArray(profilesRes.data) ? profilesRes.data : [];
      const validProfiles = backendProfiles.filter(p => p && p.userId);

      // ✅ Apply role-based filtering
      let roleFilteredProfiles = validProfiles;

      if (userRole === "startup") {
        roleFilteredProfiles = validProfiles.filter(
          (p) => p.userId?.role === "investor",
        );
      } else if (userRole === "investor") {
        roleFilteredProfiles = validProfiles.filter(
          (p) => p.userId?.role === "startup",
        );
      } else if (userRole === "service_professional") {
        roleFilteredProfiles = validProfiles.filter(
          (p) => p.userId?.role === "investor",
        );
      }

      // Fetch connections and user plan
      const userId = localStorage.getItem("userId");
      const [connectionsRes, userRes] = await Promise.all([
        axios.get(`${serverUrl}/connections/my`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        userId && userId !== "null"
          ? axios.get(`${serverUrl}/user/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).catch(() => ({ data: { plan: null } }))
          : Promise.resolve({ data: { plan: null } }),
      ]);

      const planName = userRes.data.plan?.planName || "Explorer Access";
      setUserPlan(planName);

      setSentRequests(connectionsRes.data.sent);
      setReceivedRequests(connectionsRes.data.received);

      // Inject connection status
      const updatedProfiles = roleFilteredProfiles.map((p) => {
        const isSent = connectionsRes.data.sent.some(
          (s) => s.receiverId?._id === p.userId._id,
        );
        const isReceived = connectionsRes.data.received.some(
          (r) => r.senderId?._id === p.userId._id,
        );
        const isAccepted =
          connectionsRes.data.accepted &&
          connectionsRes.data.accepted.some(
            (a) =>
              a.senderId?._id === p.userId._id ||
              a.receiverId?._id === p.userId._id,
          );

        let connectionId = null;
        if (isReceived) {
          connectionId = connectionsRes.data.received.find(
            (r) => r.senderId?._id === p.userId._id,
          )?._id;
        } else if (isSent) {
          connectionId = connectionsRes.data.sent.find(
            (s) => s.receiverId?._id === p.userId._id,
          )?._id;
        } else if (isAccepted) {
          connectionId = connectionsRes.data.accepted.find(
            (a) =>
              a.senderId?._id === p.userId._id ||
              a.receiverId?._id === p.userId._id,
          )?._id;
        }

        return {
          ...p,
          connectionStatus: isAccepted
            ? "accepted"
            : isSent
              ? "sent"
              : isReceived
                ? "received"
                : "none",
          connectionId: connectionId,
        };
      });

      setProfiles(updatedProfiles);

      // ✅ Update available domains
      const domains = [
        ...new Set(
          roleFilteredProfiles // ✅ CORRECT - All domains from role filter
            .map((p) => p.userId?.additionalDetails?.domain)
            .filter(Boolean),
        ),
      ];
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    refreshData();
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");

        // ✅ Get current user's role
        const user = JSON.parse(localStorage.getItem("user"));
        const userRole = user?.role;
        setCurrentUserRole(userRole);

        let targetRole = null;
        if (userRole === "startup") {
          targetRole = "investor";
        } else if (userRole === "investor") {
          targetRole = "startup";
        } else if (userRole === "service_professional") {
          targetRole = "investor";
        }
        setViewingRole(targetRole);

        // Fetch all profiles
        const res = await axios.get(`${serverUrl}/profile/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ IMPORTANT: Filter out any corrupted/orphaned profiles missing a userId
        let validProfiles = res.data.filter(p => p && p.userId);

        // ✅ Filter profiles based on current user's role
        let roleFilteredProfiles = validProfiles;

        if (userRole === "startup") {
          roleFilteredProfiles = validProfiles.filter(
            (p) => p.userId?.role === "investor",
          );
        } else if (userRole === "investor") {
          roleFilteredProfiles = validProfiles.filter(
            (p) => p.userId?.role === "startup",
          );
        } else if (userRole === "service_professional") {
          roleFilteredProfiles = validProfiles.filter(
            (p) => p.userId?.role === "investor",
          );
        }

        // Fetch connections
        const connectionsRes = await axios.get(`${serverUrl}/connections/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        setSentRequests(connectionsRes.data.sent);
        setReceivedRequests(connectionsRes.data.received);

        // Inject connection status using strict ?._id optional chaining to prevent crashes
        const updatedProfiles = roleFilteredProfiles.map((p) => {
          const isSent = connectionsRes.data.sent.some(
            (s) => s.receiverId?._id === p.userId?._id,
          );
          const isReceived = connectionsRes.data.received.some(
            (r) => r.senderId?._id === p.userId?._id,
          );
          const isAccepted =
            connectionsRes.data.accepted &&
            connectionsRes.data.accepted.some(
              (a) =>
                a.senderId?._id === p.userId?._id ||
                a.receiverId?._id === p.userId?._id,
            );

          let connectionId = null;
          if (isReceived) {
            connectionId = connectionsRes.data.received.find(
              (r) => r.senderId?._id === p.userId?._id,
            )?._id;
          } else if (isSent) {
            connectionId = connectionsRes.data.sent.find(
              (s) => s.receiverId?._id === p.userId?._id,
            )?._id;
          } else if (isAccepted) {
            connectionId = connectionsRes.data.accepted.find(
              (a) =>
                a.senderId?._id === p.userId?._id ||
                a.receiverId?._id === p.userId?._id,
            )?._id;
          }

          return {
            ...p,
            connectionStatus: isAccepted
              ? "accepted"
              : isSent
                ? "sent"
                : isReceived
                  ? "received"
                  : "none",
            connectionId: connectionId,
          };
        });

        setProfiles(updatedProfiles);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
        setError("Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (skillsRef.current) {
        setSkillsOverflow(
          skillsRef.current.scrollHeight > skillsRef.current.clientHeight ||
            skillsRef.current.scrollWidth > skillsRef.current.clientWidth,
        );
      }
    };

    // Profile open hone par aur font load hone ke baad check
    setTimeout(checkOverflow, 200);

    // Window resize ke liye
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [selectedProfile, isMobileProfileOpen]);

  const toggleExperience = (index) => {
    setExpandedExp((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sendConnectionRequest = async (receiverId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${serverUrl}/connections/send`,
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Connection request sent");

      // Get the new connection ID from response
      const newConnectionId = res.data.connection._id;

      // UI update with connectionId
      setProfiles((prev) =>
        prev.map((p) =>
          p.userId._id === receiverId
            ? { ...p, connectionStatus: "sent", connectionId: newConnectionId }
            : p,
        ),
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to send connection request");
    }
  };

  const respondToRequest = async (connectionId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${serverUrl}/connections/update`,
        { connectionId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // UI update
      setProfiles((prev) =>
        prev.map((p) =>
          p.connectionId === connectionId
            ? { ...p, connectionStatus: status }
            : p,
        ),
      );

      // Show success message
      if (status === "accepted") {
        toast.success("Connection accepted!");
      } else if (status === "ignored") {
        toast.error("Connection ignored");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update connection");
    }
  };

  let filteredProfiles = profiles;

  // ✅ Step 1: Filter by tab (connection status)
  if (activeTab === "all") {
    // Show only users who have NO existing connection/request/invitation
    filteredProfiles = profiles.filter((p) => p.connectionStatus === "none");
  }

  if (activeTab === "sent") {
    filteredProfiles = profiles.filter((p) => p.connectionStatus === "sent");
  }

  if (activeTab === "received") {
    filteredProfiles = profiles.filter(
      (p) => p.connectionStatus === "received",
    );
  }

  if (activeTab === "connections") {
    filteredProfiles = profiles.filter(
      (p) => p.connectionStatus === "accepted",
    );
  }

  // ✅ Step 2: Filter by domain (if not "all")
  if (selectedDomain !== "all") {
    filteredProfiles = filteredProfiles.filter(
      (p) => p.userId?.additionalDetails?.domain === selectedDomain,
    );
  }
  const tabClass = (tab) =>
    activeTab === tab
      ? "bg-[#001032] text-white"
      : "border border-[#D9D9D9] text-[#001032]";

  const withdrawRequest = async (connectionId) => {
    // defensive: allow passing the whole profile object
    if (connectionId && typeof connectionId === "object") {
      connectionId = connectionId.connectionId || connectionId._id || null;
    }

    if (!connectionId) {
      toast.error("Error: Connection ID not found. Please try again.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // ✅ token lena

      if (!token) {
        toast.error("You are not logged in");
        return;
      }
      const res = await axios.post(
        `${serverUrl}/connections/withdraw`,
        { connectionId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token yahi bhejna
          },
        },
      );

      toast.error(res.data.message);

      // UI update
      setProfiles((prev) =>
        prev.map((p) =>
          p.connectionId === connectionId
            ? { ...p, connectionStatus: "none", connectionId: null }
            : p,
        ),
      );

      // Close confirmation dialog
      setShowWithdrawConfirm(false);
      setWithdrawProfile(null);
    } catch (err) {
      console.error(
        "Withdraw failed:",
        err.response?.data?.message || err.message,
      );
      toast.error(
        "Failed to withdraw request: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  const isFreePlan =
    (currentUserRole === "startup" ||
      currentUserRole === "service_professional") &&
    (userPlan === "Explorer Access" || !userPlan);

  return (
    <div className="md:flex  lg:bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-6">
      <div className=" bg-gray-100 h-[85vh]  w-full  mx-auto  pt-4">
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg px-10 mb-4 justify-between items-center">
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

        <div className="flex gap-4 items-stretch">
          <div
            className={`relative flex flex-col bg-white  border border-gray-400 lg:p-4 p-2 rounded-md shadow-md w-full md:w-[44%] h-screen lg:h-[88vh] gap-2 
            ${isMobileProfileOpen ? "hidden lg:flex" : "flex"}`}
          >
            <div>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="border border-[#D9D9D9] p-2 rounded-sm w-full bg-white"
              >
                <option value="all" >All Domains</option>
                {viewingRole &&
                  getDomainsForRole(viewingRole).map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
  <button
    onClick={() => handleTabClick("all")}
    className={`${tabClass("all")} flex-1 py-1 rounded-sm text-sm lg:text-[16px]`}
  >
    All
  </button>

  <button
    onClick={() => handleTabClick("received")}
    className={`${tabClass("received")} flex-1 py-1 rounded-sm border border-[#D9D9D9] text-sm lg:text-[16px]`}
  >
    Received
  </button>

  <button
    onClick={() => handleTabClick("sent")}
    className={`${tabClass("sent")} flex-1 py-1 rounded-sm border border-[#D9D9D9] text-sm lg:text-[16px]`}
  >
    Sent
  </button>

  <button
    onClick={() => handleTabClick("connections")}
    className={`${tabClass("connections")} flex-1 py-1 rounded-sm border border-[#D9D9D9] text-sm lg:text-[16px]`}
  >
    Connections
  </button>
</div>

            {/* Column 2 */}
            <div className="flex flex-col gap-1 w-full max-h-140 scrollbar-hide overflow-y-auto">
  {loading && (
    <div className="h-130 lg:h-123 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59549F]"></div>
        <p className="text-sm text-gray-500">Loading profiles...</p>
      </div>
    </div>
  )}
  
  {error && <p className="text-red-500">{error}</p>}

  {!loading &&
    !error &&
    filteredProfiles.map((profile, index) => {
      const isBlurred = isFreePlan && activeTab === "all" && index >= 2;
      return (
        <div
          onClick={() => {
            if (isBlurred) {
              setShowUpgradeModal(true);
              return;
            }
            setSelectedProfile(profile);

            if (window.innerWidth < 1024) {
              setIsMobileProfileOpen(true);
            }
          }}
          key={profile._id}
          className={`flex items-center gap-3 rounded-lg h-22 transition-all shadow-[inset_0_0_12px_#00000040] bg-white cursor-pointer relative overflow-hidden`}
        >
          <div className={`flex items-center gap-3 w-full h-full p-2 transition-all ${isBlurred ? "blur-[2px] grayscale-[0.3] select-none" : ""}`}>
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200">
              {profile.profilePhoto ? (
                <img
                  src={getImageUrl(profile.profilePhoto)}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaUser className="text-gray-400" size={30} />
              )}
            </div>
            <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
            <div className="flex items-center justify-between gap-x-2 w-full px-2 min-w-0">
              <div className="flex-1 min-w-0">
                <h1 className="text-[#001032] font-semibold text-sm truncate uppercase tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-[#001032] text-xs line-clamp-1">
                  {profile.bio}
                </p>
                <p className="text-[#001032] text-[10px] truncate mt-2 font-medium">
                  {profile.city && profile.state
                    ? `${profile.city}, ${profile.state}`
                    : "Location not added"}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                {!isBlurred && (
                  <>
                    {profile.connectionStatus === "received" ? (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            respondToRequest(profile.connectionId, "accepted");
                          }}
                          className="bg-green-600 text-white px-4 py-1 text-xs rounded-full font-bold uppercase"
                        >
                          Accept
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            respondToRequest(profile.connectionId, "ignored");
                          }}
                          className="bg-red-500 text-white px-4 py-1 text-xs rounded-full font-bold uppercase"
                        >
                          Ignore
                        </button>
                      </div>
                    ) : profile.connectionStatus === "sent" ? (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setWithdrawProfile(profile);
                            setShowWithdrawConfirm(true);
                          }}
                          className="bg-red-500 text-white w-20 py-1 my-1 text-xs rounded-full font-bold uppercase"
                        >
                          Withdraw
                        </button>
                      </div>
                    ) : profile.connectionStatus === "none" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sendConnectionRequest(profile.userId?._id);
                        }}
                        className="bg-[#001032] text-white w-20 py-1 text-xs rounded-full font-bold uppercase"
                      >
                        Connect
                      </button>
                    ) : null}

                    {profile.connectionStatus === "accepted" && (
                      <button className="bg-[#B1AAAA] text-white w-20 py-1 text-xs rounded-full font-bold uppercase cursor-default">
                        Message
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {isBlurred && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/20 z-10 pointer-events-none">
              <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-lg border border-[#59549F]/20 flex items-center gap-1.5 transform scale-90">
                <IoDiamondOutline className="text-[#59549F] text-sm" />
                <span className="text-[10px] font-extrabold text-[#59549F] uppercase tracking-tighter">
                  Unlock Profile
                </span>
              </div>
            </div>
          )}
        </div>
      );
    })}
</div>

            {/* Withdraw Confirmation Modal - Inside left div */}
            {showWithdrawConfirm && withdrawProfile && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50 rounded-md">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 w-80">
                  <p className="text-center">
                    Are you sure you want to withdraw the connection request to{" "}
                    <strong>{withdrawProfile.name}</strong>?
                  </p>
                  <div className="flex justify-around gap-4">
                    <button
                      onClick={() =>
                        withdrawRequest(withdrawProfile?.connectionId)
                      }
                      className="bg-red-600 text-white px-4 py-1 rounded-lg"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        setShowWithdrawConfirm(false);
                        setWithdrawProfile(null);
                      }}
                      className="bg-gray-400 text-white px-4 py-1 rounded-lg"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 📱 MOBILE FULL PROFILE VIEW */}
          {isMobileProfileOpen && selectedProfile && (
            <div className="lg:hidden w-full h-screen bg-gray-100 overflow-y-auto ">
              {/* Header with Back Arrow */}
              <div className="flex items-center gap-3 p-4 bg-white border-b">
                <button
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="text-xl font-semibold"
                >
                  <FaArrowLeft />
                </button>
                <h1 className="font-semibold text-lg">
                  {selectedProfile.name}
                </h1>
              </div>

              {/* Full Profile Content (reuse SAME right-side UI) */}
              <div className="bg-white border border-gray-300 shadow-md rounded-b-2xl  flex flex-col  w-full min-h-full mb-15">
                {/* Header image section */}
                <div
                  className={`relative h-30 border border-gray-300 ${
                    !selectedProfile.coverImage
                      ? "bg-linear-to-b from-[#D8D6F8] to-[#F8DEDE]"
                      : ""
                  }`}
                  style={
                    selectedProfile.coverImage
                      ? {
                          backgroundImage: `url(${getImageUrl(selectedProfile.coverImage)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                >
                  {selectedProfile.coverImage && (
                    <div className="absolute inset-0 bg-black/30" />
                  )}
                </div>

                {/* Profile photo overlap */}
                <div className="relative px-2 -mt-12">
                  <div className="w-28 h-28  rounded-full  border-gray-300  bg-linear-to-b from-[#FFFFFF] from-3% to-[#999999] border-2 shadow-[0px_4px_10px_rgba(0,0,0,0.25)] overflow-hidden">
                    {selectedProfile.profilePhoto ? (
                      <img
                        src={getImageUrl(selectedProfile.profilePhoto)}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <FaUser className="text-gray-400" size={50} />
                      </div>
                    )}
                  </div>

                  <div className="mt-6 px-2 ">
                    <h2 className="text-gray-900 text-lg font-semibold">
                      {selectedProfile.name}
                    </h2>
                    <p className="text-sm text-gray-800 mt-1 leading-tight w-[80%]">
                      {selectedProfile.bio || "No bio available"}
                    </p>

                    <p className="text-sm text-gray-700 font-medium mt-2 ">
                      {selectedProfile.city && selectedProfile.state
                        ? `${selectedProfile.city}, ${selectedProfile.state}`
                        : "Location not added"}
                    </p>
                  </div>
                </div>

                {/* About Section */}
                <div
                  id="about"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2 mt-3"
                >
                  {/* About Header */}
                  <div className="flex justify-between items-center mt-2 mb-1 px-2">
                    <h1 className="text-[#001032] font-semibold text-md lg:text-xl">
                      About
                    </h1>
                  </div>

                  {/* About Content */}
                  <div className="py-2 text-sm lg:tracking-wider tracking-wide lg:pr-0 h-auto">
                    <div className="px-2 relative">
                      <p
                        className={`text-sm ${showFullAbout ? "" : "line-clamp-3"}`}
                      >
                        {selectedProfile?.about || "No About Info"}
                      </p>

                      {/* See More button */}
                      {selectedProfile?.about &&
                        selectedProfile.about.split(" ").length > 20 && (
                          <button
                            onClick={() => setShowFullAbout(!showFullAbout)}
                            className="text-blue-600 text-sm font-medium mt-1"
                          >
                            {showFullAbout ? "See Less" : "See More"}
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Top Skills */}
                  <div className="flex flex-col gap-1 p-2 mx-2 my-4 border-2 border-[#D9D9D9] rounded-xl text-[#001032]">
                    <div className="flex items-center gap-2">
                      <IoDiamondOutline size={22} />
                      <h1 className="w-[40%] text-md lg:text-xl font-semibold">
                        Top Skills
                      </h1>
                    </div>

                    <p
                      ref={skillsRef}
                      className={`lg:text-sm text-xs leading-4 flex items-center lg:leading-7 lg:w-[90%] pl-8 ${
                        showFullSkills ? "" : "line-clamp-2"
                      }`}
                    >
                      {topSkillsText || "No Skills Added"}
                    </p>

                    {/* ✅ See More button */}
                    {topSkillsText && topSkillsText.split(" ").length > 15 && (
                      <button
                        onClick={() => setShowFullSkills(!showFullSkills)}
                        className="text-blue-600 text-sm font-medium mt-1 pl-8 text-left self-start"
                      >
                        {showFullSkills ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div
                  id="services"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-linear-to-r from-[#D8D6F8] to-[#F8DEDE] px-2  my-2 py-2 "
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032]  px-2 font-semibold text-md lg:text-xl">
                      Services
                    </h1>
                  </div>
                  <div className=" px-2 lg:py-2 py-1 mb-6 relative">
                    <div className="relative">
                      <p
                        className={`text-sm font-medium leading-6 lg:leading-7 lg:pr-3 overflow-hidden transition-all duration-300 ${
                          showFullServices ? "" : "line-clamp-2"
                        }`}
                      >
                        {servicesText || "No services added"}
                      </p>

                      {servicesText.split(" ").length > 15 && (
                        <button
                          onClick={() => setShowFullServices(!showFullServices)}
                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                        >
                          {showFullServices ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div
                  id="experience"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2 py-2 mb-2"
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032] px-2 font-semibold text-md lg:text-xl">
                      Experience
                    </h1>
                  </div>

                  <div className="pl-2 pb-5 mt-2">
                    {selectedProfile.experience &&
                    selectedProfile.experience.length > 0 ? (
                      selectedProfile.experience.map((exp, index) => (
                        <div key={index} className="mb-4 border-b pb-3">
                          <div className="flex justify-between items-start">
                            <div className="w-full">
                              <h1 className="font-semibold pt-1 text-md lg:text-xl">
                                {exp.title}
                              </h1>
                              <p className="text-sm font-medium">
                                {exp.company}
                              </p>
                              <p className="text-sm text-gray-500">
                                {exp.duration.startDate} -{" "}
                                {exp.duration.present
                                  ? "Present"
                                  : exp.duration.endDate}
                              </p>
                              <p className="text-sm">{exp.location}</p>

                              {exp.description &&
                                exp.description.length > 0 && (
                                  <ul className="list-disc ml-4 mt-2 text-sm">
                                    <li>
                                      <p
                                        className={`transition-all duration-300 ${
                                          expandedExp[index]
                                            ? ""
                                            : "line-clamp-2"
                                        }`}
                                      >
                                        {exp.description[0]}
                                      </p>

                                      {exp.description[0].split(" ").length >
                                        15 && (
                                        <button
                                          onClick={() =>
                                            setExpandedExp((prev) => ({
                                              ...prev,
                                              [index]: !prev[index],
                                            }))
                                          }
                                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                                        >
                                          {expandedExp[index]
                                            ? "See Less"
                                            : "See More"}
                                        </button>
                                      )}
                                    </li>
                                  </ul>
                                )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No experience added</p>
                    )}
                  </div>
                </div>

                {/* portfolio */}
                <div
                  id="portfolio"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-linear-to-b from-[#D8D6F8] from-5% to-[#F8DEDE] px-2 py-2 mb-2"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032] px-2 font-semibold text-md lg:text-xl">
                      Portfolio
                    </h1>
                  </div>

                  {/* ===== Desktop View ===== */}
                  <div className="hidden lg:block">
                    <div className="flex flex-wrap pl-2 gap-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-48 h-48 border-2 border-[#D9D9D9] rounded-md overflow-hidden cursor-pointer"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-2">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===== Mobile View ===== */}
                  <div className="lg:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pl-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-[40%] h-40 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-2">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* socialmedia */}
                <div
                  id="social-media"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2  py-2 mb-4 pb-5"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032]  px-4 font-semibold text-md lg:text-xl">
                      Social Media
                    </h1>
                  </div>

                  <div className=" pl-4 py-2 mb-3 flex flex-col gap-2 lg:pr-30 pr-5">
                    {selectedProfile?.socialMedia?.linkedin ||
                    selectedProfile?.socialMedia?.instagram ? (
                      /* 🔵 VIEW MODE (data exists) → show icons only */
                      <>
                        {selectedProfile?.socialMedia?.linkedin && (
                          <a
                            href={selectedProfile.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600"
                          >
                            <FaLinkedin size={20} /> LinkedIn
                          </a>
                        )}

                        {selectedProfile?.socialMedia?.instagram && (
                          <a
                            href={selectedProfile.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-pink-500"
                          >
                            <img src={instaIcon} className="w-5 rounded-sm" />
                            Instagram
                          </a>
                        )}
                      </>
                    ) : (
                      /* ⚪ VIEW MODE (no data yet) → show gray disabled icons */
                      <>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaLinkedin size={20} /> LinkedIn
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <img src={instaIcon} className="w-5 rounded-sm" />
                          Instagram
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Right Card (exact UI, untouched CSS) */}
          <div className="hidden lg:flex w-[56%] h-[88vh] scrollbar-hide overflow-x-auto">
            {selectedProfile ? (
              <div className="bg-white border border-gray-300 shadow-md rounded-2xl  flex flex-col justify-between w-full h-full">
                {/* Header image section */}
                <div
                  className={`relative h-40 border border-gray-300 pt-40 ${
                    !selectedProfile.coverImage
                      ? "bg-linear-to-b from-[#D8D6F8] to-[#F8DEDE]"
                      : ""
                  }`}
                  style={
                    selectedProfile.coverImage
                      ? {
                          backgroundImage: `url(${getImageUrl(selectedProfile.coverImage)})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {}
                  }
                >
                  {selectedProfile.coverImage && (
                    <div className="absolute inset-0 bg-black/30" />
                  )}
                </div>
                {/* Profile photo overlap */}
                <div className="relative px-4 -mt-12">
                  <div className="w-28 h-28 rounded-full border-2 border-gray-300  bg-gray-200 overflow-hidden bg-linear-to-b from-[#FFFFFF] from-3% to-[#999999]  shadow-[0px_4px_10px_rgba(0,0,0,0.25)]">
                    {selectedProfile.profilePhoto ? (
                      <img
                        src={getImageUrl(selectedProfile.profilePhoto)}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <FaUser className="text-gray-400" size={50} />
                      </div>
                    )}
                  </div>

                  <div className="mt-6 px-4 ">
                    <h2 className="text-gray-900 text-lg font-semibold">
                      {selectedProfile.name}
                    </h2>
                    <p className="text-sm text-gray-800 mt-1 leading-tight w-[70%]">
                      {selectedProfile.bio || "No bio available"}
                    </p>

                    <p className="text-sm text-gray-700 font-medium mt-2 ">
                      {selectedProfile.city && selectedProfile.state
                        ? `${selectedProfile.city}, ${selectedProfile.state}`
                        : "Location not added"}
                    </p>
                  </div>
                </div>

                {/* About Section */}
                <div
                  id="about"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4 mt-3"
                >
                  {/* About Header */}
                  <div className="flex justify-between items-center mt-2 mb-1 px-4">
                    <h1 className="text-[#001032] font-semibold text-md lg:text-xl">
                      About
                    </h1>
                  </div>

                  {/* About Content */}
                  <div className="py-2 text-sm lg:tracking-wider tracking-wide lg:pr-0 h-auto">
                    <div className="px-4 relative">
                      <p
                        className={`text-sm ${showFullAbout ? "" : "line-clamp-3"}`}
                      >
                        {selectedProfile?.about || "No About Info"}
                      </p>

                      {/* See More button */}
                      {selectedProfile?.about &&
                        selectedProfile.about.split(" ").length > 20 && (
                          <button
                            onClick={() => setShowFullAbout(!showFullAbout)}
                            className="text-blue-600 text-sm font-medium mt-1"
                          >
                            {showFullAbout ? "See Less" : "See More"}
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Top Skills */}
                  <div className="flex flex-col gap-1 p-2 mx-4 my-4 border-2 border-[#D9D9D9] rounded-xl text-[#001032]">
                    <div className="flex items-center gap-2">
                      <IoDiamondOutline size={22} />
                      <h1 className="w-[40%] text-md lg:text-xl font-semibold">
                        Top Skills
                      </h1>
                    </div>

                    <p
                      ref={skillsRef}
                      className={`lg:text-sm text-xs leading-4 flex items-center lg:leading-7 lg:w-[90%] pl-8 ${
                        showFullSkills ? "" : "line-clamp-2"
                      }`}
                    >
                      {topSkillsText || "No Skills Added"}
                    </p>

                    {/* ✅ See More button */}
                    {(skillsOverflow || showFullSkills) && (
                      <button
                        onClick={() => setShowFullSkills(!showFullSkills)}
                        className="text-blue-600 text-sm font-medium mt-1 pl-8 text-left self-start"
                      >
                        {showFullSkills ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div
                  id="services"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-linear-to-r from-[#D8D6F8] to-[#F8DEDE] px-4  my-2 py-2 "
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032]  px-4 font-semibold text-md lg:text-xl">
                      Services
                    </h1>
                  </div>
                  <div className=" px-4 lg:py-2 py-1 mb-6 relative">
                    <div className="relative">
                      <p
                        className={`text-sm font-medium leading-6 lg:leading-7 lg:pr-3 overflow-hidden transition-all duration-300 ${
                          showFullServices ? "" : "line-clamp-2"
                        }`}
                      >
                        {servicesText || "No services added"}
                      </p>

                      {servicesText.split(" ").length > 15 && (
                        <button
                          onClick={() => setShowFullServices(!showFullServices)}
                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                        >
                          {showFullServices ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div
                  id="experience"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4 py-2 my-2"
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032] px-4 font-semibold text-md lg:text-xl">
                      Experience
                    </h1>
                  </div>

                  <div className="pl-4 pb-5 mt-6">
                    {selectedProfile.experience &&
                    selectedProfile.experience.length > 0 ? (
                      selectedProfile.experience.map((exp, index) => (
                        <div key={index} className="mb-4 border-b pb-3">
                          <div className="flex justify-between items-start">
                            <div className="w-full">
                              <h1 className="font-semibold pt-1 text-md lg:text-xl">
                                {exp.title}
                              </h1>
                              <p className="text-sm font-medium">
                                {exp.company}
                              </p>
                              <p className="text-sm text-gray-500">
                                {exp.duration.startDate} -{" "}
                                {exp.duration.present
                                  ? "Present"
                                  : exp.duration.endDate}
                              </p>
                              <p className="text-sm">{exp.location}</p>

                              {exp.description &&
                                exp.description.length > 0 && (
                                  <ul className="list-disc ml-5 mt-2 text-sm">
                                    <li>
                                      <p
                                        className={`transition-all duration-300 ${
                                          expandedExp[index]
                                            ? ""
                                            : "line-clamp-2"
                                        }`}
                                      >
                                        {exp.description[0]}
                                      </p>

                                      {exp.description[0].split(" ").length >
                                        15 && (
                                        <button
                                          onClick={() =>
                                            setExpandedExp((prev) => ({
                                              ...prev,
                                              [index]: !prev[index],
                                            }))
                                          }
                                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                                        >
                                          {expandedExp[index]
                                            ? "See Less"
                                            : "See More"}
                                        </button>
                                      )}
                                    </li>
                                  </ul>
                                )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No experience added</p>
                    )}
                  </div>
                </div>

                {/* portfolio */}
                <div
                  id="portfolio"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-linear-to-b from-[#D8D6F8] from-5% to-[#F8DEDE] px-4 py-2 my-2"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032] px-4 font-semibold text-md lg:text-xl">
                      Portfolio
                    </h1>
                  </div>

                  {/* ===== Desktop View ===== */}
                  <div className="hidden lg:block">
                    <div className="flex flex-wrap pl-4 gap-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-40 h-40 border-2 border-[#D9D9D9] rounded-md overflow-hidden cursor-pointer"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-4">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===== Mobile View ===== */}
                  <div className="lg:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pl-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-[40%] h-40 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-2">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* socialmedia */}
                <div
                  id="social-media"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-4 lg:my-2 lg:py-2 mb-4"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032]  px-4 font-semibold text-md lg:text-xl">
                      Social Media
                    </h1>
                  </div>

                  <div className=" pl-4 py-2 mb-3 flex flex-col gap-2 lg:pr-30 pr-5">
                    {selectedProfile?.socialMedia?.linkedin ||
                    selectedProfile?.socialMedia?.instagram ? (
                      /* 🔵 VIEW MODE (data exists) → show icons only */
                      <>
                        {selectedProfile?.socialMedia?.linkedin && (
                          <a
                            href={selectedProfile.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600"
                          >
                            <FaLinkedin size={20} /> LinkedIn
                          </a>
                        )}

                        {selectedProfile?.socialMedia?.instagram && (
                          <a
                            href={selectedProfile.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-pink-500"
                          >
                            <img src={instaIcon} className="w-5 rounded-sm" />
                            Instagram
                          </a>
                        )}
                      </>
                    ) : (
                      /* ⚪ VIEW MODE (no data yet) → show gray disabled icons */
                      <>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaLinkedin size={20} /> LinkedIn
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <img src={instaIcon} className="w-5 rounded-sm" />
                          Instagram
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 m-auto">
                Select a profile to view details
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Centralized Upgrade Modal (from RequestSec design) */}
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
              You've already used your free views. <br />
              More professionals are ready to respond to your needs.
            </p>

            <div className="bg-[#FFF8E7] border border-[#FFD700] rounded-lg px-4 py-3 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500 text-lg">⚡</span>
                <div>
                  <p className="text-sm font-semibold text-[#B8860B]">
                    Unlock more profiles
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
                    text: "View unlimited professional profiles",
                  },
                  { icon: "⚡", color: "bg-green-100", text: "Get faster & better matches" },
                  {
                    icon: "📈",
                    color: "bg-purple-100",
                    text: "Increase visibility to top investors",
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
              className="w-full py-3 bg-[#59549F] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 mb-2"
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

export default ConnectSec1;
