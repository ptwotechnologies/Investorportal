import React, { useState, useEffect } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginLogo from "/coptenologo2.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotificationsOutline, IoChatbubblesOutline } from "react-icons/io5";
import { FaHandshake, FaStar, FaChevronDown, FaChevronUp, FaCrown, FaArrowRight } from "react-icons/fa";
import ComingSoonModal from "./ComingSoonModal";
import { RxCross2 } from "react-icons/rx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { serverUrl } from "@/App";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSidebarIndicators } from "@/hooks/useSidebarIndicators";
import { IoIosNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineTicket } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";

import { IoSettingsOutline } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { BiHelpCircle } from "react-icons/bi";
import { AiOutlineFund } from "react-icons/ai";
import { MdMoneyOffCsred } from "react-icons/md";
import { FaRegClosedCaptioning } from "react-icons/fa6";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { SiJfrogpipelines } from "react-icons/si";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineAppRegistration } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { LuLock } from "react-icons/lu";

const Mobile = () => {
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, fetchNotifications, markAllNotificationsAsRead } = useNotifications();
  const { indicators } = useSidebarIndicators();
  const [expandedIds, setExpandedIds] = useState([]);
  const location = useLocation();
  const [isDealsOpen, setIsDealsOpen] = useState(
    location.pathname.startsWith("/deal") && !location.pathname.startsWith("/deal/communication") && !location.pathname.startsWith("/deal/analytics")
  );
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(
    location.pathname.startsWith("/communication")
  );
  const [isOperateOpen, setIsOperateOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(location.pathname === "/profile");
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(location.pathname.startsWith("/request"));
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState("");
  const [hasRaisedRequests, setHasRaisedRequests] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [userName, setUserName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userId, setUserId] = useState(null);
  const [spMode, setSpMode] = useState(localStorage.getItem("spMode") || "provider");

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
  const [requestsLoading, setRequestsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      setRequestsLoading(true);
      try {
        const [reqRes, userRes, profileRes] = await Promise.all([
          axios.get(`${serverUrl}/requests`, {
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

        setHasRaisedRequests(reqRes.data.length > 0);
        setUserRole(userRes.data.role);
        setUserName(displayName);
        setProfilePhoto(profileData?.profilePhoto);
        setUserId(userRes.data._id);
        if (userRes.data.spMode) {
          setSpMode(userRes.data.spMode);
          localStorage.setItem("spMode", userRes.data.spMode);
        }
      } catch (err) {
        console.error("Error fetching mobile data", err);
        setHasRaisedRequests(false);
      } finally {
        setRequestsLoading(false);
      }
    };
    fetchData();

    // Listen for real-time updates triggered by NotificationContext
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
  }, [location.pathname]);

  const isStartup = String(userRole).toLowerCase().includes("startup");
  const isServiceProfessional = String(userRole).toLowerCase().includes("professional");
  const isInvestor = String(userRole).toLowerCase().includes("investor");

  const triggerComingSoon = (title) => {
    setComingSoonTitle(title);
    setShowComingSoon(true);
  };

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    setShowSignoutDialog(true);
  };

  const handleConfirmSignOut = () => {
    localStorage.removeItem("token");
    setShowSignoutDialog(false);
    toast.success("Signed out!"); // Replace with real logout
    navigate("/login");
  };

  // Notifications logic (similar to Sidebar)
  const handleNotificationClick = () => {
    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    if (showNotifications) {
      fetchNotifications();
      markAllNotificationsAsRead();
    }
  }, [showNotifications]);

  const toggleExpanded = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="">
      <div className="flex items-center justify-between bg-white lg:px-2  py-3">
        <div>
          <Link to="/dashboard">
            <img src={loginLogo} alt="logo" className="w-30 ml-1" />
          </Link>
        </div>

        <div className="flex items-center   rounded-full py-1 px-2 shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] mr-2">
          <div className="relative ml-1 cursor-pointer">
            <IoNotificationsOutline
              size={18}
              onClick={handleNotificationClick}
              className="text-[#59549F]"
            />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-600 text-[7px] font-bold text-white shadow-md animate-pulse">
                {notifications.filter(n => !n.isRead).length}
              </span>
            )}
          </div>
          <div className="w-0.2 h-6 border mx-1"></div>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex items-center ">
                <RxHamburgerMenu size={18} className="text-[#59549F] mx-1 " />
              </div>
            </SheetTrigger>

            <div>
              <SheetContent className="w-screen h-[90vh] p-3 bg-[#D5D5D5]  overflow-hidden flex flex-col">
                <div className="border border-[#D9D9D9] bg-white  flex-1 flex flex-col overflow-hidden">
                  {/* Top Header Row inside Mobile Drawer */}
                  <div className="flex items-center justify-between px-2 py-4 pt-3 shrink-0 bg-white">
                    <Link to="/dashboard">
                      <SheetClose asChild>
                        <img src={loginLogo} alt="logo" className="w-28" />
                      </SheetClose>
                    </Link>
                    <SheetClose asChild>
                      <button className="p-1  hover:bg-gray-100 transition-colors cursor-pointer text-[#000000]">
                        <RxCross2 size={24} />
                      </button>
                    </SheetClose>
                  </div>

                  <SheetHeader className="p-0">
                    <SheetTitle></SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-2">
                    <div className="grid flex-1 auto-rows-min gap-6 text-[#001032] text-xl pb-4">
                    <div id="top">
                      <ul className="flex flex-col gap-2 text-[16px] text-[#001426]">
                        <div className="flex items-center gap-4">
                          <MdOutlineDashboardCustomize
                            className="text-[#59549F] "
                            size={25}
                          />
                          <Link to="/dashboard">
                            <li>Dashboard</li>
                          </Link>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-4 w-full">
                            <CgProfile className="text-[#59549F] my-1" size={25} />
                            <li
                              className="flex justify-between items-center w-full cursor-pointer"
                              onClick={() => {
                                setIsProfileOpen(!isProfileOpen);
                                  if (!isProfileOpen) {
                                    setIsCommunicationOpen(false);
                                    setIsDealsOpen(false);
                                    setIsOperateOpen(false);
                                    setIsWorkspaceOpen(false);
                                    setIsRequirementsOpen(false);
                                  }
                              }}
                            >
                              <div className="flex-grow py-2">
                                <span>Profile</span>
                              </div>
                              <div className="p-2 pr-4">
                                {isProfileOpen ? (
                                  <FaChevronUp className="text-[#59549F]" size={15} />
                                ) : (
                                  <FaChevronDown className="text-[#59549F]" size={15} />
                                )}
                              </div>
                            </li>
                          </div>
                          {isProfileOpen && (
                            <ul className="ml-[41px] mt-1 flex flex-col gap-2 text-[15px] text-gray-600">
                              {isStartup && (
                                <>
                                  <SheetClose asChild>
                                    <div onClick={() => navigate("/profile")} className={`flex items-center gap-2 cursor-pointer ${location.pathname === "/profile" ? "text-[#59549f] font-semibold" : "hover:text-[#59549f]"}`}>
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Founder Profile</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div onClick={() => triggerComingSoon("Startup Profile")} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Company Profile</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div onClick={() => triggerComingSoon("Fundraising Profile")} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Fundraising Profile</li>
                                    </div>
                                  </SheetClose>
                                </>
                              )}
                              {isInvestor && (
                                <>
                                  <SheetClose asChild>
                                    <div onClick={() => navigate("/profile")} className={`flex items-center gap-2 cursor-pointer ${location.pathname === "/profile" ? "text-[#59549f] font-semibold" : "hover:text-[#59549f]"}`}>
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Investor Profile</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div onClick={() => triggerComingSoon("Investment Profile")} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Investment Profile</li>
                                    </div>
                                  </SheetClose>
                                </>
                              )}
                              {isServiceProfessional && (
                                <>
                                  <SheetClose asChild>
                                    <div onClick={() => navigate("/profile")} className={`flex items-center gap-2 cursor-pointer ${location.pathname === "/profile" ? "text-[#59549f] font-semibold" : "hover:text-[#59549f]"}`}>
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Professional Profile</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div onClick={() => triggerComingSoon("Service Profile")} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Service Profile</li>
                                    </div>
                                  </SheetClose>
                                </>
                              )}
                            </ul>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-4 w-full">
                            <HiOutlineTicket className="text-[#59549F] my-1" size={25} />
                            <li
                              className="flex justify-between items-center w-full cursor-pointer"
                              onClick={() => {
                                setIsRequirementsOpen(!isRequirementsOpen);
                                if (!isRequirementsOpen) {
                                  setIsCommunicationOpen(false);
                                  setIsDealsOpen(false);
                                  setIsOperateOpen(false);
                                  setIsWorkspaceOpen(false);
                                  setIsProfileOpen(false);
                                }
                              }}
                            >
                              <div className="flex items-center gap-2 flex-grow py-2">
                                <span>Service Request</span>
                                {indicators.requests.hasUnread && (
                                  <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                                    {indicators.requests.count}
                                  </span>
                                )}
                              </div>
                              <div className="p-2 pr-4">
                                {isRequirementsOpen ? (
                                  <FaChevronUp className="text-[#59549F]" size={15} />
                                ) : (
                                  <FaChevronDown className="text-[#59549F]" size={15} />
                                )}
                              </div>
                            </li>
                          </div>
                          {isRequirementsOpen && (
                            <ul className="ml-[41px] mt-1 flex flex-col gap-2 text-[15px] text-gray-600">
                              <SheetClose asChild>
                                <div onClick={() => navigate("/request", { state: { defaultTab: "newRequest" } })} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <li>New</li>
                                </div>
                              </SheetClose>
                              <SheetClose asChild>
                                <div onClick={() => navigate("/request", { state: { defaultTab: "received" } })} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <li>Received</li>
                                </div>
                              </SheetClose>
                              {(userRole === "startup" || spMode === "buyer") && (
                                <SheetClose asChild>
                                  <div onClick={() => navigate("/request", { state: { defaultTab: "raised" } })} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    <li>Raised</li>
                                  </div>
                                </SheetClose>
                              )}
                              <SheetClose asChild>
                                <div onClick={() => navigate("/request", { state: { defaultTab: "cancelled" } })} className="flex items-center gap-2 cursor-pointer hover:text-[#59549f]">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <li>Cancelled</li>
                                </div>
                              </SheetClose>
                            </ul>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <HiOutlineUserGroup
                            className="text-[#59549F] my-1"
                            size={25}
                          />
                          <Link to="/connect" className="flex items-center gap-2">
                            <li>Connect</li>
                            {indicators.connect.hasUnread && (
                              <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                                {indicators.connect.count}
                              </span>
                            )}
                          </Link>
                        </div>


                           <hr />
                           <h1 className="text-gray-500 text-[12px] my-1 font-bold uppercase tracking-wider">INSIGHTS</h1>
                        <div className="flex items-center gap-4">
                          <SiSimpleanalytics
                            className="text-[#59549F] my-1"
                            size={22}
                          />
                          <Link to="/deal/analytics">
                            <li>Analytics</li>
                          </Link>
                        </div>
                        <hr />
                         <div className="flex justify-start items-center gap-2 my-2">
                    <h1 className="text-gray-500 text-[12px]   font-bold uppercase tracking-wider">Growth</h1>
                    <h1 className="bg-[#F8F7FF] rounded-sm text-[12px] px-2 py-0.5 text-[#59549F]   font-bold">PREMIUM</h1>
                  </div>

                        {isInvestor && (
                          <div className=" py-2 px-1 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl flex flex-col gap-4">
                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Discover")}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <RiDeviceRecoverLine className="text-[#59549F]" size={28} />
                                  <div className="flex flex-col">
                                    <li className="list-none text-[15px] font-medium leading-tight text-gray-700">Discover</li>
                                    <p className="text-[11px] text-gray-400">Find potential deals</p>
                                  </div>
                                </div>
                                <LuLock className="text-gray-400" size={16} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Deal pipeline")}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <SiJfrogpipelines className="text-[#59549F]" size={28} />
                                  <div className="flex flex-col">
                                    <li className="list-none text-[15px] font-medium leading-tight text-gray-700">Deal pipeline</li>
                                    <p className="text-[11px] text-gray-400">Track investment flow</p>
                                  </div>
                                </div>
                                <LuLock className="text-gray-400" size={16} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("My investment")}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <RiMoneyDollarCircleLine className="text-[#59549F]" size={28} />
                                  <div className="flex flex-col">
                                    <li className="list-none text-[15px] font-medium leading-tight text-gray-700">My investment</li>
                                    <p className="text-[11px] text-gray-400">Portfolio performance</p>
                                  </div>
                                </div>
                                <LuLock className="text-gray-400" size={16} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Portfolio strategy")}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <MdOutlineAppRegistration className="text-[#59549F]" size={28} />
                                  <div className="flex flex-col">
                                    <li className="list-none text-[15px] font-medium leading-tight text-gray-700">Portfolio strategy</li>
                                    <p className="text-[11px] text-gray-400">Optimize returns</p>
                                  </div>
                                </div>
                                <LuLock className="text-gray-400" size={16} />
                              </div>
                            </SheetClose>

                            <div className="flex flex-col gap-2">
                              <div
                                className="flex items-center gap-4 cursor-pointer w-full"
                                onClick={() => {
                                  setIsWorkspaceOpen(!isWorkspaceOpen);
                                  if (!isWorkspaceOpen) {
                                    setIsCommunicationOpen(false);
                                    setIsDealsOpen(false);
                                    setIsOperateOpen(false);
                                    setIsProfileOpen(false);
                                    setIsRequirementsOpen(false);
                                  }
                                }}
                              >
                                <BsPersonWorkspace className="text-[#59549F]" size={28} />
                                <li className="flex justify-between items-center w-full">
                                  <div className="flex items-center gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[15px] font-medium leading-tight text-gray-700">Workspace</span>
                                      <p className="text-[11px] text-gray-400">Collaboration tools</p>
                                    </div>
                                    <LuLock className="text-gray-400" size={16} />
                                  </div>
                                  {isWorkspaceOpen ? (
                                    <FaChevronUp className="text-[#59549F]" size={15} />
                                  ) : (
                                    <FaChevronDown className="text-[#59549F]" size={15} />
                                  )}
                                </li>
                              </div>
                              {isWorkspaceOpen && (
                                <ul className="ml-11 mt-1 flex flex-col gap-3 text-[14px] text-gray-500">
                                  <SheetClose asChild>
                                    <div
                                      onClick={() => triggerComingSoon("Investor Documents")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Documents</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div
                                      onClick={() => triggerComingSoon("Investor Meetings")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Meetings</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div
                                      onClick={() => triggerComingSoon("Investor Alerts & risk")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Alerts & risk</li>
                                    </div>
                                  </SheetClose>
                                </ul>
                              )}
                            </div>
                          </div>
                        )}


                        {isStartup && (
                          <div className=" py-2 px-1 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl flex flex-col gap-4">
                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Fundraising")}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <AiOutlineFund className="text-[#59549F]" size={28} />
                                  <div className="flex flex-col">
                                    <li className="list-none text-[15px] font-medium text-gray-700 leading-tight">Fundraising</li>
                                    <p className="text-[11px] text-gray-400">Unlock investor pipeline</p>
                                  </div>
                                </div>
                                <LuLock className="text-gray-400" size={16} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Investors")}
                                className="flex items-center justify-between cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <MdMoneyOffCsred className="text-[#59549F]" size={28} />
                                  <div className="flex flex-col">
                                    <li className="list-none text-[15px] font-medium text-gray-700 leading-tight">Investors</li>
                                    <p className="text-[11px] text-gray-400">Manage investors relations</p>
                                  </div>
                                </div>
                                <LuLock className="text-gray-400" size={16} />
                              </div>
                            </SheetClose>

                            <div className="flex flex-col gap-2">
                              <div
                                className="flex items-center justify-between cursor-pointer w-full"
                                onClick={() => {
                                  setIsOperateOpen(!isOperateOpen);
                                  if (!isOperateOpen) {
                                    setIsCommunicationOpen(false);
                                    setIsDealsOpen(false);
                                    setIsProfileOpen(false);
                                    setIsRequirementsOpen(false);
                                    setIsWorkspaceOpen(false);
                                  }
                                }}
                              >
                                <div className="flex items-center gap-4">
                                  <FaRegClosedCaptioning className="text-[#59549F]" size={28} />
                                  <div className="flex flex-col">
                                    <span className="text-[15px] font-medium text-gray-700 leading-tight">Operate</span>
                                    <p className="text-[11px] text-gray-400">Startup operations hub</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <LuLock className="text-gray-400" size={16} />
                                  {/* {isOperateOpen ? (
                                    <FaChevronUp className="text-[#59549F]" size={15} />
                                  ) : (
                                    <FaChevronDown className="text-[#59549F]" size={15} />
                                  )} */}
                                </div>
                              </div>
                              {isOperateOpen && (
                                <ul className="ml-11 mt-1 flex flex-col gap-3 text-[14px] text-gray-500">
                                  <SheetClose asChild>
                                    <div
                                      onClick={() => triggerComingSoon("Metrics")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Metrics</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div
                                      onClick={() => triggerComingSoon("Documents")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Documents</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div
                                      onClick={() => triggerComingSoon("Cap Table")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Cap Table</li>
                                    </div>
                                  </SheetClose>
                                </ul>
                              )}
                            </div>
                          </div>
                        )}

<h1 className="text-gray-500 text-[12px]  font-bold uppercase tracking-wider my-2">Manage</h1>
                        <div className="flex flex-col gap-2">
                          <div
                            className="flex items-center gap-4 cursor-pointer w-full"
                            onClick={() => {
                              setIsCommunicationOpen(!isCommunicationOpen);
                              if (!isCommunicationOpen) {
                                setIsDealsOpen(false);
                                setIsOperateOpen(false);
                                setIsProfileOpen(false);
                                setIsRequirementsOpen(false);
                                setIsWorkspaceOpen(false);
                              }
                            }}
                          >
                            <IoChatbubblesOutline className="text-[#59549F]" size={28} />
                            <li className="flex justify-between items-center w-full">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="text-[15px] font-medium leading-tight text-gray-700">Communication</span>
                                  {indicators.communication.hasUnread && (
                                    <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                                      {indicators.communication.count}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-400">Messages, notifications</p>
                              </div>
                              {isCommunicationOpen ? (
                                <FaChevronUp className="text-[#59549F]" size={15} />
                              ) : (
                                <FaChevronDown className="text-[#59549F]" size={15} />
                              )}
                            </li>
                          </div>
                          {isCommunicationOpen && (
                              <ul className="ml-11 mt-1 flex flex-col gap-2 text-[15px] text-gray-600">
                                <Link to="/communication/message" className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <li>Message</li>
                                </Link>
                                <Link to="/communication/meet" className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <li>Meet</li>
                                </Link>
                                <Link to="/communication/call" className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  <li>Call</li>
                                </Link>
                              </ul>
                          )}
                        </div>
                        {/* Deals Dropdown */}

                        <div
                          className="flex items-center gap-4.5 cursor-pointer w-full"
                          onClick={() => {
                            setIsDealsOpen(!isDealsOpen);
                            if (!isDealsOpen) {
                              setIsCommunicationOpen(false);
                              setIsOperateOpen(false);
                              setIsProfileOpen(false);
                              setIsRequirementsOpen(false);
                              setIsWorkspaceOpen(false);
                            }
                          }}
                        >
                          <FaHandshake className="text-[#59549F]" size={28} />

                          <li className="flex justify-between items-center w-full mt-2">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-[15px] font-medium leading-tight text-gray-700">Service Deal</span>
                                {indicators.serviceDeal.hasUnread && (
                                  <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                                    {indicators.serviceDeal.count}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-400">Agreements & services</p>
                            </div>

                            {isDealsOpen ? (
                              <FaChevronUp
                                className="text-[#59549F]"
                                size={15}
                              />
                            ) : (
                              <FaChevronDown
                                className="text-[#59549F]"
                                size={15}
                              />
                            )}
                          </li>
                        </div>

                        {isDealsOpen && (
                          <ul className="ml-11 mt-2 flex flex-col gap-2 text-[15px] text-gray-600">
                            <Link to="/deal/activedeals" className="flex items-center justify-between pr-4">
                              <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <li>Active Deals</li>
                              </div>
                              {indicators.serviceDeal.activeDealsCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.activeDealsCount}</span>}
                            </Link>
                             <Link to="/deal/negotiations" className="flex items-center justify-between pr-4">
                              <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <li>Negotiations</li>
                              </div>
                              {indicators.serviceDeal.negotiationsCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.negotiationsCount}</span>}
                            </Link>
                            <Link to="/deal/documentation" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Documentation</li>
                            </Link>
                             <Link to="/deal/payments" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Payments</li>
                            </Link>

                            <Link to="/deal/revenue" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Revenue</li>
                            </Link>

                            <Link to="/deal/milestones" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Milestones</li>
                            </Link>
                             <Link to="/deal/completed" className="flex items-center justify-between pr-4">
                              <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <li>Completed</li>
                              </div>
                              {indicators.serviceDeal.completedCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.completedCount}</span>}
                            </Link>
                            <Link to="/deal/disputes" className="flex items-center justify-between pr-4">
                              <div className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <li>Disputes</li>
                              </div>
                              {indicators.serviceDeal.disputesCount > 0 && <span className="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">{indicators.serviceDeal.disputesCount}</span>}
                            </Link>
                        </ul>
                      )}

                    {isStartup && (
                      <SheetClose asChild>
                        <div
                          onClick={() => triggerComingSoon("Switch to Professional")}
                          className=" mt-4 py-4 mb-4 flex items-center justify-between p-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="text-[14px] my-1 font-bold text-[#59549f]">Switch to Professional</span>
                            <span className="text-[10px]  text-gray-500 font-medium">Explore professional tools</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <div className="w-11 h-6 bg-gray-300 rounded-full transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm"></div>
                          </div>
                        </div>
                      </SheetClose>
                    )}

                    {isServiceProfessional && (
                      <SheetClose asChild>
                        <div
                          onClick={async () => {
                            const newMode = spMode === "provider" ? "buyer" : "provider";
                            setSpMode(newMode);
                            localStorage.setItem("spMode", newMode);
                            try {
                              const token = localStorage.getItem("token");
                              await axios.put(`${serverUrl}/user/sp-mode`, { spMode: newMode }, {
                                headers: { Authorization: `Bearer ${token}` }
                              });
                              window.dispatchEvent(new Event("spModeChanged"));
                            } catch (err) {
                              console.error("Failed to update spMode on backend", err);
                              // Revert on failure
                              setSpMode(spMode);
                              localStorage.setItem("spMode", spMode);
                              toast.error("Failed to update mode");
                            }
                          }}
                          className={`mt-4 py-4 mb-4 flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-all duration-300 ${spMode === "buyer" ? "bg-[#f8f7ff] border-[#e8e6f8]" : "bg-white border-gray-100 hover:border-gray-200 shadow-sm"}`}
                        >
                          <div className="flex flex-col">
                            <span className={`text-[14px] my-1 font-bold ${spMode === "buyer" ? "text-[#59549f]" : "text-[#001032]"}`}>
                              {spMode === "provider" ? "Switch to Buyer" : "Switch to Provider"}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium">
                              {spMode === "provider" ? "Experience buyer portal" : "Experience provider portal"}
                            </span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <div className={`w-11 h-6 rounded-full transition-colors ${spMode === "buyer" ? "bg-[#59549f]" : "bg-gray-300"}`}></div>
                            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${spMode === "buyer" ? "translate-x-6" : "translate-x-0"}`}></div>
                          </div>
                        </div>
                      </SheetClose>
                    )}

                     {/* Premium Upgrade Card - Only for Startup and Service Professional */}
                     {(isStartup || isServiceProfessional) && (
                        <SheetClose asChild>
                          <div className="  mb-6 mt-2 p-2 py-5 bg-[#F8F7FF] border border-[#E9E7FD] rounded-2xl relative overflow-hidden group cursor-pointer" onClick={() => triggerComingSoon("Premium Infrastructure")}>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-[#59549F] rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                                <FaCrown size={18} />
                              </div>
                              <div className="text-left">
                                <h2 className="text-[13px] font-bold text-[#59549f]">Upgrade to Premium</h2>
                                <p className="text-[11px] text-gray-500 leading-tight">Unlock powerful tools to grow your startup faster.</p>
                              </div>
                            </div>
                            <button className="w-full py-1 mt-6 bg-[#59549F] text-white rounded-sm text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-[#48438A] transition-colors relative z-10">
                              View Plans
                              <FaArrowRight size={12} />
                            </button>
                            {/* Decorative background element */}
                            <div className="absolute bottom-[-10px] right-[-10px] opacity-10 pointer-events-none">
                               <SiSimpleanalytics size={80} />
                            </div>
                          </div>
                        </SheetClose>
                     )}
                   </ul>
                 </div>
 
                    <div id="bottom" className="mt-8 mb-2">
                      <ul className="flex flex-col gap-2 text-[16px] text-gray-600">
                        <div className="flex items-center gap-4">
                          <IoSettingsOutline
                            className=" text-[#59549F] my-1"
                            size={25}
                          />
                          <Link to="/settings">
                            <li>Settings</li>
                          </Link>
                        </div>

                        <div className="flex items-center gap-4">
                          <BiHelpCircle className="text-[#59549F]" size={25} />
                          <Link to="/help">
                            <li>Help</li>
                          </Link>
                        </div>
                      </ul>
                    </div>
                       <hr />
                    <div id="user-profile" className="mb-2 ">
                      {showSignoutDialog && (
                        <div className="flex flex-col gap-2 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                          <Button
                            type="button"
                            className="w-full text-[16px] bg-[#D8D6F8] text-[#59549F] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)] font-bold  rounded-lg" 
                            onClick={handleConfirmSignOut}
                          >
                            Sign out
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full text-gray-500 font-medium bg-gray-100 text-[16px]"
                            onClick={() => setShowSignoutDialog(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}

                      <div 
                        onClick={() => setShowSignoutDialog(!showSignoutDialog)}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#59549F] flex items-center justify-center text-white font-bold shrink-0 overflow-hidden">
                          {profilePhoto ? (
                            <img src={getImageUrl(profilePhoto)} alt="" className="w-full h-full object-cover" />
                          ) : (
                            userName ? userName.charAt(0).toUpperCase() : "U"
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                      <p className="text-[16px] font-semibold text-[#001032] truncate">{userName}</p>
                      <p className="text-[12px] text-gray-500 capitalize">{userRole?.replace("_", " ")}</p>
                    </div>
                        <FaChevronDown 
                          className={`text-gray-400 transition-transform duration-200 ${showSignoutDialog ? "rotate-180" : ""}`} 
                          size={14} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              </SheetContent>
            </div>
          </Sheet>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute left-1/2 -translate-x-1/2 top-35 w-full max-h-[60vh] bg-white border border-gray-300 shadow-lg rounded-md z-50 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl">Notifications </h1>
            <RxCross2 size={25} onClick={handleNotificationClick} />
          </div>
          <hr />
          <div className="flex flex-col gap-2 px-2 py-3">
            {notifications.length === 0 ? (
              <p className="text-[18px]">No notifications</p>
            ) : (
              notifications.map((n) => {
                const isExpanded = expandedIds.includes(n._id);
                return (
                  <div
                    key={n._id}
                    className="border p-2 flex flex-col gap-2 rounded-lg w-full bg-gray-50 hover:bg-white transition-colors"
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 bg-[#D8D6F8] text-sm">
                        {n.type === "missing_portfolio" || n.type === "incomplete_profile" ? "⚠️" : n.type === "welcome_trigger" ? "✨" : n.type === "new_opportunity" ? "📋" : n.type === "explore_professionals" ? "🔍" : "🔔"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#001426]">{n.title}</p>
                        <p
                          className={`text-xs text-gray-600 leading-relaxed ${
                            !isExpanded ? "line-clamp-2" : ""
                          }`}
                        >
                          {n.message}
                        </p>
                        {n.message.length > 100 && (
                          <button
                            className="text-blue-600 text-xs mt-1 font-medium"
                            onClick={() => toggleExpanded(n._id)}
                          >
                            {isExpanded ? "Show Less" : "See More"}
                          </button>
                        )}
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
                );
              })
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

export default Mobile;
