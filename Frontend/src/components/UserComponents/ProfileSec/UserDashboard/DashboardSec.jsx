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

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMobileCredits, setShowMobileCredits] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showProfileModal) {
      document.body.style.overflow = "hidden"; // scroll lock
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showProfileModal]);

  const members = Array(4).fill(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [stats, setStats] = useState({
    registered: 0,
    requests: 0,
    onApproval: 0,
    activityPercentage: 0
  });

  const calculateCompletion = (data) => {
    if (!data) return 0;
    const fields = [
      data.bio,
      data.state,
      data.city,
      data.about,
      data.topSkills?.length > 0,
      data.profilePhoto,
      data.coverImage,
      data.experience?.length > 0,
      data.portfolio?.length > 0,
      data.socialMedia?.linkedin,
    ];
    const filledFields = fields.filter((f) => !!f).length;
    return (filledFields / fields.length) * 100;
  };

  const [newRegistrations, setNewRegistrations] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const timeAgo = (dateString) => {
    if (!dateString) return "—";
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Just now";
    return `${diffHours} h`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fire all requests in parallel for maximum speed
        const [
          profileRes,
          myRequestsRes,
          receivedRes,
          allProfilesRes,
          connectionsRes
        ] = await Promise.all([
          axios.get(`${serverUrl}/profile/`, { headers }),
          axios.get(`${serverUrl}/requests/`, { headers }),
          axios.get(`${serverUrl}/requests/received`, { headers }),
          axios.get(`${serverUrl}/profile/all`, { headers }),
          axios.get(`${serverUrl}/connections/my/`, { headers })
        ]);

        // Process Profile Data
        setProfile(profileRes.data);
        const completion = calculateCompletion(profileRes.data);
        setProfileCompletion(completion);
        
        // Show modal only if profile is not completed
        if (completion < 100) {
          setShowProfileModal(true);
        } else {
          setShowProfileModal(false);
        }

        // Process Requests Data
        const totalRequests = myRequestsRes.data.length;
        const receivedRequests = receivedRes.data.forwardedRequests || [];

        // Decide which requests to show based on role
        if (profileRes.data.role === "startup") {
          setRecentRequests(myRequestsRes.data.slice(0, 3) || []);
        } else {
          setRecentRequests(receivedRequests.slice(0, 3) || []);
        }

        // Process New Registrations
        const sortedUsers = allProfilesRes.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4)
          .map(p => ({
            name: p.name || "User",
            role: p.userId?.role?.replace("_", " ") || "Member",
            hours: timeAgo(p.createdAt)
          }));
        setNewRegistrations(sortedUsers);

        // Process Connections Data
        const { sent, accepted } = connectionsRes.data;
        const registeredCount = accepted?.length || 0;
        const onApprovalCount = sent?.length || 0;

        // Calculate weekly stats (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const weeklyConnects = accepted.filter(c => new Date(c.createdAt) >= sevenDaysAgo).length;

        // Calculate activity percentage
        const activity = Math.min(100, (registeredCount + totalRequests + onApprovalCount) * 10);

        setStats({
          registered: registeredCount,
          requests: totalRequests,
          onApproval: onApprovalCount,
          activityPercentage: activity || 64,
          weeklyConnects: weeklyConnects
        });

      } catch (err) {
        console.error("Dashboard fetching error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="lg:bg-gray-200 h-screen pt-2 px-2 pb-2 lg:pb-0 animate-pulse">
        {/* Topbar Skeleton */}
        <div className="flex items-stretch w-full px-2 gap-2 mb-2">
          <div className="flex-1 h-14 bg-white border-2 border-gray-200 rounded-xl shadow-inner"></div>
          <div className="hidden lg:block w-[64%] h-14 bg-white border-2 border-gray-200 rounded-xl shadow-inner"></div>
        </div>

        <div className="flex gap-3 px-3">
          <div className="w-[70%] space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 h-[47vh] bg-white rounded-2xl shadow-inner"></div>
              <div className="flex-1 h-[47vh] bg-white rounded-2xl shadow-inner"></div>
            </div>
            <div className="h-[41vh] bg-white rounded-2xl shadow-inner"></div>
          </div>
          <div className="w-[30%] h-[89.5vh] bg-white rounded-2xl shadow-inner"></div>
        </div>
      </div>
    );
  }

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
          <div
            onClick={() => setShowMobileCredits(true)}
            className="hidden lg:flex border-2 border-[#D9D9D9] shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] rounded-xl bg-white lg:px-4 px-2.5 items-center justify-between gap-2 py-1.5 shrink-0 group hover:border-[#59549F] transition-all duration-300 cursor-pointer lg:mr-1 lg:w-[64.4%]"
          >
            <div className="flex items-center gap-3">
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
          </div>
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
                    <h1 className="text-2xl font-semibold ">{stats.activityPercentage}%</h1>
                    <p className="w-[20%] font-normal text-md leading-5">
                      Total Activity
                    </p>
                  </div>

                  <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-5">
                    <div className="w-full">
                      <ProgressBar percentage={Math.min(100, (stats.onApproval / 20) * 100)} />
                      <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.onApproval / 20) * 100))}%</p>
                    </div>
                    <div className="w-full">
                      <ProgressBar2 percentage={Math.min(100, (stats.registered / 20) * 100)} />
                      <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.registered / 20) * 100))}%</p>
                    </div>
                    <div className="w-full">
                      <ProgressBar3 percentage={Math.min(100, (stats.requests / 20) * 100)} />
                      <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.requests / 20) * 100))}%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-1 rounded-3xl">
                    <div>
                      <div className="bg-[#760BFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <FaImage />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        {stats.onApproval}
                      </p>
                      <p className="text-[#202020]">On Approval</p>
                    </div>
                    <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                    <div>
                      <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <RiCheckDoubleLine />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        {stats.registered}
                      </p>
                      <p>Registered</p>
                    </div>

                    <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                    <div>
                      <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                        <FaCalendarCheck />
                      </div>
                      <p className="text-center my-2 text-2xl text-[#202020]">
                        {stats.requests}
                      </p>
                      <p>Requests</p>
                    </div>
                  </div>
                </div>

                <div
                  id="right"
                  className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-3 py-4 h-[47vh] w-[50%] flex flex-col justify-between"
                >
                  <div id="top-sec">
                    <div className="flex items-center justify-between">
                      <h1 className="text-3xl font-semibold text-[#202020] my-2">
                        Profile
                      </h1>
                    </div>
                    <div className="min-h-[60px]"> 
                      <p className="text-sm text-[#6F6F6F] w-[90%] my-1 line-clamp-3">
                        {profile?.bio || "Your profile bio will appear here once you complete your profile. Add details about yourself to attract more opportunities."}
                      </p>
                    </div>
                  </div>

                  <div id="bottom-sec">
                    <div className="flex justify-between items-center gap-5 mt-2 mb-2">
                      <div id="members" className="w-[50%] ">
                        <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                          <p className="text-lg text-gray-500 text-center pb-1">
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
                        <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                          <p className="text-lg text-gray-500 text-center pb-1">
                            Optimisation
                          </p>

                          <div className="w-full bg-yellow-100 rounded-xl h-10 overflow-hidden">
                            <div
                              className="bg-yellow-400 h-full rounded-xl flex items-center justify-center transition-all"
                              style={{ width: `${profileCompletion}%` }}
                            >
                              <span className="text-gray-800 font-bold text-sm">
                                {Math.round(profileCompletion)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3">
                      <div className="bg-yellow-200 rounded-xl">
                        <div
                          className="bg-yellow-400 h-[10px] flex items-center justify-center transition-all rounded-xl"
                          style={{ width: `${profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-2">
                      <Link to="/profile">
                        <button className="w-full py-1">Complete Your Profile</button>
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

                <div className="flex items-center gap-4 px-4 overflow-x-auto pb-2">
                  {recentRequests.length > 0 ? (
                    recentRequests.map((req, idx) => {
                      const isDark = idx % 2 === 1;
                      const isSentByMe = profile?.role === "startup";
                      const raiser = req.raisedBy;
                      
                      const raiserName = isSentByMe 
                        ? (req.service || "My Request") 
                        : (raiser?.businessDetails?.firstName 
                          ? `${raiser.businessDetails.firstName} ${raiser.businessDetails.lastName || ""}`
                          : "Unknown User");
                      
                      const raiserRole = isSentByMe 
                        ? (req.status || "Raised") 
                        : (raiser?.role || "User");

                      return (
                        <div 
                          key={req._id}
                          className={`border min-w-[31%] max-w-[35%] p-3 rounded-3xl mb-2 flex flex-col justify-between ${
                            isDark ? "bg-[#001426] text-white" : "bg-[#F1F1F1] text-[#202020]"
                          }`}
                        >
                          <div>
                            <p className={`${isDark ? "text-gray-400" : "text-[#6F6F6F]"} text-sm`}>
                              {formatTime(req.createdAt)}
                            </p>
                            <h1 className="my-3 leading-5 font-semibold text-lg line-clamp-2">
                              {req.service}
                            </h1>
                          </div>
                          <div>
                            <Link to="/requests">
                              <button className={`py-1 px-4 my-1 mb-4 rounded-md transition-all ${
                                isDark 
                                  ? "bg-[#FF6812] text-white hover:bg-white hover:text-[#FF6812]" 
                                  : "bg-[#FF6812] text-white hover:bg-white hover:text-[#FF6812]"
                              }`}>
                                Check status
                              </button>
                            </Link>
                            <div className="flex items-center gap-2 my-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-300"}`}>
                                <CgProfile size={20} />
                              </div>
                              <div className="text-sm">
                                <p className="font-medium">{raiserName}</p>
                                <p className="opacity-70 capitalize">{raiserRole.replace("_", " ")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="w-full text-center py-10 text-gray-400">
                      No recent requests found.
                    </div>
                  )}
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
                <p className="text-3xl font-semibold">{stats.weeklyConnects || 0}</p>
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
            <div id="right" className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-3 py-4 mt-2 m-2 flex flex-col justify-between min-h-[320px]">
              <div id="top-sec">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold text-[#202020] my-1">
                    Profile
                  </h1>
                </div>
                <div className="min-h-[42px]">
                  <p className="text-xs text-[#6F6F6F] my-1 line-clamp-3">
                    {profile?.bio || "Your profile bio will appear here once you complete your profile."}
                  </p>
                </div>
              </div>

              <div id="bottom-sec">
                <div className="flex justify-between items-center gap-3 mt-4 mb-2">
                  <div id="members" className="w-[50%] ">
                    <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                      <p className="text-sm text-gray-500 text-center pb-1">
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
                    <div className="bg-[#f1f1f1] p-2 py-2 rounded-xl">
                      <p className="text-sm text-gray-500 text-center pb-1">
                        Optimisation
                      </p>

                      <div className="w-full bg-yellow-200 rounded-xl h-8 overflow-hidden my-1">
                        <div
                          className="bg-yellow-400 h-full rounded-xl flex items-center justify-center transition-all"
                          style={{ width: `${profileCompletion}%` }}
                        >
                          <span className="text-gray-800 font-bold text-xs">
                            {Math.round(profileCompletion)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F1F1F1] w-full py-3 px-7 rounded-2xl my-3">
                  <div className="bg-yellow-200 rounded-xl">
                    <div
                      className="bg-yellow-400 h-[8px] flex items-center justify-center transition-all rounded-xl"
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#001426] text-white p-1 rounded-lg text-center mt-2">
                  <Link to="/profile">
                    <button className="w-full py-1">Complete Your Profile</button>
                  </Link>
                </div>
              </div>
            </div>

            <div id="left" className="rounded-2xl bg-white shadow-[inset_0_0_12px_0_rgba(0,0,0,0.25)] p-5 mt-3 m-2 ">
              <h1 className="text-xl font-semibold text-[#202020] my-4">
                Progress Statistics
              </h1>
              <div className="flex items-center gap-3 my-6 text-[#202020]">
                <h1 className="text-2xl font-semibold ">{stats.activityPercentage}%</h1>
                <p className="w-[20%] font-normal text-sm leading-5">
                  Total Activity
                </p>
              </div>

              <div className="flex items-center w-full gap-2 text-[#6F6F6F] my-4 mb-7">
                <div className="w-full">
                  <ProgressBar percentage={Math.min(100, (stats.onApproval / 20) * 100)} />
                  <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.onApproval / 20) * 100))}%</p>
                </div>
                <div className="w-full">
                  <ProgressBar2 percentage={Math.min(100, (stats.registered / 20) * 100)} />
                  <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.registered / 20) * 100))}%</p>
                </div>
                <div className="w-full">
                  <ProgressBar3 percentage={Math.min(100, (stats.requests / 20) * 100)} />
                  <p className="text-sm mt-1">{Math.round(Math.min(100, (stats.requests / 20) * 100))}%</p>
                </div>
              </div>

              <div className="flex items-center justify-evenly bg-gray-100  p-2 mt-3 rounded-3xl">
                <div>
                  <div className="bg-[#760BFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaImage />
                  </div>
                  <p className="text-center  text-sm text-[#202020]">{stats.onApproval}</p>
                  <p className="text-[#202020] text-xs">On Approval</p>
                </div>
                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#0B5EFF] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <RiCheckDoubleLine />
                  </div>
                  <p className="text-center  text-sm text-[#202020]">{stats.registered}</p>
                  <p className="text-[#202020] text-xs">Registered</p>
                </div>

                <div className="h-25 w-0.5 bg-[#6F6F6F]"></div>
                <div>
                  <div className="bg-[#FF6812] w-9 h-9 rounded-full text-white flex items-center justify-center mx-auto ">
                    <FaCalendarCheck />
                  </div>
                  <p className="text-center  text-[#202020] text-sm">{stats.requests}</p>
                  <p className="text-[#202020] text-xs">Requests</p>
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
                {recentRequests.length > 0 ? (
                  recentRequests.map((req, idx) => {
                    const isDark = idx % 2 === 1;
                    const isSentByMe = profile?.role === "startup";
                    const raiser = req.raisedBy;

                    const raiserName = isSentByMe 
                      ? (req.service || "My Request") 
                      : (raiser?.businessDetails?.firstName 
                        ? `${raiser.businessDetails.firstName} ${raiser.businessDetails.lastName || ""}`
                        : "Unknown User");

                    const raiserRole = isSentByMe 
                      ? (req.status || "Raised") 
                      : (raiser?.role || "User");

                    return (
                      <div 
                        key={req._id}
                        className={`border w-full p-4 rounded-3xl mb-2 ${
                          isDark ? "bg-[#001426] text-white" : "bg-[#F1F1F1] text-[#202020]"
                        }`}
                      >
                        <p className={`${isDark ? "text-gray-300" : "text-[#6F6F6F]"} text-sm`}>
                          {formatTime(req.createdAt)}
                        </p>
                        <h1 className="my-3 w-[85%] leading-5 font-semibold text-lg line-clamp-2">
                          {req.service}
                        </h1>
                        <Link to="/requests">
                          <button className="bg-[#FF6812] text-white py-1 px-4 my-1 mb-4 rounded-md hover:bg-white hover:text-[#FF6812] transition-all">
                            Check status
                          </button>
                        </Link>
                        <div className="flex items-center gap-2 my-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-300"}`}>
                            <CgProfile size={20} />
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">{raiserName}</p>
                            <p className="opacity-70 capitalize">{raiserRole.replace("_", " ")}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full text-center py-6 text-gray-400 text-sm">
                    No recent requests found.
                  </div>
                )}
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
                <p className="text-3xl font-semibold">{stats.weeklyConnects || 0}</p>
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
      )   }  
       {/* Upgrade & Credits Popup */}
      {showMobileCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-5 relative shadow-2xl border border-[#D8D6F8] animate-in zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowMobileCredits(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <RxCross2 size={22} />
            </button>

            {/* Header Section */}
            <div className="flex items-start gap-3 mb-2 pt-1">
              <div className="w-12 h-12 bg-[#FFF8E7] rounded-full flex items-center justify-center text-2xl shadow-inner shrink-0">
                ⭐
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#001032] leading-tight">
                  {profile?.role === "startup" ? "Unlock More" : "Grow Your"}<br />
                  <span className="text-[#59549F]">
                    {profile?.role === "startup" ? "Opportunities" : "Business"}
                  </span> Waiting
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">
              {profile?.role === "startup" 
                ? "You've reached your free access limit. More investors and professionals are ready to connect with you."
                : "You've reached your free access limit. More high-intent startups are looking for professionals like you."}
            </p>

            {/* Yellow Highlight Box */}
            <div className="bg-[#FFF8E7] border border-[#FFD700] rounded-xl px-3 py-2 flex items-center gap-3 mb-3">
              <span className="text-yellow-500 text-xl">⚡</span>
              <div>
                <p className="text-xs font-bold text-[#B8860B]">
                  Unlock full ecosystem access
                </p>
                <p className="text-[10px] text-gray-600">to continue building valuable connections</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-4 mb-4">
              <p className="text-[11px] font-bold text-[#001032] mb-3 uppercase tracking-wider opacity-70">
                WITH FULL ACCESS, YOU CAN:
              </p>
              <ul className="space-y-2">
                {[
                  {
                    icon: "🤝",
                    color: "bg-blue-100",
                    text: profile?.role === "startup" ? "Connect with multiple investors" : "Connect with high-intent startups",
                  },
                  { 
                    icon: "⚡", 
                    color: "bg-green-100", 
                    text: profile?.role === "startup" ? "Get faster responses to requests" : "Get more relevant client matches" 
                  },
                  {
                    icon: "📈",
                    color: "bg-purple-100",
                    text: profile?.role === "startup" ? "Increase visibility to top investors" : "Showcase profile to decision makers",
                  },
                  { 
                    icon: "🏆", 
                    color: "bg-orange-100", 
                    text: "Execute deals without limits" 
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${item.color} flex items-center justify-center text-xs shrink-0 shadow-sm`}>
                      {item.icon}
                    </div>
                    <span className="text-[12px] text-[#4A4E91] font-medium leading-tight">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Link
                to="/pricing"
                state={{ 
                  isUpgradeFlow: true, 
                  role: profile?.role, 
                  currentPlanAmount: profile?.plan?.amount || 0 
                }}
                onClick={() => setShowMobileCredits(false)}
                className="w-full py-2.5 bg-[#181555] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-[#181555]/20 transition-all transform active:scale-[0.98] tracking-wide"
              >
                🔒 Unlock Full Access
              </Link>
              
              <button
                onClick={() => setShowMobileCredits(false)}
                className="w-full py-1.5 text-gray-400 font-bold text-[10px] hover:text-gray-600 transition-colors tracking-widest uppercase"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSec;
