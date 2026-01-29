import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { IoDiamondOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { serverUrl } from "@/App";
import axios from "axios";
import { FaLinkedin } from "react-icons/fa6";
import instaIcon from "/instagram.jpeg";
import { FaArrowLeft } from "react-icons/fa";

const ConnectSec1 = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullSkills, setShowFullSkills] = useState(false);
  const [showFullServices, setShowFullServices] = useState(false);
  const [expandedExp, setExpandedExp] = useState({});
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);

  const skillsArray = Array.isArray(selectedProfile?.topSkills)
    ? selectedProfile.topSkills
    : selectedProfile?.topSkills
      ? selectedProfile.topSkills.split(",").map((s) => s.trim())
      : [];

  const topSkillsText = skillsArray.join(", ");
  const skillsRef = React.useRef(null);
  const [skillsOverflow, setSkillsOverflow] = useState(false);
  const servicesText = selectedProfile?.services?.join(", ") || "";

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/profile/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfiles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/connections/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSentRequests(res.data.sent);
        setReceivedRequests(res.data.received);

        // 🧠 profiles ke andar status inject karo
        setProfiles((prev) =>
          prev.map((p) => {
            const isSent = res.data.sent.some(
              (s) => s.receiverId._id === p.userId._id,
            );
            const isReceived = res.data.received.some(
              (r) => r.senderId._id === p.userId._id,
            );

            return {
              ...p,
              connectionStatus: isSent
                ? "sent"
                : isReceived
                  ? "received"
                  : "none",
              connectionId: isReceived
                ? res.data.received.find((r) => r.senderId._id === p.userId._id)
                    ?._id
                : null,
            };
          }),
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchConnections();
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (skillsRef.current) {
        setSkillsOverflow(
          skillsRef.current.scrollHeight > skillsRef.current.clientHeight ||
            skillsRef.current.scrollWidth > skillsRef.current.clientWidth,
        );
      }
    };

    // Profile open hone par aur font load hone ke baad check
    setTimeout(checkOverflow, 200);

    // Window resize ke liye
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [selectedProfile, isMobileProfileOpen]);

  const toggleExperience = (index) => {
    setExpandedExp((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const sendConnectionRequest = async (receiverId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${serverUrl}/connections/send`,
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Connection request sent");

      // UI update (optional but recommended)
      setProfiles((prev) =>
        prev.map((p) =>
          p.userId._id === receiverId ? { ...p, connectionStatus: "sent" } : p,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const respondToRequest = async (connectionId, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${serverUrl}/connections/update`,
        { connectionId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // UI update
      setProfiles((prev) =>
        prev.map((p) =>
          p.connectionId === connectionId
            ? { ...p, connectionStatus: status }
            : p,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  let filteredProfiles = profiles;

  if (activeTab === "sent") {
    filteredProfiles = profiles.filter((p) => p.connectionStatus === "sent");
  }

  if (activeTab === "received") {
    filteredProfiles = profiles.filter(
      (p) => p.connectionStatus === "received",
    );
  }

  const tabClass = (tab) =>
    activeTab === tab
      ? "bg-[#001032] text-white"
      : "border border-[#D9D9D9] text-[#001032]";

  return (
    <div className="md:flex  lg:bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-6">
      <div className=" bg-gray-100 h-[85vh]  w-full  mx-auto  pt-4">
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg px-10 mb-4 justify-between items-center">
          <h1 className="text-md font-semibold text-gray-800">
            Welcome, Startup India Pvt. Ltd.
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm hover:bg-gray-50 transition-colors">
            <FaUser
              className="text-gray-600 border border-gray-600 p-1 rounded-full"
              size={24}
            />
            <span className="font-semibold text-gray-800">
              Switch to professional
            </span>
          </button>
        </div>

        <div className="flex gap-4 items-stretch">
          <div
            className={`flex flex-col bg-white border border-gray-400 p-4 rounded-md shadow-md w-full md:w-[50%] h-screen lg:h-[88vh] gap-2 
  ${isMobileProfileOpen ? "hidden lg:flex" : "flex"}`}
          >
            <div>
              <input
                type="text"
                placeholder="Search"
                className="border border-[#D9D9D9] p-2 rounded-lg w-full"
              />
            </div>
            <div>
              <button
                onClick={() => setActiveTab("all")}
                className={`${tabClass("all")}  px-4 py-1 rounded-lg lg:w-30 w-25`}
              >
                All
              </button>

              <button
                onClick={() => setActiveTab("received")}
                className={`${tabClass("received")} px-4 py-1 rounded-lg border border-[#D9D9D9] lg:w-30 w-25`}
              >
                Received
              </button>

              <button
                onClick={() => setActiveTab("sent")}
                className={`${tabClass("sent")} px-4 py-1 rounded-lg border border-[#D9D9D9] lg:w-30 w-25`}
              >
                Sent
              </button>
            </div>

            {/* Column 2 */}
            <div className=" flex flex-col gap-3 w-full max-h-140 scrollbar-hide overflow-y-auto ">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}

              {!loading &&
                !error &&
                filteredProfiles.map((profile) => (
                  <div
                    onClick={() => {
                      setSelectedProfile(profile);

                      if (window.innerWidth < 1024) {
                        setIsMobileProfileOpen(true);
                      }
                    }}
                    key={profile._id}
                    className="flex items-center  gap-3 border border-gray-600 rounded-lg  bg-white shadow-md hover:shadow-md transition-all"
                  >
                    <div className="w-16 h-16 my-2 ml-2 rounded-full border-2 border-gray-300 shrink-0 flex items-center justify-center overflow-hidden bg-gray-200">
                      {profile.userId?.profilePhoto && (
                        <img
                          src={`${serverUrl}${profile.userId.profilePhoto}`}
                          alt=""
                          className="w-full h-full object-cover rounded-full"
                        />
                      )}
                    </div>
                    <div className="w-0.5 h-full p-0 bg-[#0010324D]"></div>
                    <div className="flex items-center justify-between pr-2 lg:pr-0 lg:gap-3">
                      <div className="my-3  w-[65%] lg:w-[72%]">
                        <h1 className="text-[#001032] font-semibold text-sm">
                          {profile.name}
                        </h1>
                        <p className="text-[#001032]  text-xs">
                          {window.innerWidth < 1024
                            ? profile.bio?.slice(0, 40) + "..."
                            : profile.bio?.slice(0, 60) + "..."}
                        </p>
                        <p className="text-[#001032]   text-[10px]">
                          {profile.city && profile.state
                            ? `${profile.city}, ${profile.state}`
                            : "Location not added"}
                        </p>
                      </div>
                      <div className=" w-[35%] lg:w-[28%] ">
                        {profile.connectionStatus === "received" ? (
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                respondToRequest(
                                  profile.connectionId,
                                  "accepted",
                                );
                              }}
                              className="bg-green-600 text-white px-4 py-1 text-xs rounded-full"
                            >
                              Accept
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                respondToRequest(
                                  profile.connectionId,
                                  "ignored",
                                );
                              }}
                              className="bg-red-500 text-white px-4 py-1 text-xs rounded-full"
                            >
                              Ignore
                            </button>
                          </div>
                        ) : profile.connectionStatus === "sent" ? (
                          <button
                            disabled
                            className="bg-gray-400 text-white lg:w-30 w-20 py-1 my-1 text-sm rounded-full cursor-not-allowed"
                          >
                            Pending
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              sendConnectionRequest(profile.userId._id);
                            }}
                            className="bg-[#001032] text-white lg:w-30 w-20 py-1 my-1 text-sm rounded-full"
                          >
                            Connect
                          </button>
                        )}

                        <button className="bg-[#B1AAAA] text-white lg:w-30 w-20 py-1 my-1 text-sm rounded-full ">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* 📱 MOBILE FULL PROFILE VIEW */}
          {isMobileProfileOpen && selectedProfile && (
            <div className="lg:hidden w-full h-screen bg-gray-100 overflow-y-auto ">
              {/* Header with Back Arrow */}
              <div className="flex items-center gap-3 p-4 bg-white border-b">
                <button
                  onClick={() => setIsMobileProfileOpen(false)}
                  className="text-xl font-semibold"
                >
                  <FaArrowLeft />
                </button>
                <h1 className="font-semibold text-lg">
                  {selectedProfile.name}
                </h1>
              </div>

              {/* Full Profile Content (reuse SAME right-side UI) */}
              <div className="bg-white border border-gray-300 shadow-md rounded-b-2xl  flex flex-col  w-full min-h-full mb-15">
                {/* Header image section */}
                <div
                  className="relative h-30 border border-gray-300 "
                  style={{
                    backgroundImage: selectedProfile.userId?.coverImage
                      ? `url(${serverUrl}${selectedProfile.userId.coverImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {/* Profile photo overlap */}
                <div className="relative px-2 -mt-12">
                  <div className="w-28 h-28  rounded-full border-2 border-gray-300 shadow-md bg-gray-200 overflow-hidden">
                    {selectedProfile.userId?.profilePhoto && (
                      <img
                        src={`${serverUrl}${selectedProfile.userId.profilePhoto}`}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>

                  <div className="mt-6 px-2 ">
                    <h2 className="text-gray-900 text-lg font-semibold">
                      {selectedProfile.name}
                    </h2>
                    <p className="text-sm text-gray-800 mt-1 leading-tight w-[80%]">
                      {selectedProfile.bio || "No bio available"}
                    </p>

                    <p className="text-sm text-gray-700 font-medium mt-2 ">
                      {selectedProfile.city && selectedProfile.state
                        ? `${selectedProfile.city}, ${selectedProfile.state}`
                        : "Location not added"}
                    </p>
                  </div>
                </div>

                {/* About Section */}
                <div
                  id="about"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2 mt-3"
                >
                  {/* About Header */}
                  <div className="flex justify-between items-center mt-2 mb-1 px-2">
                    <h1 className="text-[#001032] font-semibold text-md lg:text-xl">
                      About
                    </h1>
                  </div>

                  {/* About Content */}
                  <div className="py-2 text-sm lg:tracking-wider tracking-wide lg:pr-0 h-auto">
                    <div className="px-2 relative">
                      <p
                        className={`text-sm ${showFullAbout ? "" : "line-clamp-3"}`}
                      >
                        {selectedProfile?.about || "No About Info"}
                      </p>

                      {/* See More button */}
                      {selectedProfile?.about &&
                        selectedProfile.about.split(" ").length > 20 && (
                          <button
                            onClick={() => setShowFullAbout(!showFullAbout)}
                            className="text-blue-600 text-sm font-medium mt-1"
                          >
                            {showFullAbout ? "See Less" : "See More"}
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Top Skills */}
                  <div className="flex flex-col gap-1 p-2 mx-2 my-4 border-2 border-[#D9D9D9] rounded-xl text-[#001032]">
                    <div className="flex items-center gap-2">
                      <IoDiamondOutline size={22} />
                      <h1 className="w-[40%] text-md lg:text-xl font-semibold">
                        Top Skills
                      </h1>
                    </div>

                    <p
                      ref={skillsRef}
                      className={`lg:text-sm text-xs leading-4 flex items-center lg:leading-7 lg:w-[90%] pl-8 ${
                        showFullSkills ? "" : "line-clamp-2"
                      }`}
                    >
                      {topSkillsText || "No Skills Added"}
                    </p>

                    {/* ✅ See More button */}
                    {topSkillsText && topSkillsText.split(" ").length > 15 && (
                      <button
                        onClick={() => setShowFullSkills(!showFullSkills)}
                        className="text-blue-600 text-sm font-medium mt-1 pl-8 text-left self-start"
                      >
                        {showFullSkills ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div
                  id="services"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2  my-2 py-2 "
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032]  px-2 font-semibold text-md lg:text-xl">
                      Services
                    </h1>
                  </div>
                  <div className=" px-2 lg:py-2 py-1 mb-6 relative">
                    <div className="relative">
                      <p
                        className={`text-sm font-medium leading-6 lg:leading-7 lg:pr-3 overflow-hidden transition-all duration-300 ${
                          showFullServices ? "" : "line-clamp-2"
                        }`}
                      >
                        {servicesText || "No services added"}
                      </p>

                      {servicesText.split(" ").length > 15 && (
                        <button
                          onClick={() => setShowFullServices(!showFullServices)}
                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                        >
                          {showFullServices ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div
                  id="experience"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2 py-2 mb-2"
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032] px-2 font-semibold text-md lg:text-xl">
                      Experience
                    </h1>
                  </div>

                  <div className="pl-2 pb-5 mt-2">
                    {selectedProfile.experience &&
                    selectedProfile.experience.length > 0 ? (
                      selectedProfile.experience.map((exp, index) => (
                        <div key={index} className="mb-4 border-b pb-3">
                          <div className="flex justify-between items-start">
                            <div className="w-full">
                              <h1 className="font-semibold pt-1 text-md lg:text-xl">
                                {exp.title}
                              </h1>
                              <p className="text-sm font-medium">
                                {exp.company}
                              </p>
                              <p className="text-sm text-gray-500">
                                {exp.duration.startDate} -{" "}
                                {exp.duration.present
                                  ? "Present"
                                  : exp.duration.endDate}
                              </p>
                              <p className="text-sm">{exp.location}</p>

                              {exp.description &&
                                exp.description.length > 0 && (
                                  <ul className="list-disc ml-4 mt-2 text-sm">
                                    <li>
                                      <p
                                        className={`transition-all duration-300 ${
                                          expandedExp[index]
                                            ? ""
                                            : "line-clamp-2"
                                        }`}
                                      >
                                        {exp.description[0]}
                                      </p>

                                      {exp.description[0].split(" ").length >
                                        15 && (
                                        <button
                                          onClick={() =>
                                            setExpandedExp((prev) => ({
                                              ...prev,
                                              [index]: !prev[index],
                                            }))
                                          }
                                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                                        >
                                          {expandedExp[index]
                                            ? "See Less"
                                            : "See More"}
                                        </button>
                                      )}
                                    </li>
                                  </ul>
                                )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No experience added</p>
                    )}
                  </div>
                </div>

                {/* portfolio */}
                <div
                  id="portfolio"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2 py-2 mb-2"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032] px-2 font-semibold text-md lg:text-xl">
                      Portfolio
                    </h1>
                  </div>

                  {/* ===== Desktop View ===== */}
                  <div className="hidden lg:block">
                    <div className="flex flex-wrap pl-2 gap-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-48 h-48 border-2 border-[#D9D9D9] rounded-md overflow-hidden cursor-pointer"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-2">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===== Mobile View ===== */}
                  <div className="lg:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pl-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-[40%] h-40 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-2">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* socialmedia */}
                <div
                  id="social-media"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-2  py-2 mb-4 pb-5"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032]  px-4 font-semibold text-md lg:text-xl">
                      Social Media
                    </h1>
                  </div>

                  <div className=" pl-4 py-2 mb-3 flex flex-col gap-2 lg:pr-30 pr-5">
                    {selectedProfile?.socialMedia?.linkedin ||
                    selectedProfile?.socialMedia?.instagram ? (
                      /* 🔵 VIEW MODE (data exists) → show icons only */
                      <>
                        {selectedProfile?.socialMedia?.linkedin && (
                          <a
                            href={selectedProfile.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600"
                          >
                            <FaLinkedin size={20} /> LinkedIn
                          </a>
                        )}

                        {selectedProfile?.socialMedia?.instagram && (
                          <a
                            href={selectedProfile.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-pink-500"
                          >
                            <img src={instaIcon} className="w-5 rounded-sm" />
                            Instagram
                          </a>
                        )}
                      </>
                    ) : (
                      /* ⚪ VIEW MODE (no data yet) → show gray disabled icons */
                      <>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaLinkedin size={20} /> LinkedIn
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <img src={instaIcon} className="w-5 rounded-sm" />
                          Instagram
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Right Card (exact UI, untouched CSS) */}
          <div className="hidden lg:flex w-[50%] h-[88vh] scrollbar-hide overflow-x-auto">
            {selectedProfile ? (
              <div className="bg-white border border-gray-300 shadow-md rounded-2xl  flex flex-col justify-between w-full h-full">
                {/* Header image section */}
                <div
                  className="relative h-40 border border-gray-300 mt-40"
                  style={{
                    backgroundImage: selectedProfile.userId?.coverImage
                      ? `url(${serverUrl}${selectedProfile.userId.coverImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {/* Profile photo overlap */}
                <div className="relative px-4 -mt-12">
                  <div className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-md bg-gray-200 overflow-hidden">
                    {selectedProfile.userId?.profilePhoto && (
                      <img
                        src={`${serverUrl}${selectedProfile.userId.profilePhoto}`}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>

                  <div className="mt-6 px-4 ">
                    <h2 className="text-gray-900 text-lg font-semibold">
                      {selectedProfile.name}
                    </h2>
                    <p className="text-sm text-gray-800 mt-1 leading-tight w-[70%]">
                      {selectedProfile.bio || "No bio available"}
                    </p>

                    <p className="text-sm text-gray-700 font-medium mt-2 ">
                      {selectedProfile.city && selectedProfile.state
                        ? `${selectedProfile.city}, ${selectedProfile.state}`
                        : "Location not added"}
                    </p>
                  </div>
                </div>

                {/* About Section */}
                <div
                  id="about"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4 mt-3"
                >
                  {/* About Header */}
                  <div className="flex justify-between items-center mt-2 mb-1 px-4">
                    <h1 className="text-[#001032] font-semibold text-md lg:text-xl">
                      About
                    </h1>
                  </div>

                  {/* About Content */}
                  <div className="py-2 text-sm lg:tracking-wider tracking-wide lg:pr-0 h-auto">
                    <div className="px-4 relative">
                      <p
                        className={`text-sm ${showFullAbout ? "" : "line-clamp-3"}`}
                      >
                        {selectedProfile?.about || "No About Info"}
                      </p>

                      {/* See More button */}
                      {selectedProfile?.about &&
                        selectedProfile.about.split(" ").length > 20 && (
                          <button
                            onClick={() => setShowFullAbout(!showFullAbout)}
                            className="text-blue-600 text-sm font-medium mt-1"
                          >
                            {showFullAbout ? "See Less" : "See More"}
                          </button>
                        )}
                    </div>
                  </div>

                  {/* Top Skills */}
                  <div className="flex flex-col gap-1 p-2 mx-4 my-4 border-2 border-[#D9D9D9] rounded-xl text-[#001032]">
                    <div className="flex items-center gap-2">
                      <IoDiamondOutline size={22} />
                      <h1 className="w-[40%] text-md lg:text-xl font-semibold">
                        Top Skills
                      </h1>
                    </div>

                    <p
                      ref={skillsRef}
                      className={`lg:text-sm text-xs leading-4 flex items-center lg:leading-7 lg:w-[90%] pl-8 ${
                        showFullSkills ? "" : "line-clamp-2"
                      }`}
                    >
                      {topSkillsText || "No Skills Added"}
                    </p>

                    {/* ✅ See More button */}
                    {(skillsOverflow || showFullSkills) && (
                      <button
                        onClick={() => setShowFullSkills(!showFullSkills)}
                        className="text-blue-600 text-sm font-medium mt-1 pl-8 text-left self-start"
                      >
                        {showFullSkills ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div
                  id="services"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4  my-2 py-2 "
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032]  px-4 font-semibold text-md lg:text-xl">
                      Services
                    </h1>
                  </div>
                  <div className=" px-4 lg:py-2 py-1 mb-6 relative">
                    <div className="relative">
                      <p
                        className={`text-sm font-medium leading-6 lg:leading-7 lg:pr-3 overflow-hidden transition-all duration-300 ${
                          showFullServices ? "" : "line-clamp-2"
                        }`}
                      >
                        {servicesText || "No services added"}
                      </p>

                      {servicesText.split(" ").length > 15 && (
                        <button
                          onClick={() => setShowFullServices(!showFullServices)}
                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                        >
                          {showFullServices ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div
                  id="experience"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4 py-2 my-2"
                >
                  <div className="flex justify-between items-center mt-3 mb-1">
                    <h1 className="text-[#001032] px-4 font-semibold text-md lg:text-xl">
                      Experience
                    </h1>
                  </div>

                  <div className="pl-4 pb-5 mt-6">
                    {selectedProfile.experience &&
                    selectedProfile.experience.length > 0 ? (
                      selectedProfile.experience.map((exp, index) => (
                        <div key={index} className="mb-4 border-b pb-3">
                          <div className="flex justify-between items-start">
                            <div className="w-full">
                              <h1 className="font-semibold pt-1 text-md lg:text-xl">
                                {exp.title}
                              </h1>
                              <p className="text-sm font-medium">
                                {exp.company}
                              </p>
                              <p className="text-sm text-gray-500">
                                {exp.duration.startDate} -{" "}
                                {exp.duration.present
                                  ? "Present"
                                  : exp.duration.endDate}
                              </p>
                              <p className="text-sm">{exp.location}</p>

                              {exp.description &&
                                exp.description.length > 0 && (
                                  <ul className="list-disc ml-5 mt-2 text-sm">
                                    <li>
                                      <p
                                        className={`transition-all duration-300 ${
                                          expandedExp[index]
                                            ? ""
                                            : "line-clamp-2"
                                        }`}
                                      >
                                        {exp.description[0]}
                                      </p>

                                      {exp.description[0].split(" ").length >
                                        15 && (
                                        <button
                                          onClick={() =>
                                            setExpandedExp((prev) => ({
                                              ...prev,
                                              [index]: !prev[index],
                                            }))
                                          }
                                          className="text-blue-600 text-sm font-medium mt-1 text-left"
                                        >
                                          {expandedExp[index]
                                            ? "See Less"
                                            : "See More"}
                                        </button>
                                      )}
                                    </li>
                                  </ul>
                                )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No experience added</p>
                    )}
                  </div>
                </div>

                {/* portfolio */}
                <div
                  id="portfolio"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white px-4 py-2 my-2"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032] px-4 font-semibold text-md lg:text-xl">
                      Portfolio
                    </h1>
                  </div>

                  {/* ===== Desktop View ===== */}
                  <div className="hidden lg:block">
                    <div className="flex flex-wrap pl-4 gap-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-48 h-48 border-2 border-[#D9D9D9] rounded-md overflow-hidden cursor-pointer"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-4">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ===== Mobile View ===== */}
                  <div className="lg:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pl-4 mb-4">
                      {selectedProfile.portfolio &&
                      selectedProfile.portfolio.length > 0 ? (
                        selectedProfile.portfolio.map((item) => (
                          <div
                            key={item._id}
                            className="relative w-[40%] h-40 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center"
                          >
                            <img
                              src={getPortfolioUrl(item.fileUrl)}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 pl-2">
                          No portfolio items added
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* socialmedia */}
                <div
                  id="social-media"
                  className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-4 lg:my-2 lg:py-2 mb-4"
                >
                  <div className="flex justify-between items-center my-3">
                    <h1 className="text-[#001032]  px-4 font-semibold text-md lg:text-xl">
                      Social Media
                    </h1>
                  </div>

                  <div className=" pl-4 py-2 mb-3 flex flex-col gap-2 lg:pr-30 pr-5">
                    {selectedProfile?.socialMedia?.linkedin ||
                    selectedProfile?.socialMedia?.instagram ? (
                      /* 🔵 VIEW MODE (data exists) → show icons only */
                      <>
                        {selectedProfile?.socialMedia?.linkedin && (
                          <a
                            href={selectedProfile.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600"
                          >
                            <FaLinkedin size={20} /> LinkedIn
                          </a>
                        )}

                        {selectedProfile?.socialMedia?.instagram && (
                          <a
                            href={selectedProfile.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-pink-500"
                          >
                            <img src={instaIcon} className="w-5 rounded-sm" />
                            Instagram
                          </a>
                        )}
                      </>
                    ) : (
                      /* ⚪ VIEW MODE (no data yet) → show gray disabled icons */
                      <>
                        <div className="flex items-center gap-2 text-gray-400">
                          <FaLinkedin size={20} /> LinkedIn
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <img src={instaIcon} className="w-5 rounded-sm" />
                          Instagram
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 m-auto">
                Select a profile to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSec1;
