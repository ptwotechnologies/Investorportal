import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import requestLogo from "/requestlogo.png";
import connectLogo from "/connectlogo.png";
import { IoNotificationsOutline } from "react-icons/io5";
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

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // New state
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const isDealRoute = location.pathname.startsWith("/deal");
  const [isDealsOpen, setIsDealsOpen] = useState(isDealRoute);
  const [hasRaisedRequests, setHasRaisedRequests] = useState(null);

  useEffect(() => {
    const checkRequests = async () => {
      try {
        const res = await axios.get(`${serverUrl}/requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHasRaisedRequests(res.data.length > 0);
      } catch (err) {
        console.error("Error fetching raised requests count", err);
      }
    };
    if (token) checkRequests();
  }, [token]);

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

  useEffect(() => {
    if (isDealRoute) {
      setIsDealsOpen(true);
    }
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 h-full bg-[#001032] p-4 flex flex-col justify-between z-50">
      {/* Top Icons */}
      <div>
        <div className="py-6">
          <IoMdMenu className="text-white" size={27} onClick={handleToggle} />
        </div>
        <div>
          <MdOutlineDashboardCustomize
            className="text-white my-4"
            size={25}
            onClick={handleToggle}
          />

          <CgProfile
            className="text-white my-3"
            size={25}
            onClick={handleToggle}
          />
          <HiOutlineTicket
            className="text-white my-3"
            size={25}
            onClick={handleToggle}
          />
          <HiOutlineUserGroup
            className="text-white my-3"
            size={25}
            onClick={handleToggle}
          />
          <IoNotificationsOutline
            className="text-white my-3"
            size={25}
            onClick={handleNotificationClick} // Show/hide notifications
          />

          <FaHandshake
            className="text-white my-3"
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
          className="my-2 text-white"
          onClick={handleToggle}
        />
        <BiHelpCircle
          size={25}
          className="my-3 text-white"
          onClick={handleToggle}
        />
        <PiSignOut
          size={25}
          className="my-3 text-white"
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
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block my-3  text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to="/request"
                className={({ isActive }) =>
                  `block my-3 text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Requests
              </NavLink>

              <NavLink
                to="/connect"
                className={({ isActive }) =>
                  `block my-3 text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
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

              {/* Deals Dropdown */}
              <div className="my-3">
                <div
                  onClick={() => {
                    if (hasRaisedRequests === false) {
                      toast.error("You have to raise a request to open deals");
                      return;
                    }
                    setIsDealsOpen(!isDealsOpen);
                  }}
                  className="text-[17px] px-4 mx-3 rounded-md cursor-pointer flex justify-between items-center hover:bg-gray-100"
                >
                  <span>Deals</span>

                  {isDealsOpen ? (
                    <FaChevronUp className="text-gray-500 text-sm" size={12} />
                  ) : (
                    <FaChevronDown className="text-gray-500 text-sm" size={12} />
                  )}
                </div>

                {isDealsOpen && (
                  <div className="ml-7 mt-2 flex flex-col text-[15px] text-gray-600">
                    <NavLink
                      to="/deal/activedeals"
                      className="flex items-center gap-2 py-1 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Active Deals
                    </NavLink>

                    <NavLink
                      to="/deal/milestones"
                      className="flex items-center gap-2 py-1 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Milestones
                    </NavLink>

                    <NavLink
                      to="/deal/payments"
                      className="flex items-center gap-2 py-1 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Payments
                    </NavLink>

                    <NavLink
                      to="/deal/negotiations"
                      className="flex items-center gap-2 py-1 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Negotiations
                    </NavLink>

                    <NavLink
                      to="/deal/documentation"
                      className="flex items-center gap-2 py-1 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                       Documentation
                    </NavLink>

                    <NavLink
                      to="/deal/completed"
                      className="flex items-center gap-2 py-1 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Completed
                    </NavLink>

                    <NavLink
                      to="/deal/disputes"
                      className="flex items-center gap-2 py-1 hover:text-[#001032]"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
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
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Settings
              </NavLink>

              <NavLink
                to="/help"
                className={({ isActive }) =>
                  `block my-3  text-[17px] px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
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
