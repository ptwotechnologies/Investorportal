import React, { useEffect, useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import requestLogo from "/requestlogo.png";
import connectLogo from "/connectlogo.png";
import { IoNotificationsOutline, IoChatbubblesOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import loginLogo from "/coptenologo2.png";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { serverUrl } from "@/App";
import axios from "axios";
import { useSidebarIndicators } from "@/hooks/useSidebarIndicators";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineFund } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";
import { MdMoneyOffCsred } from "react-icons/md";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { SiJfrogpipelines } from "react-icons/si";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineAppRegistration } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import {
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaStar,
  FaHandshake,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";
import ComingSoonModal from "./ComingSoonModal";
import { SiSimpleanalytics } from "react-icons/si";
import { LuLock } from "react-icons/lu";

let globalDealsCache = null;
let globalUserCache = null;
let lastFetchTime = 0;
const CACHE_DURATION = 15000; // 15 seconds

export const invalidateSidebarCache = () => {
  globalDealsCache = null;
  globalUserCache = null;
  lastFetchTime = 0;
  window.dispatchEvent(new Event("sidebar-refresh"));
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // New state
  const { notifications, fetchNotifications, markAllNotificationsAsRead } = useNotifications();
  const { indicators } = useSidebarIndicators();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isDealRoute = location.pathname.startsWith("/deal");
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false);
  const [isOperateOpen, setIsOperateOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState("");
  const [spMode, setSpMode] = useState(globalUserCache?.spMode || localStorage.getItem("spMode") || "provider");
  const [hasCreatedDeals, setHasCreatedDeals] = useState(false);
  const [deals, setDeals] = useState(globalDealsCache || []);
  const [dealsLoading, setDealsLoading] = useState(!globalDealsCache);
  const [userId, setUserId] = useState(globalUserCache?._id || null);
  const [userRole, setUserRole] = useState(globalUserCache?.role || localStorage.getItem("role"));
  const [userName, setUserName] = useState(globalUserCache?.displayName || "");
  const [profilePhoto, setProfilePhoto] = useState(globalUserCache?.profilePhoto || null);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const publicBaseUrl = "https://pub-cb99bea3292949639f304d67adc5d74e.r2.dev";
    const privateBaseUrl = `https://copteno.c2fc1593db66d893ceff4e23d571cfb6.r2.cloudflarestorage.com`;
    if (imageUrl.startsWith(privateBaseUrl)) {
      return imageUrl.replace(privateBaseUrl, publicBaseUrl);
    }
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${serverUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Use cache if valid
        if (globalDealsCache && globalUserCache && (Date.now() - lastFetchTime < CACHE_DURATION)) {
          setDeals(globalDealsCache);
          setHasCreatedDeals(globalDealsCache.length > 0);
          setUserId(globalUserCache._id);
          setUserRole(globalUserCache.role);
          setUserName(globalUserCache.displayName || "User");
          setProfilePhoto(globalUserCache.profilePhoto);
          setDealsLoading(false);
          return;
        }

        const [res, userRes, profileRes] = await Promise.all([
          axios.get(`${serverUrl}/api/deals/my-deals`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${serverUrl}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${serverUrl}/profile/`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => ({ data: {} }))
        ]);

        const profileData = profileRes.data;
        const displayName = profileData?.companyName || profileData?.name || userRes.data.name || userRes.data.userName || "User";

        // Update cache
        globalDealsCache = res.data;
        globalUserCache = { 
          ...userRes.data, 
          displayName, 
          profilePhoto: profileData?.profilePhoto 
        };
        lastFetchTime = Date.now();

        setDeals(res.data);
        setHasCreatedDeals(res.data.length > 0);
        setUserId(userRes.data._id);
        setUserRole(userRes.data.role);
        setUserName(displayName);
        setProfilePhoto(profileData?.profilePhoto);
        if (userRes.data.spMode) {
          setSpMode(userRes.data.spMode);
          localStorage.setItem("spMode", userRes.data.spMode);
        }
      } catch (err) {
        console.error("Error fetching deals count", err);
        setDeals([]);
        setHasCreatedDeals(false);
      } finally {
        setDealsLoading(false);
      }
    };

    if (token) fetchData();

    // Listen for manual refreshes
    window.addEventListener("sidebar-refresh", fetchData);
    
    const handleSpModeChange = () => {
      const updatedMode = localStorage.getItem("spMode");
      if (updatedMode) {
        setSpMode(updatedMode);
      }
    };
    window.addEventListener("spModeChanged", handleSpModeChange);

    return () => {
      window.removeEventListener("sidebar-refresh", fetchData);
      window.removeEventListener("spModeChanged", handleSpModeChange);
    };
  }, [token, location.pathname]);

  const isAtActiveDeals = location.pathname === "/deal/activedeals";
  const isAtNegotiations = location.pathname === "/deal/negotiations";

  const hasActiveDealDot = indicators.serviceDeal.activeDeals;
  const hasNegotiationDot = indicators.serviceDeal.negotiations;
  const hasAnyDealDot = indicators.serviceDeal.hasUnread;
  const isStartup = String(userRole).toLowerCase().includes("startup");
  const isServiceProfessional = String(userRole).toLowerCase().includes("professional");
  const isInvestor = String(userRole).toLowerCase().includes("investor");

  const triggerComingSoon = (title) => {
    setComingSoonTitle(title);
    setShowComingSoon(true);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutClick = () => {
    setShowSignoutDialog(!showSignoutDialog);
  };

  const handleConfirmSignOut = () => {
    localStorage.removeItem("token");
    setShowSignoutDialog(false);
    toast.success("Signed out!");
    navigate("/login");
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  useEffect(() => {
    if (showNotifications) {
      // jab box open ho
      fetchNotifications();
      markAllNotificationsAsRead();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [showNotifications]);

  const [expandedIds, setExpandedIds] = useState([]); // store expanded notification IDs

  const toggleExpanded = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // ✅ Open deal route when navigating (Exclude Communication & Analytics)
  useEffect(() => {
    const isCommunicationRoute = location.pathname === "/deal/communication";
    const isAnalyticsRoute = location.pathname === "/deal/analytics";
    if (isDealRoute && !isCommunicationRoute && !isAnalyticsRoute) {
      setIsDealsOpen(true);
    }
  }, [location.pathname, isDealRoute]);

  return (
    <div className="sticky top-0 h-screen z-50 overflow-y-auto scrollbar-hide">
      <div className="flex min-h-full w-fit">
        {/* Purple Bar */}
        <div className="w-14 bg-[#D8D6F8] flex flex-col items-center py-4 shrink-0 min-h-full">
        {/* Top Icon */}
        <div className="text-[#59549f] py-6">
          <IoMdMenu size={27} onClick={handleToggle} className="cursor-pointer" />
        </div>

        {/* Module Icons */}
        <div className="flex flex-col items-center ">
          <MdOutlineDashboardCustomize
            className="text-[#59549f] my-4 cursor-pointer"
            size={25}
            onClick={handleToggle}
          />

          <CgProfile
            className="text-[#59549f]  cursor-pointer"
            size={25}
            onClick={handleToggle}
          />
          <HiOutlineTicket
            className="text-[#59549f] my-3 cursor-pointer"
            size={25}
            onClick={handleToggle}
          />
          <HiOutlineUserGroup
            className="text-[#59549f]  cursor-pointer"
            size={25}
            onClick={handleToggle}
          />
          <div className="relative my-3 cursor-pointer">
            <IoNotificationsOutline
              className="text-[#59549f]"
              size={25}
              onClick={handleNotificationClick}
            />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white shadow-md animate-pulse">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </div>

          <Link to="/deal/analytics">
            <SiSimpleanalytics
              className="text-[#59549f] my-3 mt-10 cursor-pointer"
              size={22}
            />
          </Link>

          {isStartup && (
            <>
              <Link to="">
                <AiOutlineFund
                  className="text-[#59549f] my-3 mt-14 cursor-pointer"
                  size={26}
                />
              </Link>
              <Link to="">
                <MdMoneyOffCsred
                  className="text-[#59549f] my-3 mt-3 cursor-pointer"
                  size={28}
                />
              </Link>
              <Link to="">
                <FaRegClosedCaptioning
                  className="text-[#59549f] my-3 mt-3 cursor-pointer"
                  size={26}
                />
              </Link>
            </>
          )}

          {isInvestor && (
            <>
              <Link to="">
                <RiDeviceRecoverLine
                  className="text-[#59549f] my-3 mt-13 cursor-pointer"
                  size={28}
                />
              </Link>
              <Link to="">
                <SiJfrogpipelines 
                  className="text-[#59549f] my-3 cursor-pointer"
                  size={28}
                />
              </Link>
              <Link to="">
                <RiMoneyDollarCircleLine 
                  className="text-[#59549f] my-2 cursor-pointer"
                  size={28}
                />
              </Link>
              <Link to="">
                <MdOutlineAppRegistration 
                  className="text-[#59549f] my-3 cursor-pointer"
                  size={28}
                />
              </Link>
              <Link to="">
                <BsPersonWorkspace 
                  className="text-[#59549f] my-3 cursor-pointer"
                  size={28}
                />
              </Link>
            </>
          )}

          <Link to="/deal/communication">
            <IoChatbubblesOutline
              className="text-[#59549f] my-3 mt-13 cursor-pointer"
              size={25}
            />
          </Link>

          <FaHandshake
            className="text-[#59549f] my-4 cursor-pointer"
            size={25}
            onClick={handleToggle}
          />
        </div>

        {/* Bottom Icons (Visual placeholders for icons scrolling together) */}
        <div className={`${isInvestor ? "mt-9" : "mt-57"}  pb-4 text-gray-300 flex flex-col gap-3  items-center`}>
          <IoSettingsOutline
            size={25}
            className=" text-[#59549f] cursor-pointer"
            onClick={handleToggle}
          />
          <BiHelpCircle
            size={25}
            className=" text-[#59549f] cursor-pointer"
            onClick={handleToggle}
          />
        </div>
      </div>

      {/* White Panel */}
      {isOpen && (
        <div className="w-58 bg-white min-h-full rounded-tr-2xl rounded-br-2xl shadow-lg transition-all duration-300 z-40 py-4 pt-6">
          <div className="mb-6 flex justify-center">
            <Link to="/dashboard">
              <img src={loginLogo} alt="logo" className="w-40" />
            </Link>
          </div>
          <div className="text-[#001426]">
            <ul>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block my-3 text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block my-3 text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to="/request"
                className={({ isActive }) =>
                  `block my-3 text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Requests
                {indicators.requests.hasUnread && (
                  <span className="ml-auto bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {indicators.requests.count}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/connect"
                className={({ isActive }) =>
                  `my-3 text-[17px] px-4 mx-3 rounded-md flex items-center justify-between ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426] hover:bg-gray-100"
                  }`
                }
              >
                Connect
                {indicators.connect.hasUnread && (
                  <span className="ml-auto bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    {indicators.connect.count}
                  </span>
                )}
              </NavLink>

              <div
                onClick={handleNotificationClick}
                className="block my-3 text-[17px] px-4 mx-3 rounded-md text-[#001426] hover:bg-[#D8D6F8] hover:text-[#59549f] cursor-pointer "
              >
                Notification
              </div>
              <hr />
              <h1 className="text-gray-500 text-[10px] m-3 font-semibold uppercase tracking-wider">INSIGHTS</h1>

              <NavLink
                to="/deal/analytics"
                className={({ isActive }) =>
                  `block my-3 text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Analytics
              </NavLink>
              <hr />

              {isInvestor && (
                <>
                  <div className="flex justify-start items-center">
                    <h1 className="text-gray-500 text-[10px] mx-3 font-semibold uppercase tracking-wider">Growth</h1>
                    <h1 className="bg-[#F8F7FF] rounded-sm text-[9px] px-2 py-0.5 text-[#59549F] my-3 font-bold">PREMIUM</h1>
                  </div>
                  <div className="mx-3 mb-4 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl p-1">
                    <div
                      onClick={() => triggerComingSoon("Discover")}
                      className="block my-2 text-[17px] px-4 rounded-md text-[#001426] cursor-pointer hover:bg-white/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span>Discover</span>
                        <p className="text-[10px] text-gray-400 font-normal">Find potential deals</p>
                      </div>
                      <LuLock className="text-gray-400" size={14} />
                    </div>

                    <div
                      onClick={() => triggerComingSoon("Deal pipeline")}
                      className="block my-2 text-[17px] px-4 rounded-md text-[#001426] cursor-pointer hover:bg-white/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span>Deal pipeline</span>
                        <p className="text-[10px] text-gray-400 font-normal">Track investment flow</p>
                      </div>
                      <LuLock className="text-gray-400" size={14} />
                    </div>

                    <div
                      onClick={() => triggerComingSoon("My investment")}
                      className="block my-2 text-[17px] px-4 rounded-md text-[#001426] cursor-pointer hover:bg-white/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span>My investment</span>
                        <p className="text-[10px] text-gray-400 font-normal">Portfolio performance</p>
                      </div>
                      <LuLock className="text-gray-400" size={14} />
                    </div>

                    <div
                      onClick={() => triggerComingSoon("Portfolio strategy")}
                      className="block my-2 text-[17px] px-4 rounded-md text-[#001426] cursor-pointer hover:bg-white/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span>Portfolio strategy</span>
                        <p className="text-[10px] text-gray-400 font-normal">Optimize returns</p>
                      </div>
                      <LuLock className="text-gray-400" size={14} />
                    </div>

                    <div className="my-2 relative">
                      <div
                        onClick={() => {
                          setIsWorkspaceOpen(!isWorkspaceOpen);
                          if (!isWorkspaceOpen) {
                            setIsCommunicationOpen(false);
                            setIsDealsOpen(false);
                            setIsOperateOpen(false);
                          }
                        }}
                        className="text-[17px] px-4 rounded-md cursor-pointer flex justify-between items-center hover:bg-white/50 relative"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <span>Workspace</span>
                            <p className="text-[10px] text-gray-400 font-normal">Collaboration tools</p>
                          </div>
                          <LuLock className="text-gray-400" size={14} />
                        </div>
                        {isWorkspaceOpen ? (
                          <FaChevronUp className="text-gray-500 text-sm" size={12} />
                        ) : (
                          <FaChevronDown className="text-gray-500 text-sm" size={12} />
                        )}
                      </div>

                      {isWorkspaceOpen && (
                        <div className="mt-1 w-full bg-white rounded-xl flex flex-col text-[13px] text-gray-600 p-2 pl-4 border-l-2 border-gray-100">
                          <div
                            onClick={() => triggerComingSoon("Investor Documents")}
                            className="flex items-center gap-2 py-1.5 hover:text-[#59549f] cursor-pointer"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            Documents
                          </div>
                          <div
                            onClick={() => triggerComingSoon("Investor Meetings")}
                            className="flex items-center gap-2 py-1.5 hover:text-[#59549f] cursor-pointer"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            Meetings
                          </div>
                          <div
                            onClick={() => triggerComingSoon("Investor Alerts & risk")}
                            className="flex items-center gap-2 py-1.5 hover:text-[#59549f] cursor-pointer"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            Alerts & risk
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {isStartup && (
                <>
                  <div className="flex justify-start items-center">
                    <h1 className="text-gray-500 text-[10px] mx-3 font-semibold uppercase tracking-wider">Growth</h1>
                    <h1 className="bg-[#F8F7FF] rounded-sm text-[9px] px-2 py-0.5 text-[#59549F] my-3 font-bold">PREMIUM</h1>
                  </div>
                  <div className="mx-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl p-1 mb-4">
                    <div
                      onClick={() => triggerComingSoon("Fundraising")}
                      className="block my-1 text-[17px] px-4 rounded-md text-[#001426] cursor-pointer hover:bg-white/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span>Fundraising</span>
                        <p className="text-[10px] text-gray-400 font-normal">Unlock investor pipeline</p>
                      </div>
                      <LuLock className="text-gray-400" size={14} />
                    </div>

                    <div
                      onClick={() => triggerComingSoon("Investors")}
                      className="block my-2 text-[17px] px-4 rounded-md text-[#001426] cursor-pointer hover:bg-white/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex flex-col">
                        <span>Investors</span>
                        <p className="text-[10px] text-gray-400 font-normal">Manage investors relations</p>
                      </div>
                      <LuLock className="text-gray-400" size={14} />
                    </div>

                    <div className="my-2 relative">
                      <div
                        onClick={() => {
                          setIsOperateOpen(!isOperateOpen);
                          if (!isOperateOpen) {
                            setIsCommunicationOpen(false);
                            setIsDealsOpen(false);
                          }
                        }}
                        className="text-[17px] px-4 rounded-md cursor-pointer flex justify-between items-center hover:bg-white/50 relative text-[#001426]"
                      >
                        <div className="flex flex-col">
                          <span>Operate</span>
                          <p className="text-[10px] text-gray-400 font-normal">Startup operations hub</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <LuLock className="text-gray-400" size={14} />
                          {/* {isOperateOpen ? (
                            <FaChevronUp className="text-gray-500 text-xs" size={10} />
                          ) : (
                            <FaChevronDown className="text-gray-500 text-xs" size={10} />
                          )} */}
                        </div>
                      </div>

                      {isOperateOpen && (
                        <div className="mt-1 w-full bg-white rounded-xl flex flex-col text-[13px] text-gray-600 p-2 pl-4 border-l-2 border-gray-100">
                          <div
                            onClick={() => triggerComingSoon("Metrics")}
                            className="flex items-center gap-2 py-1.5 hover:text-[#59549f] cursor-pointer"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            Metrics
                          </div>
                          <div
                            onClick={() => triggerComingSoon("Documents")}
                            className="flex items-center gap-2 py-1.5 hover:text-[#59549f] cursor-pointer"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            Documents
                          </div>
                          <div
                            onClick={() => triggerComingSoon("Cap Table")}
                            className="flex items-center gap-2 py-1.5 hover:text-[#59549f] cursor-pointer"
                          >
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            Cap Table
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div className="my-3 relative">
                <h1 className="text-gray-500 text-[10px] m-3 font-semibold uppercase tracking-wider">MANAGAE</h1>
                <div
                  onClick={() => {
                    setIsCommunicationOpen(!isCommunicationOpen);
                    if (!isCommunicationOpen) {
                      setIsDealsOpen(false);
                      setIsOperateOpen(false);
                    }
                  }}
                  className="text-[17px] px-4 mx-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-gray-100 relative"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span>Communication</span>
                      {indicators.communication.hasUnread && (
                        <span className="ml-auto bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                          {indicators.communication.count}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 font-normal">Messages, notifications</p>
                  </div>
                  {isCommunicationOpen ? (
                    <FaChevronUp className="text-gray-500 text-sm" size={12} />
                  ) : (
                    <FaChevronDown className="text-gray-500 text-sm" size={12} />
                  )}
                </div>

                {isCommunicationOpen && (
                  <div className="mt-1 w-full bg-white flex flex-col text-[13px] text-gray-600 p-2 pl-6 border-l-2 border-gray-100">
                    <NavLink
                      to="/communication/message"
                      className={({ isActive }) => `flex items-center gap-2 py-1.5 hover:text-[#59549f] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Message
                    </NavLink>
                    <NavLink
                      to="/communication/meet"
                      className={({ isActive }) => `flex items-center gap-2 py-1.5 hover:text-[#59549f] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Meet
                    </NavLink>
                    <NavLink
                      to="/communication/call"
                      className={({ isActive }) => `flex items-center gap-2 py-1.5 hover:text-[#59549f] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Call
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Deals Dropdown */}
              <div className="my-3 relative">
                <div
                  onClick={() => {
                    setIsDealsOpen(!isDealsOpen);
                    if (!isDealsOpen) {
                      setIsCommunicationOpen(false);
                      setIsOperateOpen(false);
                    }
                  }}
                  className="text-[17px] px-4 mx-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-gray-100 relative"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span>Service Deal</span>
                      {indicators.serviceDeal.hasUnread && (
                        <span className="ml-auto bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                          {indicators.serviceDeal.count}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-400 font-normal">Agreements & services</p>
                  </div>
                  {isDealsOpen ? (
                    <FaChevronUp className="text-gray-500 text-sm" size={12} />
                  ) : (
                    <FaChevronDown className="text-gray-500 text-sm" size={12} />
                  )}
                </div>

                {isDealsOpen && (
                  <div className="mt-1 w-full bg-white flex flex-col text-[13px] text-gray-600 p-2  border-l-2 border-gray-100">
                    <NavLink
                      to="/deal/activedeals"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032] justify-between pr-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                        Active Deals
                      </div>
                      {indicators.serviceDeal.activeDealsCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.activeDealsCount}</span>}
                    </NavLink>

                    <NavLink
                      to="/deal/negotiations"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032] justify-between pr-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                        Negotiations
                      </div>
                      {indicators.serviceDeal.negotiationsCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.negotiationsCount}</span>}
                    </NavLink>

                    <NavLink
                      to="/deal/documentation"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                      Documentation
                    </NavLink>

                    <NavLink
                      to="/deal/payments"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                      Payments
                    </NavLink>

                    <NavLink
                      to="/deal/revenue"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                      Revenue
                    </NavLink>

                    <NavLink
                      to="/deal/milestones"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                      Milestones
                    </NavLink>

                    <NavLink
                      to="/deal/completed"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032] justify-between pr-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                        Completed
                      </div>
                      {indicators.serviceDeal.completedCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.completedCount}</span>}
                    </NavLink>

                    <NavLink
                      to="/deal/disputes"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032] justify-between pr-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                        Disputes
                      </div>
                      {indicators.serviceDeal.disputesCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.disputesCount}</span>}
                    </NavLink>
                  </div>
                )}
              </div>

              {isStartup && (
                <>
                  <div
                    onClick={() => triggerComingSoon("Switch to Professional")}
                    className="px-4 mx-3 my-2 flex items-center justify-between p-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl group cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-[12px] font-semibold text-[#59549f]">Switch to Professional</span>
                      <span className="text-[10px] text-gray-500 ">Explore professional tools</span>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <div className="w-11 h-6 bg-gray-300 rounded-full transition-colors group-hover:bg-gray-300"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm"></div>
                    </div>
                  </div>
                </>
              )}

              {isServiceProfessional && (
                <div
                  onClick={async () => {
                    const newMode = spMode === "provider" ? "buyer" : "provider";
                    setSpMode(newMode);
                    localStorage.setItem("spMode", newMode);
                    try {
                      await axios.put(`${serverUrl}/user/sp-mode`, { spMode: newMode }, {
                        headers: { Authorization: `Bearer ${token}` }
                      });
                      if (globalUserCache) {
                        globalUserCache.spMode = newMode;
                      }
                      window.dispatchEvent(new Event("spModeChanged"));
                    } catch (error) {
                      console.error("Failed to update spMode on backend", error);
                      // Revert on failure
                      setSpMode(spMode);
                      localStorage.setItem("spMode", spMode);
                      toast.error("Failed to update mode");
                    }
                  }}
                  className="px-4 mx-3 my-2 flex items-center justify-between p-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl group cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-[12px] font-semibold text-[#59549f]">
                      {spMode === "provider" ? "Switch to Buyer" : "Switch to Provider"}
                    </span>
                    <span className="text-[10px] text-gray-500 ">
                      {spMode === "provider" ? "Experience buyer portal" : "Experience provider portal"}
                    </span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <div className={`w-11 h-6 rounded-full transition-colors ${spMode === "buyer" ? "bg-[#59549f]" : "bg-gray-300 group-hover:bg-gray-400"}`}></div>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${spMode === "buyer" ? "translate-x-6 left-1" : "translate-x-0 left-1"}`}></div>
                  </div>
                </div>              
              )}

              {/* Premium Upgrade Card - Only for Startup and Service Professional */}
              {(isStartup || isServiceProfessional) && (
                <div className="mx-3 mt-4 p-4 bg-[#F8F7FF] border border-[#E9E7FD] rounded-2xl relative overflow-hidden group cursor-pointer" onClick={() => triggerComingSoon("Premium Infrastructure")}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-[#59549F] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                      <FaCrown size={18} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-[12px] font-semibold text-[#59549f]">Upgrade to Premium</h2>
                      <p className="text-[9px] text-gray-500 leading-tight">Unlock powerful tools to grow your startup faster.</p>
                    </div>
                  </div>
                  <button className="w-full py-1 bg-[#59549F] text-white rounded-lg text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-[#48438A] transition-colors relative z-10">
                    View Plans
                    <FaArrowRight size={12} />
                  </button>
                  {/* Decorative background element */}
                  <div className="absolute bottom-[-10px] right-[-10px] opacity-10 pointer-events-none">
                     <SiSimpleanalytics size={80} />
                  </div>
                </div>
              )}
            </ul>

            <div className="mt-8 mb-2 px-4">
              <ul>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `block my-3 text-[17px] px-4 rounded-md ${
                      isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                    }`
                  }
                >
                  Settings
                </NavLink>

                <NavLink
                  to="/help"
                  className={({ isActive }) =>
                    `block my-3 text-[17px] px-4 rounded-md ${
                      isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                    }`
                  }
                >
                  Help
                </NavLink>

                <hr />

                {/* User Profile Section */}
                <div id="user-profile" className="mt-2 ">
                  {showSignoutDialog && (
                    <div className="flex flex-col gap-2 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <button
                        type="button"
                        className="w-full bg-[#D8D6F8] text-[#59549F] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] font-bold py-1.5 rounded-lg text-sm" 
                        onClick={handleConfirmSignOut}
                      >
                        Sign out
                      </button>
                      <button 
                        className="w-full text-gray-500 font-medium py-1.5 text-sm bg-gray-100 rounded-lg text-center"
                        onClick={() => setShowSignoutDialog(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  <div 
                    onClick={() => setShowSignoutDialog(!showSignoutDialog)}
                    className="flex items-center gap-3  p-2 bg-gray-50 rounded-xl cursor-pointer border hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#59549F] flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
                      {profilePhoto ? (
                        <img src={getImageUrl(profilePhoto)} alt="" className="w-full h-full object-cover" />
                      ) : (
                        userName ? userName.charAt(0).toUpperCase() : "U"
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-[#001032] truncate">{userName}</p>
                      <p className="text-[10px] text-gray-500 capitalize">{userRole?.replace("_", " ")}</p>
                    </div>
                    <FaChevronDown 
                      className={`text-gray-400 transition-transform duration-200 ${showSignoutDialog ? "rotate-180" : ""}`} 
                      size={14} 
                    />
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Notification Box (Overlay) */}
      {showNotifications && (
        <div 
          className="fixed top-19 left-72 ml-4 w-100 h-[80vh] bg-white border border-gray-300 shadow-lg rounded-md z-[60] p-4"
          style={{ overscrollBehavior: 'contain' }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-semibold text-[#001426]">Notifications</h1>
            <RxCross2 size={25} className="cursor-pointer text-gray-500 hover:text-black" onClick={handleNotificationClick} />
          </div>
          <hr />
          <div 
            className="flex flex-col gap-2 h-[95vh] overflow-y-auto scrollbar-hide px-2 py-3"
            style={{ overscrollBehavior: 'contain' }}
          >
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-3xl mb-2">🎉</span>
                <p className="text-sm font-semibold text-gray-700">All caught up!</p>
                <p className="text-xs text-gray-450 mt-1.5 max-w-[200px]">You have no new notifications at this time.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div key={n._id} className="border p-3 flex flex-col gap-2 rounded-lg bg-gray-50 hover:bg-white transition-colors">
                  <div className="flex items-start gap-4 w-full">
                    <div className="w-10 h-10 rounded-full bg-[#D8D6F8] flex items-center justify-center shrink-0 text-sm">
                      {n.type === "missing_portfolio" || n.type === "incomplete_profile" ? "⚠️" : n.type === "welcome_trigger" ? "✨" : n.type === "new_opportunity" ? "📋" : n.type === "explore_professionals" ? "🔍" : "🔔"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#001426]">{n.title}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                  {n.type === "missing_portfolio" && (
                    <div className="pl-14">
                      <Link 
                        to="/profile"
                        onClick={() => setShowNotifications(false)}
                        className="inline-block bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1.5 px-4 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                      >
                        Upload Portfolio
                      </Link>
                    </div>
                  )}
                  {(n.type === "welcome_trigger" || n.type === "incomplete_profile") && (
                    <div className="pl-14">
                      <Link 
                        to="/profile"
                        onClick={() => setShowNotifications(false)}
                        className="inline-block bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1.5 px-4 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                      >
                        Complete Profile
                      </Link>
                    </div>
                  )}
                  {n.type === "explore_professionals" && (
                    <div className="pl-14">
                      <Link 
                        to="/request"
                        state={{ defaultTab: "received" }}
                        onClick={() => setShowNotifications(false)}
                        className="inline-block bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1.5 px-4 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                      >
                        Discover Professionals
                      </Link>
                    </div>
                  )}
                  {n.type === "new_opportunity" && (
                    <div className="pl-14">
                      <Link 
                        to="/request"
                        state={{ defaultTab: "received" }}
                        onClick={() => {
                          localStorage.setItem(`new_opportunity_seen_${userId}`, "true");
                          setShowNotifications(false);
                        }}
                        className="inline-block bg-[#59549F] hover:bg-[#4a4686] text-white font-semibold py-1.5 px-4 rounded-lg text-[9px] shadow-sm transition-all duration-300"
                      >
                        View Opportunity
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showComingSoon && (
        <ComingSoonModal
          onClose={() => setShowComingSoon(false)}
          title={comingSoonTitle}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default Sidebar;

