import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginLogo from "/ArtesterLogo2.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoNotificationsOutline } from "react-icons/io5";
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
import { Link, useNavigate } from "react-router-dom";
import { serverUrl } from "@/App";
import axios from "axios";
import { IoIosNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Mobile = () => {
  const [showSignoutDialog, setShowSignoutDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    setShowSignoutDialog(true);
  };

  const handleConfirmSignOut = () => {
    localStorage.removeItem("token");
    setShowSignoutDialog(false);
    alert("Signed out!"); // Replace with real logout
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="">
      <div className="flex items-center justify-between bg-white p-2 py-3">
        <div>
          <img src={loginLogo} alt="logo" className="w-30" />
        </div>

        <div className="flex items-center gap-2">
          <IoIosNotifications
                  size={30} 
                  onClick={handleNotificationClick}
                />
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex items-center gap-5">
                
                <RxHamburgerMenu size={30} className="text-[#001426]" />
              </div>
            </SheetTrigger>

          <div >
              <SheetContent className="w-screen h-fit p-3 bg-[#D5D5D5] rounded-2xl mt-17">
              <div className="border border-[#D9D9D9] bg-white ">
                <SheetHeader>
                  <SheetTitle></SheetTitle>
                </SheetHeader>

                <div className="grid flex-1 auto-rows-min gap-6 text-[#001032] text-xl px-7">
                  <div id="top">
                    <ul className="flex flex-col gap-2">
                      <Link to="/dashboard">
                        <li>Dashboard</li>
                      </Link>
                      <Link to="/profile">
                        <li>Profile</li>
                      </Link>
                      <Link to="/request">
                        <li>Requests</li>
                      </Link>
                      <Link to="/connect">
                        <li>Connect</li>
                      </Link>
                    </ul>
                  </div>

                  <div id="bottom" className="mt-10 mb-6">
                    <ul className="flex flex-col gap-2">
                      <Link to="/settings">
                        <li>Settings</li>
                      </Link>
                      <Link to="/help">
                        <li>Help</li>
                      </Link>
                    </ul>
                  </div>
                </div>

                <SheetFooter>
                  <Button
                    type="button"
                    className="bg-[#001032]"
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
                <div className="absolute bottom-40  left-1/2 -translate-x-1/2 z-50 bg-white border border-gray-300 shadow-lg rounded-md w-50 flex flex-col items-center text-sm text-[#001426] p-2">
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
    </div>
  );
};

export default Mobile;
