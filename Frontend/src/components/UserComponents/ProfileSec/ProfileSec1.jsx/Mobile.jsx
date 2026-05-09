import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginLogo from "/coptenologo2.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotificationsOutline, IoChatbubblesOutline } from "react-icons/io5";
import { FaHandshake, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
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

const Mobile = () => {
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false);
  const [isOperateOpen, setIsOperateOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState("");
  const [hasRaisedRequests, setHasRaisedRequests] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const location = useLocation();
  const [requestsLoading, setRequestsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      setRequestsLoading(true);
      try {
        const [reqRes, userRes] = await Promise.all([
          axios.get(`${serverUrl}/requests`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${serverUrl}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);
        setHasRaisedRequests(reqRes.data.length > 0);
        setUserRole(userRes.data.role);
      } catch (err) {
        console.error("Error fetching mobile data", err);
        setHasRaisedRequests(false);
      } finally {
        setRequestsLoading(false);
      }
    };
    fetchData();
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

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${serverUrl}/profile/notifications`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  useEffect(() => {
    if (showNotifications) fetchNotifications();
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
          <IoNotificationsOutline
            size={18}
            onClick={handleNotificationClick}
            className="text-[#59549F] ml-1"
          />
          <div className="w-0.2 h-6 border mx-1"></div>
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex items-center ">
                <RxHamburgerMenu size={18} className="text-[#59549F] mx-1 " />
              </div>
            </SheetTrigger>

            <div>
              <SheetContent className="w-screen h-[85vh] p-3 bg-[#D5D5D5] rounded-2xl mt-17 overflow-y-auto scrollbar-hide">
                <div className="border border-[#D9D9D9] bg-white ">
                  <SheetHeader>
                    <SheetTitle></SheetTitle>
                  </SheetHeader>

                  <div className="grid flex-1 auto-rows-min gap-6 text-[#001032] text-xl px-4">
                    <div id="top">
                      <ul className="flex flex-col gap-2 text-[16px] text-gray-600">
                        <div className="flex items-center gap-4">
                          <MdOutlineDashboardCustomize
                            className="text-[#59549F] "
                            size={25}
                          />
                          <Link to="/dashboard">
                            <li>Dashboard</li>
                          </Link>
                        </div>

                        <div className="flex items-center gap-4">
                          <CgProfile className="text-[#59549F] my-1" size={25} />
                          <Link to="/profile">
                            <li>Profile</li>
                          </Link>
                        </div>

                        <div className="flex items-center gap-4">
                          <HiOutlineTicket
                            className="text-[#59549F] "
                            size={25}
                          />
                          <Link to="/request">
                            <li>Requests</li>
                          </Link>
                        </div>

                        <div className="flex items-center gap-4">
                          <HiOutlineUserGroup
                            className="text-[#59549F] my-1"
                            size={25}
                          />
                          <Link to="/connect">
                            <li>Connect</li>
                          </Link>
                        </div>



                        <div className="flex items-center gap-4">
                          <SiSimpleanalytics
                            className="text-[#59549F] my-1"
                            size={25}
                          />
                          <Link to="/deal/analytics">
                            <li>Analytics</li>
                          </Link>
                        </div>

                        {isInvestor && (
                          <>
                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Discover")}
                                className="flex items-center justify-between pr-4 cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <RiDeviceRecoverLine className="text-[#59549F] my-1" size={25} />
                                  <li>Discover</li>
                                </div>
                                <FaStar className="text-yellow-400" size={14} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Deal pipeline")}
                                className="flex items-center justify-between pr-4 cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <SiJfrogpipelines className="text-[#59549F] my-1" size={25} />
                                  <li>Deal pipeline</li>
                                </div>
                                <FaStar className="text-yellow-400" size={14} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("My investment")}
                                className="flex items-center justify-between pr-4 cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <RiMoneyDollarCircleLine className="text-[#59549F] my-1" size={25} />
                                  <li>My investment</li>
                                </div>
                                <FaStar className="text-yellow-400" size={14} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Portfolio strategy")}
                                className="flex items-center justify-between pr-4 cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <MdOutlineAppRegistration className="text-[#59549F] my-1" size={25} />
                                  <li>Portfolio strategy</li>
                                </div>
                                <FaStar className="text-yellow-400" size={14} />
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
                                  }
                                }}
                              >
                                <BsPersonWorkspace className="text-[#59549F]" size={25} />
                                <li className="flex justify-between items-center w-full pr-4">
                                  <div className="flex items-center gap-2">
                                    <span>Workspace</span>
                                    <FaStar className="text-yellow-400" size={14} />
                                  </div>
                                  {isWorkspaceOpen ? (
                                    <FaChevronUp className="text-[#59549F]" size={15} />
                                  ) : (
                                    <FaChevronDown className="text-[#59549F]" size={15} />
                                  )}
                                </li>
                              </div>
                              {isWorkspaceOpen && (
                                <ul className="ml-11 mt-1 flex flex-col gap-2 text-[15px] text-gray-600">
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
                                      onClick={() => triggerComingSoon("Meetings")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Meetings</li>
                                    </div>
                                  </SheetClose>
                                  <SheetClose asChild>
                                    <div
                                      onClick={() => triggerComingSoon("Alerts & risk")}
                                      className="flex items-center gap-2 cursor-pointer"
                                    >
                                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                      <li>Alerts & risk</li>
                                    </div>
                                  </SheetClose>
                                </ul>
                              )}
                            </div>
                          </>
                        )}

                        {isStartup && (
                          <>
                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Fundraising")}
                                className="flex items-center justify-between pr-4 cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <AiOutlineFund className="text-[#59549F] my-1" size={25} />
                                  <li>Fundraising</li>
                                </div>
                                <FaStar className="text-yellow-400" size={14} />
                              </div>
                            </SheetClose>

                            <SheetClose asChild>
                              <div
                                onClick={() => triggerComingSoon("Investors")}
                                className="flex items-center justify-between pr-4 cursor-pointer"
                              >
                                <div className="flex items-center gap-4">
                                  <MdMoneyOffCsred className="text-[#59549F] my-1" size={25} />
                                  <li>Investors</li>
                                </div>
                                <FaStar className="text-yellow-400" size={14} />
                              </div>
                            </SheetClose>

                            <div className="flex flex-col gap-2">
                              <div
                                className="flex items-center gap-4 cursor-pointer w-full"
                                onClick={() => {
                                  setIsOperateOpen(!isOperateOpen);
                                  if (!isOperateOpen) {
                                    setIsCommunicationOpen(false);
                                    setIsDealsOpen(false);
                                  }
                                }}
                              >
                                <FaRegClosedCaptioning className="text-[#59549F]" size={25} />
                                <li className="flex justify-between items-center w-full pr-4">
                                  <div className="flex items-center gap-2">
                                    <span>Operate</span>
                                    <FaStar className="text-yellow-400" size={14} />
                                  </div>
                                  {isOperateOpen ? (
                                    <FaChevronUp className="text-[#59549F]" size={15} />
                                  ) : (
                                    <FaChevronDown className="text-[#59549F]" size={15} />
                                  )}
                                </li>
                              </div>
                              {isOperateOpen && (
                                <ul className="ml-11 mt-1 flex flex-col gap-2 text-[15px] text-gray-600">
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
                          </>
                        )}

                        <div className="flex flex-col gap-2">
                          <div
                            className="flex items-center gap-4 cursor-pointer w-full"
                            onClick={() => {
                              setIsCommunicationOpen(!isCommunicationOpen);
                              if (!isCommunicationOpen) {
                                setIsDealsOpen(false);
                                setIsOperateOpen(false);
                              }
                            }}
                          >
                            <IoChatbubblesOutline className="text-[#59549F]" size={25} />
                            <li className="flex justify-between items-center w-full">
                              <span>Communication</span>
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
                            }
                          }}
                        >
                          <FaHandshake className="text-[#59549F]" size={28} />

                          <li className="flex justify-between items-center w-full">
                            <span>Service Deal</span>

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
                            <Link to="/deal/activedeals" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Active Deals</li>
                            </Link>
                             <Link to="/deal/negotiations" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Negotiations</li>
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
                             <Link to="/deal/completed" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Completed</li>
                            </Link>
                            <Link to="/deal/disputes" className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <li>Disputes</li>
                            </Link>
                        </ul>
                      )}

                    {isStartup && (
                      <SheetClose asChild>
                        <div
                          onClick={() => triggerComingSoon("Role Switching")}
                          className="ml-11 mr-6 mt-4 mb-4 flex items-center justify-between p-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#59549f]">Switch to Professional</span>
                            <span className="text-[10px] text-gray-500 font-medium">Explore professional tools</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <div className="w-11 h-6 bg-gray-200 rounded-full transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm"></div>
                          </div>
                        </div>
                      </SheetClose>
                    )}

                    {isServiceProfessional && (
                      <SheetClose asChild>
                        <div
                          onClick={() => triggerComingSoon("Role Switching")}
                          className="ml-11 mr-6 mt-4 mb-4 flex items-center justify-between p-3 bg-[#F8F7FF] border border-[#E9E7FD] rounded-xl cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-[#59549f]">Switch to Buyer</span>
                            <span className="text-[10px] text-gray-500 font-medium">View as a buyer</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <div className="w-11 h-6 bg-gray-200 rounded-full transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm"></div>
                          </div>
                        </div>
                      </SheetClose>
                    )}
                  </ul>
                </div>

                    <div id="bottom" className="mt-10 mb-6">
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
                  </div>

                  <SheetFooter>
                    <Button
                      type="button"
                      className="bg-[#D8D6F8] text-[#59549F] shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]" 
                      onClick={handleSignOutClick}
                    >
                      Sign out
                    </Button>

                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                  </SheetFooter>
                </div>

                {showSignoutDialog && (
                  <div className="absolute bottom-30  left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-300 shadow-lg rounded-md w-[88%] flex flex-col items-center text-sm  p-2">
                    <button
                      onClick={handleConfirmSignOut}
                      className="w-full py-2 border-b border-gray-200 active:bg-[#D8D6F8] active:text-[#001032] rounded-md"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowSignoutDialog(false)}
                      className="w-full py-2 active:bg-[#D8D6F8] bg-[#D8D6F8] active:text-[#001032]  text-[#001032] rounded-md shadow-[inset_0px_0px_12px_0px_rgba(0,0,0,0.25)]"
                    >
                      No
                    </button>
                  </div>
                )}
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
                    className="border p-2 flex items-start gap-4 rounded-lg w-full"
                  >
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{n.title}</p>
                      <p
                        className={`text-sm text-gray-600 transition-all duration-300 ${
                          !isExpanded ? "line-clamp-2" : ""
                        }`}
                      >
                        {n.message}
                      </p>
                      {n.message.length > 100 && (
                        <button
                          className="text-blue-600 text-sm mt-1"
                          onClick={() => toggleExpanded(n._id)}
                        >
                          {isExpanded ? "Show Less" : "See More"}
                        </button>
                      )}
                    </div>
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
        />
      )}
    </div>
  );
};

export default Mobile;
