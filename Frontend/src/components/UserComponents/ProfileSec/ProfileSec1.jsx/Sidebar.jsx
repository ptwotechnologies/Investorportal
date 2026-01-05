import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import requestLogo from "/requestlogo.png";
import connectLogo from "/connectlogo.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";
import loginLogo from "/ArtesterLogo2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { serverUrl } from "@/App";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // New state
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutClick = () => {
    setShowSignoutDialog(!showSignoutDialog);
  };

  const handleConfirmSignOut = () => {
    localStorage.removeItem("token");
    setShowSignoutDialog(false);
    alert("Signed out!");
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed top-0 left-0 h-full bg-[#001032] p-4 flex flex-col justify-between z-50">
      {/* Top Icons */}
      <div>
        <div className="py-6">
          <IoMdMenu className="text-white" size={27} onClick={handleToggle} />
        </div>
        <div>
           <FaHome 
           className="text-gray-500 my-3"
            size={27}
             onClick={handleToggle}/>

          <CgProfile
            className="text-gray-500 my-3"
            size={27}
            onClick={handleToggle}
          />
          <img
            src={requestLogo}
            alt="Logo"
            className="w-7 my-3"
            onClick={handleToggle}
          />
          <img
            src={connectLogo}
            alt="logo"
            className="w-7 my-3"
            onClick={handleToggle}
          />
          <IoNotificationsOutline
            className="text-gray-500 my-3"
            size={27}
            onClick={handleNotificationClick} // Show/hide notifications
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
      <div className="text-gray-300 relative pb-4">
        <IoSettings size={27} className="my-3" onClick={handleToggle} />
        <IoIosHelpCircle size={27} className="my-3" onClick={handleToggle} />
        <PiSignOut size={27} className="my-3" onClick={handleSignOutClick} />

        {showSignoutDialog && (
          <div className="absolute bottom-16 left-12 z-50 bg-white border border-gray-300 shadow-lg rounded-md w-40 flex flex-col items-center text-sm text-[#001426] p-0.5">
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
            <img src={loginLogo} alt="logo" className="w-40" />
          </div>
          <div className="text-[#001426]">
            <ul>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to="/request"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Requests
              </NavLink>

              <NavLink
                to="/connect"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Connect
              </NavLink>

              <li
                className="block my-3 text-lg font-medium px-4 mx-3 rounded-md cursor-pointer"
                onClick={handleNotificationClick} // open same notification box
              >
                Notification
              </li>
            </ul>
          </div>

          <div className="absolute bottom-10 w-full">
            <ul>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Settings
              </NavLink>

              <NavLink
                to="/help"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? "bg-[#001032] text-white" : "text-[#001426]"
                  }`
                }
              >
                Help
              </NavLink>

              <li
                onClick={handleSignOutClick}
                className="text-lg font-medium px-4 mx-3 rounded-md cursor-pointer"
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
