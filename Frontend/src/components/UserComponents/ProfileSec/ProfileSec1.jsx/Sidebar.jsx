import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import requestLogo from "/requestlogo.png";
import connectLogo from "/connectlogo.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { PiSignOut } from "react-icons/pi";
import loginLogo from "/ArtesterLogo2.png";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutClick = () => {
    setShowSignoutDialog(!showSignoutDialog);
  };

  const handleConfirmSignOut = () => {
    setShowSignoutDialog(false);
    alert("Signed out!"); // Replace with real logout
  };

  return (
    <div className="fixed top-0 left-0 h-full  bg-[#001032] p-4 flex flex-col justify-between z-50">
      {/* Top Icons */}
      <div>
        <div className="py-6">
          <IoMdMenu className="text-white" size={27} onClick={handleToggle} />
        </div>
        <div>
          <CgProfile className="text-gray-500 my-3" size={27} onClick={handleToggle} />
          <img src={requestLogo} alt="Logo" className="w-7 my-3" onClick={handleToggle} />
          <img src={connectLogo} alt="logo" className="w-7 my-3" onClick={handleToggle} />
          <IoNotificationsOutline className="text-gray-500 my-3" size={27} onClick={handleToggle} />
        </div>
      </div>

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
        <div className="absolute top-0 left-full ml- w-60 bg-white h-full rounded-tr-2xl rounded-br-2xl  shadow-lg transition-all duration-300 z-40">
          <div className="my-6">
            <img src={loginLogo} alt="logo" className="w-40" />
          </div>
          <div className="text-[#001426]">
            <ul>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? 'bg-[#001032] text-white' : 'text-[#001426]'
                  }`
                }
              >
                Profile
              </NavLink>

              <NavLink
                to="/request"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? 'bg-[#001032] text-white' : 'text-[#001426]'
                  }`
                }
              >
                Requests
              </NavLink>

              <NavLink
                to="/connect"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? 'bg-[#001032] text-white' : 'text-[#001426]'
                  }`
                }
              >
                Connect
              </NavLink>

              <NavLink
                to="/notification"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? 'bg-[#001032] text-white' : 'text-[#001426]'
                  }`
                }
              >
                Notification
              </NavLink>
            </ul>
          </div>

          <div className="absolute bottom-10 w-full">
            <ul>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? 'bg-[#001032] text-white' : 'text-[#001426]'
                  }`
                }
              >
                Settings
              </NavLink>

              <NavLink
                to="/help"
                className={({ isActive }) =>
                  `block my-3 text-lg font-medium px-4 mx-3 rounded-md ${
                    isActive ? 'bg-[#001032] text-white' : 'text-[#001426]'
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
