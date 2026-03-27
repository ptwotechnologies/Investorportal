import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowForward, IoIosClose } from "react-icons/io";
import img1 from "/phonejoinus1.png";
import img2 from "/phonejoinus2.png";
import img3 from "/phonejoinus3.png";
import img4 from "/phonejoinus4.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { serverUrl } from "@/App";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosNotifications } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

function NavbarSheet({ textColor }) {
  const [openSheet, setOpenSheet] = useState(false);
  const [openTopSection, setOpenTopSection] = useState(null); // Auxiliaries / Resources
  const [openNested, setOpenNested] = useState(null); // Subscriptions / Profiles

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openNotificationMenu, setOpenNotificationMenu] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoggedIn(true);

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${serverUrl}/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Navbar profile error", err);
      }
    };

    fetchProfile();

    const handleClickOutside = (event) => {
      const isBellClick = event.target.closest(".bell-icon");
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !isBellClick
      ) {
        setOpenProfileMenu(false);
        setOpenNotificationMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTopSection = (sectionName) => {
    if (openTopSection === sectionName) {
      setOpenTopSection(null);
      setOpenNested(null);
    } else {
      setOpenTopSection(sectionName);
      setOpenNested(null);
    }
  };

  const toggleNested = (nestedName) => {
    setOpenNested((prev) => (prev === nestedName ? null : nestedName));
  };

  const getProfileImage = (photo) => {
    if (!photo) return null;
    if (photo.startsWith("blob:")) return photo;
    if (photo.startsWith("http")) return photo;
    return `${serverUrl}${photo}`;
  };

  return (
    <div className="text-[#001032] relative">
      {/* Desktop Sign In / Sign Up */}
      <div className="hidden lg:block text-lg relative" ref={profileRef}>
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="mr-4 underline px-5 py-1">Sign in</button>
            </Link>
            <Link to="/login">
              <button className="bg-[#001032] text-white px-5 py-1 rounded-sm">
                Sign up
              </button>
            </Link>
          </>
        ) : (
          <>
            {/* Profile Circle */}
            <div className="flex items-center justify-between  cursor-pointer   px-3 py-1 rounded-full bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)]">
               <IoNotificationsOutline 
                 size={25} 
                 className=" ml-1 text-gray-500 cursor-pointer bell-icon" 
                 onClick={(e) => {
                   e.stopPropagation();
                   setOpenNotificationMenu(!openNotificationMenu);
                   setOpenProfileMenu(false);
                 }}
               />
                <div className="w-0.2 h-6 border mr-1.5 ml-2"></div>
              <div className="flex items-center justify-between  cursor-pointer   px-2 py-1 rounded-sm">
              {/* My Account Button */}

              
              <button
                onClick={() => {
                  setOpenProfileMenu(!openProfileMenu);
                  setOpenNotificationMenu(false);
                }}
                className=""
              >
                Dashboard
              </button>

              {/* Profile Image */}
              {/* <div
                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-white"
              >
                {profile?.profilePhoto ? (
                  <img
                    src={getProfileImage(profile.profilePhoto)}
                    className="w-full h-full object-cover"
                    alt="profile"
                  />
                ) : (
                  <div className="w-full h-full bg-[#001032] flex items-center justify-center">
                    <CgProfile size={18} className="text-white" />
                  </div>
                )}
              </div> */}
            </div>
            </div>
          </>
        )}
      </div>

      {openProfileMenu && (
        <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border z-50">
          <div className="p-3 border-b">
            <p className="text-sm font-medium">
              {profile?.companyName || profile?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">Logged in</p>
          </div>

          <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My Profile
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}

      {openNotificationMenu && (
        <div ref={notificationRef} className="absolute right-0 lg:right-40 lg:mt-3 mt-12 w-64 bg-white rounded-xl shadow-lg border z-50 p-4">
          <p className="text-sm text-gray-500 text-center">Notification not found</p>
        </div>
      )}

      <div className="lg:hidden">
        <Sheet open={openSheet} onOpenChange={setOpenSheet} >
           <div className={isLoggedIn ? "flex justify-center items-center gap-2 bg-white rounded-full py-1 px-2 shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)]" : "flex justify-center items-center"}>
            {isLoggedIn && (
              <>
                <IoNotificationsOutline 
                  size={18} 
                  className="text-[#12355C] cursor-pointer bell-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenNotificationMenu(!openNotificationMenu);
                  }}
                />
                <div className="w-0.2 h-6 border "></div>
              </>
            )}
          <SheetTrigger onClick={() => setOpenSheet(!openSheet)}>
            {openSheet ? (
              <IoIosClose size={25} className={isLoggedIn ? "text-[#12355C] ml-1" : (textColor || "text-[#12355C]")} />
            ) : (
              <RxHamburgerMenu size={18} className={isLoggedIn ? "text-[#12355C] mr-1" : (textColor || "text-[#12355C]")} />
            )}
          </SheetTrigger>
           </div>

          <SheetContent className="w-[94vw] h-fit mt-20 mx-3 rounded-xl p-3 bg-[#D5D5D5] ">
            <SheetHeader className="border h-fit bg-white">
              <SheetTitle></SheetTitle>

              <div className="overflow-y-auto max-h-[63vh] pr-2 scrollbar-hide ">
                <div className="text-lg text-[#002A30]">
                  <ul>
                    {/*  Auxiliaries  */}
                    <li
                      className="p-3 cursor-pointer"
                      onClick={() => toggleTopSection("aux")}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-[#001032] ">
                          Auxiliaries
                        </p>
                        <div className="bg-[#001032] rounded-lg text-white px-2 py-0.5">
                          <IoIosArrowDown
                            className={`${
                              openTopSection === "aux"
                                ? "rotate-180 duration-300"
                                : "duration-300"
                            }`}
                          />
                        </div>
                      </div>

                      {openTopSection === "aux" && (
                        <div className="px-2 py-4 rounded-md">
                          {/* Subscriptions */}
                         

                          {/* Profiles */}
                          <div
                            className="flex justify-between items-center py-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNested("profiles");
                            }}
                          >
                            <p className="text-[#001032] text-[17px]">
                              Profiles
                            </p>
                            <IoIosArrowDown
                              className={`${
                                openNested === "profiles"
                                  ? "rotate-180 duration-300"
                                  : "duration-300"
                              }`}
                            />
                          </div>

                          {openNested === "profiles" && (
                            <div className="pl- mt-2 flex flex-col gap-3 text-[15px]">
                              <Link
                                to="/startup"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Startup</p>
                              </Link>
                              <Link
                                to="/investor"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Investors</p>
                              </Link>
                              <Link
                                to="/serviceprofessional"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Service Professionals</p>
                              </Link>
                            </div>
                          )}

                           <div
                            className="flex justify-between items-center py-2 cursor-pointer"
                            onClick={(e) => {
                              // e.stopPropagation();
                              toggleNested("Business Refinement Program");
                            }}
                          >
                            <Link to="/BusinessRefinementProgram" className="text-[#001032] text-[17px]">
                              Business Refinement Program
                            </Link>
                            {/* <IoIosArrowDown
                              className={`${
                                openNested === "Business Refinement Program"
                                  ? "rotate-180 duration-300"
                                  : "duration-300"
                              }`}
                            /> */}
                          </div>

                          {/* {openNested === "Business Refinement Program" && (
                            <div className="pl-2 text-[15px] flex flex-col gap-1 mb-2">
                              <Link
                                to="/subscription?tab=HR"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>HR</p>
                              </Link>
                              <Link
                                to="/subscription?tab=Legal"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Legal</p>
                              </Link>
                              <Link
                                to="/subscription?tab=Advisory"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Advisory</p>
                              </Link>
                            
                              <Link
                                to="/subscription?tab=Designing"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Designing</p>
                                  <Link
                                to="/subscription?tab=Marketing"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Marketing</p>
                              </Link>
                              </Link>
                              <Link
                                to="/subscription?tab=Consultancy"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Consultancy</p>
                              </Link>
                              <Link
                                to="/subscription?tab=Development"
                                onClick={() => setOpenSheet(false)}
                              >
                                <p>Development</p>
                              </Link>
                            </div>
                          )} */}


                        </div>
                      )}
                    </li>

                    <hr className="border-t-[#001032]" />

                    {/* Pricing  */}
                    <Link to="/pricing" onClick={() => setOpenSheet(false)}>
                      <li className="p-3 text-[#001032] ">
                        Pricing
                      </li>
                    </Link>

                    <hr className="border-t-[#001032]" />

                    {/*  Resources */}
                    <li
                      className="p-3 cursor-pointer"
                      onClick={() => toggleTopSection("resources")}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-[#001032] ">Resources</p>
                        <div className="bg-[#001032] rounded-lg text-white px-2 py-0.5">
                          <IoIosArrowDown
                            className={`${
                              openTopSection === "resources"
                                ? "rotate-180 duration-300"
                                : "duration-300"
                            }`}
                          />
                        </div>
                      </div>

                      {openTopSection === "resources" && (
                        <div className="py-4 px-2 rounded-md flex flex-col gap-3 text-[17px]">
                          <Link to="/about" onClick={() => setOpenSheet(false)}>
                            <p>About Us</p>
                          </Link>
                          <Link
                            to="/contactus"
                            onClick={() => setOpenSheet(false)}
                          >
                            <p>Contact Us</p>
                          </Link>
                          <Link
                            to="/channelpartners"
                            onClick={() => setOpenSheet(false)}
                          >
                            <p>Channel Partners</p>
                          </Link>
                        </div>
                      )}
                    </li>

                    <hr className="border-t-[#001032]" />
                  </ul>
                </div>

                {/* Join Us Card (Scrollable)  */}
                <div className="border border-[#D5D5D5] p-2 mt-10 shadow-[inset_0px_4px_4px_rgba(208,208,208,0.25)] rounded-2xl">
                  <div className="border border-[#D5D5D5]  shadow-[0px_0px_4px_4px_rgba(20,20,20,0.3)] rounded-2xl p-1 px-2 pr-3">
                    <div className="flex items-start justify-between">
                      <p className="text-[10px] mt-1">
                        Join our ecosystem of 4 portals into one
                      </p>
                     
                    </div>
                     <h1 className="text-sm relative left-43 top-11">Join us!</h1>

                    <div className="flex items-center justify-between mt-4">
                      <div className="grid grid-cols-2 place-items-center gap-1 gap-x-6">
                        <div className=" w-15 h-12 flex items-center justify-center">
                          <img src={img1} alt="" className=" " />
                        </div>
                        <div className="  w-15 h-12 flex items-center justify-center">
                          <img src={img2} alt="" className="" />
                        </div>
                        <div className="  w-15 h-12 flex items-center justify-center ">
                          <img src={img3} alt="" className="" />
                        </div>
                        <div className="    w-15 h-12 flex items-center justify-center ">
                          <img src={img4} alt="" className="w-20 " />
                        </div>
                      </div>

                      <Link to="/joinus" onClick={() => setOpenSheet(false)}>
                        <button className="bg-[#001032] text-white rounded-md px-3 py-1 text-xs mt-13 mr-1">
                          Explore
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center gap-4 mt-4 text-xl sticky bottom-0 bg-white py-3 border-t">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpenSheet(false)}
                      className="w-full"
                    >
                      <button className="border border-[#001032] w-full text-[#001032] rounded-sm p-2">
                        Sign in
                      </button>
                    </Link>

                    <Link
                      to="/login"
                      onClick={() => setOpenSheet(false)}
                      className="w-full"
                    >
                      <button className="bg-[#001032] w-full text-white rounded-sm p-2">
                        Sign up
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        setOpenSheet(false);
                        window.location.reload();
                      }}
                      className=" w-full text-[#001032] rounded-sm p-2 border border-[#001032]"
                    >
                      Logout
                    </button>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpenSheet(false)}
                      className="w-full"
                    >
                      <button className="border border-[#001032] w-full bg-[#001032] text-white rounded-sm p-2">
                        Dashboard
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default NavbarSheet;
