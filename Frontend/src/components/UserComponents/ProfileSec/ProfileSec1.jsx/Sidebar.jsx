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
import { Link } from "react-router-dom";

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
    alert("Signed out!"); // Replace this with your real logout logic
  };

  return (
    <div className="overflow-hidden fixed w-[20%] top-0 z-50">
      <div className="flex rounded-xl bg-white h-screen">
        <div
          id="leftsidebar"
          className="bg-[#001426] p-4 m-2 rounded-md relative flex flex-col justify-between"
        >
          {/* Top Icons */}
          <div>
            <div className="py-6">
              <IoMdMenu className="text-white" size={27} onClick={handleToggle} />
            </div>
            <div>
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
                onClick={handleToggle}
              />
            </div>
          </div>

          {/* Bottom Icons */}
          <div className="text-gray-300 relative pb-4">
            <IoSettings size={27} className="my-3" onClick={handleToggle} />
            <IoIosHelpCircle size={27} className="my-3" onClick={handleToggle} />
            <PiSignOut size={27} className="my-3" onClick={handleSignOutClick} />

            {/* ✅ Sign-out confirmation box */}
            {showSignoutDialog && (
              <div className="absolute bottom-12 left-13 z-10 bg-white border border-gray-300 shadow-lg rounded-md w-40 flex flex-col items-center text-sm text-[#001426] animate-fadeIn">
                <button
                  onClick={handleConfirmSignOut}
                  className="w-full py-2 border-b border-gray-200 hover:bg-gray-100"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowSignoutDialog(false)}
                  className="w-full py-2 border-b border-gray-200 hover:bg-gray-100"
                >
                  Cancel
                </button>
               
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        {isOpen && (
          <div
            id="rightsidebar"
            className={`m-2 rounded-md overflow-hidden ${
              isOpen ? "w-full" : "w-0"
            } transition-all duration-300`}
          >
            <div className="my-6">
              <img src={loginLogo} alt="logo" className="w-40" />
            </div>
            <div className="text-[#001426]">
              <ul>
                <Link to="/profile">
                  <li className="my-3 text-lg font-medium bg-[#001426] text-white px-4 rounded-md">
                    Profile
                  </li>
                </Link>
                <Link to="/profile">
                  <li className="my-3 text-lg font-medium px-4 rounded-md">
                    Requests
                  </li>
                </Link>
                <Link to="/profile">
                  <li className="my-3 text-lg font-medium px-4 rounded-md">
                    Connect
                  </li>
                </Link>
                <Link to="/profile">
                  <li className="my-3 text-lg font-medium px-4 rounded-md">
                    Notification
                  </li>
                </Link>
              </ul>
            </div>

            <div className="absolute bottom-10">
              <ul>
                <Link to="/profile">
                  <li className="my-3 text-lg font-medium px-4 rounded-md">
                    Settings
                  </li>
                </Link>
                <Link to="/profile">
                  <li className="my-3 text-lg font-medium px-4 rounded-md">
                    Help
                  </li>
                </Link>
                <li
                  onClick={handleSignOutClick}
                  className="text-lg font-medium px-4 rounded-md cursor-pointer"
                >
                  Sign out
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
