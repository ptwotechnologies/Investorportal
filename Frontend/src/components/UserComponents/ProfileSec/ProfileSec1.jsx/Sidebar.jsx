import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BiHelpCircle } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";

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
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isDealRoute = location.pathname.startsWith("/deal");
  const [isDealsOpen, setIsDealsOpen] = useState(false);
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false);
  const [hasCreatedDeals, setHasCreatedDeals] = useState(false);
  const [deals, setDeals] = useState(globalDealsCache || []);
  const [dealsLoading, setDealsLoading] = useState(!globalDealsCache);
  const [userId, setUserId] = useState(globalUserCache?._id || null);
  const [userRole, setUserRole] = useState(globalUserCache?.role || localStorage.getItem("role"));

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
          setDealsLoading(false);
          return;
        }

        const [res, userRes] = await Promise.all([
          axios.get(`${serverUrl}/api/deals/my-deals`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${serverUrl}/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        // Update cache
        globalDealsCache = res.data;
        globalUserCache = userRes.data;
        lastFetchTime = Date.now();

        setDeals(res.data);
        setHasCreatedDeals(res.data.length > 0);
        setUserId(userRes.data._id);
        setUserRole(userRes.data.role);
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
    return () => window.removeEventListener("sidebar-refresh", fetchData);
  }, [token, location.pathname]);

  const isAtActiveDeals = location.pathname === "/deal/activedeals";
  const isAtNegotiations = location.pathname === "/deal/negotiations";

  const hasActiveDealDot = !isAtActiveDeals && deals.some(d => 
    String(userRole).toLowerCase().includes("professional") && d.status === "Draft"
  );

  const hasNegotiationDot = !isAtNegotiations && deals.some(d => {
    if (d.status === "Negotiating") {
      return d.negotiation?.lastSender && String(d.negotiation.lastSender) !== String(userId);
    }
    return false;
  });

  const hasAnyDealDot = hasActiveDealDot || hasNegotiationDot;

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

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${serverUrl}/profile/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  useEffect(() => {
    if (showNotifications) {
      // jab box open ho
      fetchNotifications();
    }
  }, [showNotifications]);

  const [expandedIds, setExpandedIds] = useState([]); // store expanded notification IDs

  const toggleExpanded = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // ✅ Open deal route when navigating (Exclude Communication)
  useEffect(() => {
    const isCommunicationRoute = location.pathname === "/deal/communication";
    if (isDealRoute && !isCommunicationRoute) {
      setIsDealsOpen(true);
    }
  }, [location.pathname, isDealRoute]);

  return (
    <div className="fixed top-0 left-0 h-full bg-[#D8D6F8]  p-4 flex flex-col justify-between z-50">
      {/* Top Icons */}
      <div>
        <div className=" text-[#59549f] py-6">
          <IoMdMenu  size={27} onClick={handleToggle} />
        </div>
        <div>
          <MdOutlineDashboardCustomize
            className="text-[#59549f] my-4"
            size={25}
            onClick={handleToggle}
          />

          <CgProfile
            className=" text-[#59549f] my-3"
            size={25}
            onClick={handleToggle}
          />
          <HiOutlineTicket
            className="text-[#59549f] my-3"
            size={25}
            onClick={handleToggle}
          />
          <HiOutlineUserGroup
            className="text-[#59549f] my-3"
            size={25}
            onClick={handleToggle}
          />
          <IoNotificationsOutline
            className=" text-[#59549f] my-3"
            size={25}
            onClick={handleNotificationClick} // Show/hide notifications
          />

           <Link to="/deal/analytics">
            <SiSimpleanalytics
              className=" text-[#59549f] my-3"
              size={22}
            />
          </Link>

          <Link to="/deal/communication">
            <IoChatbubblesOutline
              className=" text-[#59549f] my-3"
              size={25}
            />
          </Link>

          <FaHandshake
            className=" text-[#59549f] my-3"
            size={25}
            onClick={handleToggle}
          />
        </div>
      </div>

      {/* Notification Box */}

      {showNotifications && (
        <div className="absolute top-14 left-74 ml-4 w-100 h-[90vh] bg-white border border-gray-300 shadow-lg rounded-md z-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg">Notifications </h1>
            <RxCross2 size={25} onClick={handleNotificationClick} />
          </div>
          <hr />
          <div className="flex flex-col gap-2 max-h-[90vh] overflow-y-auto scrollbar-hide px-2 py-3">
            {notifications.length === 0 ? (
              <p>No notifications</p>
            ) : (
              notifications.map((n) => {
                const isExpanded = expandedIds.includes(n._id); // check if this notification is expanded
                return (
                  <div
                    key={n._id}
                    className="border p-2 flex items-start gap-4 rounded-lg w-full"
                  >
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0"></div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{n.title}</p>

                      <p
                        className={`text-sm text-gray-600 transition-all duration-300 overflow-y-auto scrollbar-hide ${
                          !expandedIds.includes(n._id) ? "line-clamp-2" : ""
                        }`}
                      >
                        {n.message}
                      </p>

                      {n.message.length > 100 && (
                        <button
                          className="text-blue-600 text-sm mt-1"
                          onClick={() => toggleExpanded(n._id)}
                        >
                          {expandedIds.includes(n._id)
                            ? "Show Less"
                            : "See More"}
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

      {/* Bottom Icons */}
      <div className="text-gray-300 relative pb-3">
        <IoSettingsOutline
          size={25}
          className="my-2 text-[#59549f]"
          onClick={handleToggle}
        />
        <BiHelpCircle
          size={25}
          className="my-3 text-[#59549f]"
          onClick={handleToggle}
        />
        <PiSignOut
          size={25}
          className="my-3 text-[#59549f]"
          onClick={handleSignOutClick}
        />

        {showSignoutDialog && (
          <div className="absolute bottom-15 left-12 z-50 bg-white border border-gray-300 shadow-lg rounded-md w-57 flex flex-col items-center text-sm text-[#001426] p-0.5">
            <button
              onClick={handleConfirmSignOut}
              className="w-full py-2 border-b border-gray-200 hover:bg-gray-100 text-[#001032]"
            >
              Yes
            </button>
            <button
              onClick={() => setShowSignoutDialog(false)}
              className="w-full py-2 hover:bg-gray-100 text-[#001032]"
            >
              No
            </button>
          </div>
        )}
      </div>

      {/* Right Panel Toggle */}
      {isOpen && (
        <div className="absolute top-0 left-full ml- w-60 bg-white h-full rounded-tr-2xl rounded-br-2xl shadow-lg transition-all duration-300 z-40">
          <div className="my-6 flex justify-center">
            <Link to="/dashboard">
              <img src={loginLogo} alt="logo" className="w-40" />
            </Link>
          </div>
          <div className="text-[#001426]">
            <ul>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block my-3 text-[17px]  px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block my-3  text-[17px] px-4 mx-3 rounded-md ${
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
              </NavLink>

              <NavLink
                to="/connect"
                className={({ isActive }) =>
                  `block my-3 text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Connect
              </NavLink>

              <li
                className="block my-3  text-[17px] px-4 mx-3 rounded-md cursor-pointer"
                onClick={handleNotificationClick} // open same notification box
              >
                Notification
              </li>
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

              <div className="my-3 relative">
                <div
                  onClick={() => {
                    setIsCommunicationOpen(!isCommunicationOpen);
                    if (!isCommunicationOpen) setIsDealsOpen(false);
                  }}
                  className="text-[17px] px-4 mx-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-gray-100 relative"
                >
                  <span>Communication</span>
                  {isCommunicationOpen ? (
                    <FaChevronUp className="text-gray-500 text-sm" size={12} />
                  ) : (
                    <FaChevronDown className="text-gray-500 text-sm" size={12} />
                  )}
                </div>

                {isCommunicationOpen && (
                  <div className="absolute left-3 top-full mt-1 w-54 bg-white shadow-xl rounded-xl z-50 flex flex-col text-[13px] text-gray-600 p-3 border border-gray-100">
                    <NavLink
                      to="/communication/message"
                      className={({ isActive }) => `flex items-center justify-between py-1.5 pr-2 hover:text-[#001032] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <div className="flex items-center gap-2 ml-3">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Message
                      </div>
                    </NavLink>
                    <NavLink
                      to="/communication/meet"
                      className={({ isActive }) => `flex items-center justify-between py-1.5 pr-2 hover:text-[#001032] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <div className="flex items-center gap-2 ml-3">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Meet
                      </div>
                    </NavLink>
                    <NavLink
                      to="/communication/call"
                      className={({ isActive }) => `flex items-center justify-between py-1.5 pr-2 hover:text-[#001032] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <div className="flex items-center gap-2 ml-3">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Call
                      </div>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Deals Dropdown */}
              <div className="my-3 relative">
                <div
                  onClick={() => {
                    setIsDealsOpen(!isDealsOpen);
                    if (!isDealsOpen) setIsCommunicationOpen(false);
                  }}
                  className="text-[17px] px-4 mx-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-gray-100 relative"
                >
                  <span>Deal Workspace</span>

                  <div className="flex items-center gap-2">
                    {hasAnyDealDot && (
                      <div className="w-2 h-2 bg-[#3CC033] rounded-full shadow-[0px_0px_4px_#3CC033]" />
                    )}
                    {isDealsOpen ? (
                      <FaChevronUp className="text-gray-500 text-sm" size={12} />
                    ) : (
                      <FaChevronDown
                        className="text-gray-500 text-sm"
                        size={12}
                      />
                    )}
                  </div>
                </div>

                {isDealsOpen && (
                  <div className="absolute left-3 top-full mt-1 w-54 bg-white shadow-xl rounded-xl z-50 flex flex-col text-[13px] text-gray-600 p-3 border border-gray-100 max-h-80 overflow-y-auto scrollbar-hide">
                    <NavLink
                      to="/deal/activedeals"
                      className={({ isActive }) => `flex items-center justify-between py-1.5 pr-2 hover:text-[#001032] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <div className="flex items-center gap-2 ml-3">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Active Deals
                      </div>
                      {hasActiveDealDot && location.pathname !== "/deal/activedeals" && (
                        <div className="w-1.5 h-1.5 bg-[#3CC033] rounded-full shadow-[0px_0px_4px_#3CC033]" />
                      )}
                    </NavLink>

                    <NavLink
                      to="/deal/negotiations"
                      className={({ isActive }) => `flex items-center justify-between py-1.5 pr-2 hover:text-[#001032] ${isActive ? "text-[#59549f] font-bold" : ""}`}
                    >
                      <div className="flex items-center gap-2 ml-3">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        Negotiations
                      </div>
                      {hasNegotiationDot && location.pathname !== "/deal/negotiations" && (
                        <div className="w-1.5 h-1.5 bg-[#3CC033] rounded-full shadow-[0px_0px_4px_#3CC033]" />
                      )}
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
                      to="/deal/milestones"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                      Milestones
                    </NavLink>

                    <NavLink
                      to="/deal/completed"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                      Completed
                    </NavLink>

                    <NavLink
                      to="/deal/disputes"
                      className="flex items-center gap-2 py-1.5 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full ml-3"></span>
                      Disputes
                    </NavLink>
                  </div>
                )}
              </div>
            </ul>
          </div>

          <div className="absolute bottom-10 w-full">
            <ul>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block my-3  text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Settings
              </NavLink>

              <NavLink
                to="/help"
                className={({ isActive }) =>
                  `block my-3  text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#D8D6F8] text-[#59549f]" : "text-[#001426]"
                  }`
                }
              >
                Help
              </NavLink>

              <li
                onClick={handleSignOutClick}
                className=" text-[17px] px-4 mx-3 rounded-md cursor-pointer"
              >
                Sign out
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
