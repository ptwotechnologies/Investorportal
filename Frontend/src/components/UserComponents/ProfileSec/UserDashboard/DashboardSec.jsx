import React from "react";
import ProgressBar, { ProgressBar2, ProgressBar3 } from "./ProgressBar";
import {
  FaCalendar,
  FaCalendarCheck,
  FaImage,
  FaRegCalendarCheck,
  FaStar,
} from "react-icons/fa";
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Graph1 from "./Graph1";
import { motion } from "framer-motion";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "@/App";

const DashboardSec = () => {
  const percentage = 75;
  const percentage2 = 25;

  const [showProfileModal, setShowProfileModal] = useState(true);
  const [showMobileCredits, setShowMobileCredits] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (showProfileModal) {
      document.body.style.overflow = "hidden"; // scroll lock
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showProfileModal]);

  const members = Array(4).fill(null);
  const newRegistrations = [
    { name: "Kirti Saini", role: "Startup", hours: "12.5 h" },
    { name: "Parineeta", role: "Investor", hours: "18.6 h" },
    { name: "Nandini Sen", role: "Service Professional", hours: "4.2 h" },
    { name: "Rahul Rai", role: "Startup", hours: "2.5 h" },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data); // 👈 pura data as-it-is
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="relative">
      <div
        className={`lg:bg-gray-200 h-auto lg:h-screen pt-2 px-2 pb-2 lg:pb-0 transition-all duration-300 ${
          showProfileModal ? "blur-sm pointer-events-none" : ""
        }`}
      >
       <div  id="topbar" className="flex items-stretch w-[100%] px-2 gap-1 lg:gap-2 ">
        <div
          className="flex justify-between items-center flex-1 border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl lg:px-4 px-3 py-2 lg:mr-1 ml-1 bg-white"
        >
          <div >
            <p className="font-semibold text-[#001032] text-sm lg:text-[16px] px-0.5">
              Welcome, {profile?.companyName || profile?.name || "User"}!
            </p>
          </div>
          <div className="flex items-center gap-1 lg:gap-x-3">
            {/* {profile?.profilePhoto ? (
              <img
                src={`${serverUrl}${profile.profilePhoto}`}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <CgProfile className="text-gray-500" size={25} />
            )}
            {profile?.role === "startup" && (
              <p className="bg-[#D8D6F8] text-[#59549F] rounded-md text-[10px] lg:text-xs hidden lg:block px-2 py-1 transition-all border border-[#59549F]/10 shadow-[inner_0_0_10px_rgba(0,0,0,0.1)]">
                Switch to professional
              </p>
            )} */}

            {/* Mobile Star Button (Inside Welcome Box) */}
            {profile?.isFreePlan && (
              <button
                onClick={() => setShowMobileCredits(true)}
                className="lg:hidden flex items-center justify-center w-8 h-8 bg-[#D8D6F8] rounded-md border border-[#59549F]/10 shadow-[inner_0_0_10px_rgba(0,0,0,0.1)] shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-white border-2 border-[#59549F] flex items-center justify-center">
                  <FaStar size={12} className="text-[#59549F]" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Desktop Credits Widget */}
        {profile?.isFreePlan && (
          <Link
            to="/pricing"
            className="hidden lg:flex border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl bg-white lg:px-4 px-2.5 items-center justify-between gap-2 py-1.5 shrink-0 group hover:border-[#59549F] transition-all duration-300 cursor-pointer lg:mr-1 lg:w-[64.4%]"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#59549F] text-white text-lg font-bold shadow-md">
                {profile.credits ?? 0}
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[18px] font-semibold text-[#59549F] leading-tight w-full text-left">
                  Opportunities Available
                </p>
                <div className="-mt-0.5">
                  <span className="bg-[#D8D6F8] text-[#59549F] px-2 py-0.5 rounded-full text-[9px] font-medium shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] whitespace-nowrap">
                    More connections are waiting
                  </span>
                </div>
              </div>
            </div>
            <div className="flex bg-[#D8D6F8] text-[#59549F] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all border border-[#59549F]/20 shadow-md group-hover:bg-[#59549F] group-hover:text-white duration-300">
              Unlock More Opportunities
            </div>
          </Link>
        )}
      </div>
        <div className="hidden lg:block">
          <div className="bg-gray-200 px-3 pt-3 flex gap-3 ">
            <div id="left" className="w-[70%] ">
              <div id="top" className="flex items-center gap-3">
                <div
                  id="left"
                  className="rounded-2xl bg-white  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 h-[47vh]  w-[50%]"
                >
                  <h1 className="text-3xl font-semibold text-[#202020] my-3">
                    Progress Statistics
                  </h1>
                  <div className="flex items-center gap-3 my-6 text-[#202020]">
                    <h1 className="text-2xl font-semibold ">64%</h1>
                    <p className="w-[20%] font-normal text-md leading-5">
                      Total Activity
                    </p>
                  </div>

                  <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-5">
                    <div className="w-[60%]">
                      <ProgressBar />
                      <p className="text-sm mt-1">20%</p>
                    </div>
                    <div className="w-[80%]">
                      <ProgressBar2 />
                      <p className="text-sm mt-1">35%</p>
                    </div>
                    <div className="w-full">
                      <ProgressBar3 />
                      <p className="text-sm mt-1">41%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-1 rounded-3xl">
                    <div>
                      <div className="bg-[#760BFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <FaImage />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        8
                      </p>
                      <p className="text-[#202020]">On Approval</p>
                    </div>
                    <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                    <div>
                      <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <RiCheckDoubleLine />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        12
                      </p>
                      <p>Registered</p>
                    </div>

                    <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                    <div>
                      <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <FaCalendarCheck />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        14
                      </p>
                      <p>Requests</p>
                    </div>
                  </div>
                </div>

                <div
                  id="right"
                  className="rounded-2xl bg-white  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-3 py-4 h-[47vh]  w-[50%]"
                >
                  <div className="flex  items-center justify-between ">
                    <h1 className="text-3xl font-semibold text-[#202020] my-2">
                      Profile
                    </h1>
                  </div>
                  <div>
                    <p className="text-sm text-[#6F6F6F] w-[90%] my-1">
                      Punctuation - learn the basics without the pain people
                      will never laugh at your punctuation again. you do not
                      require any materials or software
                    </p>
                    <div className="flex justify-between items-center gap-5 mt-4 mb-2">
                      <div id="members" className="w-[50%] ">
                        <div className="bg-[#f1f1f1] p-2 py-2  rounded-xl">
                          <p className="text-lg text-gray-500  text-center pb-1">
                            People
                          </p>
                          <div className="flex -space-x-2 justify-center">
                            {members.map((_, i) => (
                              <div
                                key={i}
                                className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div id="subscription" className=" w-[50%] ">
                        <div className="bg-[#f1f1f1] p-2 py-2   rounded-xl">
                          <p className="text-lg text-gray-500  text-center pb-1">
                            Optimisation
                          </p>

                          <div className="w-full bg-yellow-100 rounded-xl h-10 overflow-hidden">
                            <div
                              className="bg-yellow-400 h-full rounded-xl flex items-center justify-center transition-all"
                              style={{ width: `${percentage}%` }}
                            >
                              <span className="text-gray-800 font-bold text-sm">
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3">
                      <div className="bg-yellow-200 rounded-xl">
                        <div
                          className="bg-yellow-400 h-full flex items-center justify-center transition-all rounded-xl"
                          style={{ width: `${percentage2}%` }}
                        >
                          <span className="text-gray-800 font-bold text-xs">
                            {percentage2}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-1">
                      <Link to="/profile">
                        <button className="">Complete Your Profile</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div id="bottom" className="bg-white  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl mt-3 h-[41vh]">
                <div className="flex items-center justify-between px-5 py-4">
                  <h1 className="text-3xl text-[#202020] font-semibold">
                    Requests
                  </h1>
                  <div className="flex items-center gap-1 ">
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                      <IoIosArrowRoundBack size={25} />
                    </div>
                    <h1 className="text-[#202020] font-medium ">Today</h1>
                    <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                      <IoIosArrowRoundForward size={25} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4  px-4 ">
                  <div className="border w-[35%] p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                    <p className="text-[#6F6F6F] text-sm">10.30 A.M.</p>
                    <h1 className="my-3  leading-5 text-[#202020] font-semibold text-lg">
                      Require development service{" "}
                    </h1>
                    <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                      Check status
                    </button>
                    <div className="flex items-center gap-2 my-2">
                      <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                      <div className="text-sm ">
                        <p>Harika</p>
                        <p>Investor</p>
                      </div>
                    </div>
                  </div>

                  <div className="border w-[35%] p-3 text-white  bg-[#001426] rounded-3xl mb-2">
                    <p className=" text-sm">14.00 P.M.</p>
                    <h1 className="my-3  leading-5  font-semibold text-lg">
                      Require to connect with investors
                    </h1>
                    <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                      Check status
                    </button>
                    <div className="flex items-center gap-2 my-2">
                      <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                      <div className="text-sm">
                        <p>Anil Jain</p>
                        <p>Startup</p>
                      </div>
                    </div>
                  </div>

                  <div className="border w-[35%] p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                    <p className="text-[#6F6F6F] text-sm">17.00 P.M.</p>
                    <h1 className="my-3  leading-5 text-[#202020] font-semibold text-lg">
                      Looking for <br /> assistance in leads
                    </h1>
                    <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-6 my-1 mb-4  rounded-md ">
                      Check status
                    </button>
                    <div className="flex items-center gap-2 my-2">
                      <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                      <div className="text-sm">
                        <p>Niharika Sharma</p>
                        <p>Service Professional</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="right"
              className="w-[30%] h-[89.5vh] bg-white  shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl p-4 text-[#202020]"
            >
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold my-4">Activity</p>
                <div className="flex items-center gap-1 border border-[#6F6F6F] p-1 px-3 rounded-2xl">
                  <FaCalendar />
                  <p>last 7 days</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 py-5">
                <p className="text-3xl font-semibold">50</p>
                <p className="text-md font-medium">Connects</p>
              </div>

              <div>
                <Graph1 />
              </div>

              <div className="bg-[#F1F1F1] px-8 py-4 mt-4 rounded-2xl">
                <h3 className="text-gray-900 text-[18px] font-semibold mb-3">
                  New Registrations
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  {newRegistrations.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-start gap-3">
                        {idx === 0 ? (
                          <RiCheckDoubleLine
                            size={24}
                            className="text-blue-500 text-xs mt-1"
                          />
                        ) : (
                          <RiCheckLine
                            size={24}
                            className="text-gray-400 text-xs mt-1"
                          />
                        )}
                        <div>
                          <p className="text-sm mb-1 text-gray-500">
                            {item.name}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.hours}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden bg-gray-100 h-auto">
          <div>
            <div id="right" className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-3 py-4 mt-2 m-2">
              <div className="flex  items-center justify-between ">
                <h1 className="text-xl font-semibold text-[#202020] my-1">
                  Profile
                </h1>
              </div>
              <div>
                <p className="text-xs text-[#6F6F6F]  my-1">
                  Punctuation - learn the basics without the pain people will
                  never laugh at your punctuation again. you do not require any
                  materials or software
                </p>
                <div className="flex justify-between items-center gap-3 mt-4 mb-2">
                  <div id="members" className="w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2  rounded-xl">
                      <p className="text-sm text-gray-500  text-center pb-1">
                        People
                      </p>
                      <div className="flex -space-x-2 justify-center">
                        {members.map((_, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div id="subscription" className=" w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2   rounded-xl">
                      <p className="text-sm text-gray-500  text-center pb-1">
                        Optimisation
                      </p>

                      <div className="w-full bg-yellow-200 rounded-xl h-8 overflow-hidden my-1">
                        <div
                          className="bg-yellow-400 h-full rounded-xl flex items-center justify-center transition-all"
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-gray-800 font-bold text-sm">
                            {percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3">
                  <div className="bg-yellow-200 rounded-xl">
                    <div
                      className="bg-yellow-400 h-full flex items-center justify-center transition-all rounded-xl"
                      style={{ width: `${percentage2}%` }}
                    >
                      <span className="text-gray-800 font-bold text-xs">
                        {percentage2}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-1">
                  <Link to="/profile">
                    {" "}
                    <button className="">Complete Your Profile</button>
                  </Link>
                </div>
              </div>
            </div>

            <div id="left" className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 mt-3 m-2 ">
              <h1 className="text-xl font-semibold text-[#202020] my-4">
                Progress Statistics
              </h1>
              <div className="flex items-center gap-3 my-6 text-[#202020]">
                <h1 className="text-2xl font-semibold ">64%</h1>
                <p className="w-[20%] font-normal text-sm leading-5">
                  Total Activity
                </p>
              </div>

              <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-7">
                <div className="w-[60%]">
                  <ProgressBar />
                  <p className="text-sm mt-1">20%</p>
                </div>
                <div className="w-[80%]">
                  <ProgressBar2 />
                  <p className="text-sm mt-1">35%</p>
                </div>
                <div className="w-full">
                  <ProgressBar3 />
                  <p className="text-sm mt-1">41%</p>
                </div>
              </div>

              <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-3 rounded-3xl">
                <div>
                  <div className="bg-[#760BFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaImage />
                  </div>
                  <p className="text-center  text-sm text-[#202020]">8</p>
                  <p className="text-[#202020] text-sm">Connect</p>
                </div>
                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <RiCheckDoubleLine />
                  </div>
                  <p className="text-center  text-sm text-[#202020]">12</p>
                  <p className='text-[#202020] text-sm"'>Requests</p>
                </div>

                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaCalendarCheck />
                  </div>
                  <p className="text-center  text-[#202020] text-sm">14</p>
                  <p className='text-[#202020] text-sm"'>Help Tokens</p>
                </div>
              </div>
            </div>

            <div id="bottom" className="bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl p-5 mt-3 m-2">
              <div className="flex items-center justify-between  py-2">
                <h1 className="text-xl text-[#202020] font-semibold">
                  Requests
                </h1>
                <div className="flex items-center gap-1 ">
                  <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                    <IoIosArrowRoundBack size={25} />
                  </div>
                  <h1 className="text-[#202020] font-medium ">Today</h1>
                  <div className="w-6 h-6 rounded-full border border-black flex items-center justify-center">
                    <IoIosArrowRoundForward size={25} />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 py-2">
                <div className="border w-full  p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                  <p className="text-[#6F6F6F] text-sm">10.30 A.M.</p>
                  <h1 className="my-3  w-[85%] leading-5 text-[#202020] font-semibold text-lg">
                    Require development service{" "}
                  </h1>
                  <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                    Check status
                  </button>
                  <div className="flex items-center gap-2 my-2">
                    <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                    <div className="text-sm ">
                      <p>Harika</p>
                      <p>Investor</p>
                    </div>
                  </div>
                </div>

                <div className="border w-full   p-3 text-white  bg-[#001426] rounded-3xl mb-2">
                  <p className=" text-sm">14.00 P.M.</p>
                  <h1 className="my-3  leading-5  font-semibold text-lg">
                    Require to connect with investors
                  </h1>
                  <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-4 my-1 mb-4 rounded-md">
                    Check status
                  </button>
                  <div className="flex items-center gap-2 my-2">
                    <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                    <div className="text-sm">
                      <p>Anil Jain</p>
                      <p>Startup</p>
                    </div>
                  </div>
                </div>

                <div className="border w-full   p-3 bg-[#F1F1F1] rounded-3xl mb-2">
                  <p className="text-[#6F6F6F] text-sm">17.00 P.M.</p>
                  <h1 className="my-3 w-[65%] leading-5 text-[#202020] font-semibold text-lg">
                    Looking for assistance in leads
                  </h1>
                  <button className="hover:bg-white text-white bg-[#FF6812] hover:text-[#FF6812] py-1 px-6 my-1 mb-4  rounded-md ">
                    Check status
                  </button>
                  <div className="flex items-center gap-2 my-2">
                    <div className="w-8 h-8 rounded-full bg-[#6F6F6F]"></div>
                    <div className="text-sm">
                      <p>Niharika Sharma</p>
                      <p>Service Professional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="right"
              className="mt-2 m-2 h-[96vh] bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-2xl p-4 text-[#202020]"
            >
              <div className="flex items-center justify-between">
                <p className="text-3xl font-semibold my-4">Activity</p>
                <div className="flex items-center gap-1 border border-[#6F6F6F] p-1 px-3 rounded-2xl">
                  <FaCalendar />
                  <p>last 7 days</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 py-8">
                <p className="text-3xl font-semibold">50</p>
                <p className="text-md font-medium">Connects</p>
              </div>

              <div>
                <Graph1 />
              </div>

              <div className="bg-[#F1F1F1] px-8 py-6 mt-5 rounded-2xl">
                <h3 className="text-gray-900 text-[18px] font-semibold mb-3">
                  New Registrations
                </h3>
                <div className="flex flex-col gap-2 mt-1">
                  {newRegistrations.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-start gap-3">
                        {idx === 0 ? (
                          <RiCheckDoubleLine
                            size={24}
                            className="text-blue-500 text-xs mt-1"
                          />
                        ) : (
                          <RiCheckLine
                            size={24}
                            className="text-gray-400 text-xs mt-1"
                          />
                        )}
                        <div>
                          <p className="text-sm mb-1 text-gray-500">
                            {item.name}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {item.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{item.hours}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-2xl p-5 relative shadow-xl animate-fadeIn">
            {/* Close Icon */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <RxCross2 size={22} />
            </button>

            {/* Content */}
            <h2 className="text-xl font-semibold text-[#001426] mb-2 text-center">
              Complete Your Profile ✨
            </h2>

            <p className="text-sm text-gray-600 text-center mb-4">
              Complete your profile to increase your visibility, connect with
              the right people, and unlock personalised opportunities tailored
              for you.
            </p>

            <Link to="/profile">
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-full bg-[#001426] text-white py-2 rounded-lg font-medium hover:bg-[#000f2e]"
              >
                Complete Profile Now
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Credits & Switch Popup */}
      {showMobileCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-[320px] rounded-3xl p-6 relative shadow-2xl animate-fadeIn border border-[#D8D6F8]">
            <button
              onClick={() => setShowMobileCredits(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <RxCross2 size={24} />
            </button>

            <div className="flex flex-col items-center gap-3 mt-4">
              {/* Credits Section */}
              <div className="flex flex-col gap-3 bg-gray-50 px-5 py-4 rounded-2xl w-full border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 bg-[#59549F] flex items-center justify-center text-white text-xl font-bold  shadow-sm shrink-0">
                    {profile?.credits ?? 0}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#59549F] font-bold text-[15px] leading-tight tracking-tight">Opportunities Available</p>
                    <p className="text-gray-400 text-xs mt-0.5 whitespace-nowrap">Available for use</p>
                  </div>
                </div>
                
                <p className="text-[#59549F] text-[11px] leading-snug w-full pt-2 border-t border-[#59549F]/10">
                  {profile?.credits > 0 
                    ? profile?.role === "startup"
                      ? "Use this to connect with premium leads. More investors and professionals are ready to connect with you"
                      : "Use this to connect with premium leads. More investors and businesses are raising requests and looking for professionals like you"
                    : profile?.role === "startup" 
                      ? "You’ve used your free access. More investors and professionals are ready to connect with you."
                      : "You’ve used your free access. More investors and businesses are raising requests and looking for professionals like you."}
                </p>
              </div>

              {/* Upgrade Button */}
              <Link
                to="/pricing"
                onClick={() => setShowMobileCredits(false)}
                className="w-full bg-[#D8D6F8] text-[#59549F] py-2 rounded-lg font-bold text-center shadow-[inset_0_0_12px_rgba(0,0,0,0.1)] border border-[#59549F]/10 hover:brightness-95 transition-all text-sm  tracking-wider"
              >
                Unlock Free Access
              </Link>

              {/* Switch to Professional (Startups Only) */}
              {/* {profile?.role === "startup" && (
                <button
                  className="w-full bg-[#59549F] text-white py-2 rounded-lg font-bold hover:bg-[#4a458a] transition-all text-sm  tracking-wider shadow-lg"
                >
                  Switch to Professional
                </button>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSec;
