import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaLinkedin } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { serverUrl } from "@/App";
import axios from "axios";
import instaIcon from "/instagram.jpeg";
import { useNavigate } from "react-router-dom";

const RightReceived = ({
  selectedRequest,
  setSelectedRequest,
  setMobileView,
  handleInterest,
  handleIgnore,
  handleAccept,
  showConfirm,
  setShowConfirm,
}) => {
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullSkills, setShowFullSkills] = useState(false);
  const [showFullServices, setShowFullServices] = useState(false);
  const [expandedExp, setExpandedExp] = useState({});
  const navigate = useNavigate();

  const handleClose = () => {
    setSelectedRequest(null);
    setProfessionalProfile(null);
    setShowFullAbout(false);
    setShowFullSkills(false);
    setShowFullServices(false);
    setExpandedExp({});
    if (setMobileView) {
      setMobileView("left");
    }
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    const publicBaseUrl = "https://pub-cb99bea3292949639f304d67adc5d74e.r2.dev";
    const privateBaseUrl = `https://copteno.c2fc1593db66d893ceff4e23d571cfb6.r2.cloudflarestorage.com`;
    if (imageUrl.startsWith(privateBaseUrl)) {
      return imageUrl.replace(privateBaseUrl, publicBaseUrl);
    }
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${serverUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };

  // Fetch professional profile when viewType is 'profile'
  useEffect(() => {
    const fetchProfessionalProfile = async () => {
      if (selectedRequest?.viewType === 'profile' && selectedRequest?.professionalData) {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const professionalUserId = selectedRequest.professionalData._id || selectedRequest.professionalData;

          // Fetch all profiles and find the matching one
          const res = await axios.get(`${serverUrl}/profile/all`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const profile = res.data.find(p => p.userId._id === professionalUserId);
          setProfessionalProfile(profile || null);
        } catch (err) {
          console.error("Error fetching professional profile:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfessionalProfile();
  }, [selectedRequest]);

  // If no request is selected, show empty state
  if (!selectedRequest) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="flex flex-col items-center p-8 text-center border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded-md">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            No Request Selected
          </h3>
          <p className="text-gray-500 text-sm">
            Click on a request from the left to view details
          </p>
        </div>
      </div>
    );
  }

  // Show Professional Profile View (same layout as ConnectSec1)
  if (selectedRequest.viewType === 'profile' && selectedRequest.professionalData) {
    const professional = selectedRequest.professionalData;
    const profile = professionalProfile || {};

    // Check if this professional is accepted
    const isAccepted = selectedRequest.acceptedProvider && 
      (typeof selectedRequest.acceptedProvider === 'string' 
        ? selectedRequest.acceptedProvider === professional._id 
        : selectedRequest.acceptedProvider.toString() === professional._id.toString());

    const skillsArray = Array.isArray(profile?.topSkills)
      ? profile.topSkills
      : profile?.topSkills
        ? profile.topSkills.split(",").map((s) => s.trim())
        : [];
    const topSkillsText = skillsArray.join(", ");
    const servicesText = profile?.services?.join(", ") || "";

    if (loading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#59549F]"></div>
            <p className="text-sm text-gray-500">Loading profile...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col lg:p-4 p-2 bg-white rounded-md overflow-y-auto scrollbar-hide">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedRequest && setSelectedRequest({ ...selectedRequest, viewType: 'request' })}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoMdArrowBack size={20} className="text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-[#001032]">
              Professional Profile
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoMdClose size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Profile Content - Same as ConnectSec1 */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Cover Image */}
          <div
            className={`relative h-32 border border-gray-300 rounded-t-lg ${
              !profile.coverImage
                ? "bg-linear-to-b from-[#D8D6F8] to-[#F8DEDE]"
                : ""
            }`}
            style={
              profile.coverImage
                ? {
                    backgroundImage: `url(${getImageUrl(profile.coverImage)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            {profile.coverImage && (
              <div className="absolute inset-0 bg-black/30 rounded-t-lg" />
            )}
          </div>

          {/* Profile Photo */}
          <div className="relative px-4 -mt-12">
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 bg-linear-to-b from-[#FFFFFF] from-3% to-[#999999] shadow-[0px_4px_10px_rgba(0,0,0,0.25)] overflow-hidden">
              {profile.profilePhoto ? (
                <img
                  src={getImageUrl(profile.profilePhoto) || ""}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-2xl font-bold text-gray-600">
                  {(profile.name || professional.name || "P").charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-gray-900 text-lg font-semibold">
                {profile.name || professional.name || 'Professional Name'}
              </h2>
              <p className="text-sm text-gray-800 mt-1 leading-tight">
                {profile.bio || 'No bio available'}
              </p>
              <p className="text-sm text-gray-700 font-medium mt-2">
                {profile.city && profile.state
                  ? `${profile.city}, ${profile.state}`
                  : "Location not added"}
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="border-2 border-[#D9D9D9] rounded-xl bg-white px-4 mt-4">
            <div className="flex justify-between items-center mt-2 mb-1">
              <h1 className="text-[#001032] font-semibold text-lg">About</h1>
            </div>
            <div className="py-2 text-sm">
              <p className={`text-sm ${showFullAbout ? "" : "line-clamp-3"}`}>
                {profile?.about || "No About Info"}
              </p>
              {profile?.about && profile.about.split(" ").length > 20 && (
                <button
                  onClick={() => setShowFullAbout(!showFullAbout)}
                  className="text-blue-600 text-sm font-medium mt-1"
                >
                  {showFullAbout ? "See Less" : "See More"}
                </button>
              )}
            </div>

            {/* Top Skills */}
            <div className="flex flex-col gap-1 p-2 my-4 border-2 border-[#D9D9D9] rounded-xl text-[#001032]">
              <div className="flex items-center gap-2">
                <IoDiamondOutline size={20} />
                <h1 className="text-md font-semibold">Top Skills</h1>
              </div>
              <p className={`text-sm leading-6 pl-7 ${showFullSkills ? "" : "line-clamp-2"}`}>
                {topSkillsText || "No Skills Added"}
              </p>
              {topSkillsText && topSkillsText.split(" ").length > 15 && (
                <button
                  onClick={() => setShowFullSkills(!showFullSkills)}
                  className="text-blue-600 text-sm font-medium mt-1 pl-7 text-left"
                >
                  {showFullSkills ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="border-2 border-[#D9D9D9] rounded-xl bg-linear-to-r from-[#D8D6F8] to-[#F8DEDE] px-4 my-3 py-2">
            <div className="flex justify-between items-center mt-2 mb-1">
              <h1 className="text-[#001032] font-semibold text-lg">Services</h1>
            </div>
            <div className="py-2 mb-4">
              <p className={`text-sm font-medium leading-6 ${showFullServices ? "" : "line-clamp-2"}`}>
                {servicesText || "No services added"}
              </p>
              {servicesText.split(" ").length > 15 && (
                <button
                  onClick={() => setShowFullServices(!showFullServices)}
                  className="text-blue-600 text-sm font-medium mt-1"
                >
                  {showFullServices ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className="border-2 border-[#D9D9D9] rounded-xl bg-white px-4 py-2 my-3">
            <div className="flex justify-between items-center mt-2 mb-1">
              <h1 className="text-[#001032] font-semibold text-lg">Experience</h1>
            </div>
            <div className="pb-4 mt-2">
              {profile.experience && profile.experience.length > 0 ? (
                profile.experience.map((exp, index) => (
                  <div key={index} className="mb-4 border-b pb-3">
                    <h1 className="font-semibold text-md">{exp.title}</h1>
                    <p className="text-sm font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.duration.startDate} - {exp.duration.present ? "Present" : exp.duration.endDate}
                    </p>
                    <p className="text-sm">{exp.location}</p>
                    {exp.description && exp.description.length > 0 && (
                      <div className="mt-2">
                        <p className={`text-sm ${expandedExp[index] ? "" : "line-clamp-2"}`}>
                          {exp.description[0]}
                        </p>
                        {exp.description[0].split(" ").length > 15 && (
                          <button
                            onClick={() =>
                              setExpandedExp((prev) => ({
                                ...prev,
                                [index]: !prev[index],
                              }))
                            }
                            className="text-blue-600 text-sm font-medium mt-1"
                          >
                            {expandedExp[index] ? "See Less" : "See More"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No experience added</p>
              )}
            </div>
          </div>

          {/* Portfolio */}
          <div className="border-2 border-[#D9D9D9] rounded-xl bg-linear-to-b from-[#D8D6F8] from-5% to-[#F8DEDE] px-4 py-2 my-3">
            <div className="flex justify-between items-center my-2">
              <h1 className="text-[#001032] font-semibold text-lg">Portfolio</h1>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              {profile.portfolio && profile.portfolio.length > 0 ? (
                profile.portfolio.map((item) => (
                  <div
                    key={item._id}
                    className="relative w-32 h-32 border-2 border-[#D9D9D9] rounded-md overflow-hidden"
                  >
                    <img
                      src={getImageUrl(item.fileUrl) || ""}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No portfolio items added</p>
              )}
            </div>
          </div>

          {/* Social Media */}
          <div className="border-2 border-[#D9D9D9] rounded-xl bg-white px-4 py-2 my-3 mb-4">
            <div className="flex justify-between items-center my-2">
              <h1 className="text-[#001032] font-semibold text-lg">Social Media</h1>
            </div>
            <div className="py-2 mb-2 flex flex-col gap-2">
              {profile?.socialMedia?.linkedin || profile?.socialMedia?.instagram ? (
                <>
                  {profile?.socialMedia?.linkedin && (
                    <a
                      href={profile.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600"
                    >
                      <FaLinkedin size={18} /> LinkedIn
                    </a>
                  )}
                  {profile?.socialMedia?.instagram && (
                    <a
                      href={profile.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-pink-500"
                    >
                      <img src={instaIcon} className="w-4 rounded-sm" alt="Instagram" />
                      Instagram
                    </a>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaLinkedin size={18} /> LinkedIn
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <img src={instaIcon} className="w-4 rounded-sm" alt="Instagram" />
                    Instagram
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Request Details Section */}
          <div className="border-2 border-[#D9D9D9] rounded-xl bg-gray-50 px-4 py-3 my-3">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Request Details</h4>
            <p className="text-sm text-[#001032] font-medium">{selectedRequest.service}</p>
            <p className="text-xs text-gray-600 mt-1">{selectedRequest.description}</p>
          </div>
        </div>

        {/* Action Buttons - Show Deal button if accepted, otherwise Accept/Ignore */}
        <div className="flex gap-3 pt-4 mt-4 border-t shrink-0">
          {isAccepted ? (
            <button
              onClick={() => navigate('/deal')}
              className="w-full bg-[#D5D5D5] text-[#434343] py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040]"
            >
              Deal
            </button>
          ) : (
            <>
              <button
                onClick={() => handleAccept && handleAccept(selectedRequest._id, professional._id)}
                className="flex-1 bg-[#D8D6F8] text-[#59549F] py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040]"
              >
                <FaCheckCircle /> Accept
              </button>
              <button
                onClick={() =>
                  setShowConfirm &&
                  setShowConfirm({
                    requestId: selectedRequest._id,
                    providerId: professional._id,
                  })
                }
                className="flex-1 bg-[#F8DEDE] text-[#B94444] py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040]"
              >
                <FaTimesCircle /> Ignore
              </button>
            </>
          )}
        </div>

        {/* Confirmation Dialog - Only show if not accepted */}
        {!isAccepted && showConfirm && 
          showConfirm.requestId === selectedRequest._id &&
          showConfirm.providerId === professional._id && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 border w-64 z-50">
              <p className="text-sm text-gray-700 mb-3">
                Are you sure you want to ignore this professional?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleIgnore && handleIgnore(selectedRequest._id, professional._id)}
                  className="flex-1 bg-[#F8DEDE] text-[#B94444] px-3 py-2 rounded-full text-sm shadow-[inset_0_0_12px_#00000040]"
                >
                  Yes
                </button>
                <button
                  onClick={() =>
                    setShowConfirm &&
                    setShowConfirm({
                      requestId: null,
                      providerId: null,
                    })
                  }
                  className="flex-1 bg-white text-[#001032] px-3 py-2 rounded-full text-sm shadow-[inset_0_0_12px_#00000040] border"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
      </div>
    );
  }

  // Show Request Details View (for professionals) - rest remains same
  return (
    <div className="w-full h-full flex flex-col lg:p-4 p-2 bg-white rounded-md">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b shrink-0">
        <h2 className="text-lg font-semibold text-[#001032]">
          Request Details
        </h2>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoMdClose size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Request Details Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border-2 border-gray-300 bg-gray-200"></div>
            <div className="flex-1 min-w-0">
              <h3 className="lg:text-xl text-lg font-bold text-[#001032] truncate">
                {selectedRequest.service}
              </h3>
              {selectedRequest.createdAt && (
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(selectedRequest.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Service Type */}
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Service Type
            </h4>
            <p className="text-sm text-[#001032]">{selectedRequest.service}</p>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Description
            </h4>
            <p className="text-sm text-[#001032] leading-relaxed">
              {selectedRequest.description}
            </p>
          </div>

          {/* Status */}
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Status</h4>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              {selectedRequest.hasShownInterest ? "Interested" : selectedRequest.status === "forwarded" ? "Forwarded" : "Pending"}
            </span>
          </div>

          {/* Request ID */}
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Request ID
            </h4>
            <p className="text-xs text-gray-700 font-mono break-all">
              {selectedRequest._id || selectedRequest.id || "N/A"}
            </p>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pt-4 mt-4 border-t shrink-0">
        {selectedRequest.professionalData ? (() => {
          const professional = selectedRequest.professionalData;
          const isAccepted = selectedRequest.acceptedProvider && 
            (typeof selectedRequest.acceptedProvider === 'string' 
              ? selectedRequest.acceptedProvider === professional._id 
              : selectedRequest.acceptedProvider.toString() === professional._id.toString());
          
          return (
            <>
              <button
                onClick={() => setSelectedRequest && setSelectedRequest({ ...selectedRequest, viewType: 'profile' })}
                className="w-full bg-[#D8D6F8] text-[#59549F] py-2.5 rounded-full text-sm font-medium transition-colors shadow-[inset_0_0_12px_#00000040]"
              >
                View Profile
              </button>
              
              <div className="flex gap-3">
                {isAccepted ? (
                  <button
                    onClick={() => navigate('/deal')}
                    className="w-full bg-[#D5D5D5] text-[#434343] py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040]"
                  >
                    Deal
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleAccept && handleAccept(selectedRequest._id, professional._id)}
                      className="flex-1 bg-[#D8D6F8] text-[#59549F] py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040]"
                    >
                      <FaCheckCircle /> Accept
                    </button>
                    <button
                      onClick={() =>
                        setShowConfirm &&
                        setShowConfirm({
                          requestId: selectedRequest._id,
                          providerId: professional._id,
                        })
                      }
                      className="flex-1 bg-[#F8DEDE] text-[#B94444] py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040]"
                    >
                      <FaTimesCircle /> Ignore
                    </button>
                  </>
                )}
              </div>
            </>
          );
        })() : (
          <div className="flex gap-3">
            <button
              onClick={() => handleInterest && handleInterest(selectedRequest._id)}
              disabled={selectedRequest.hasShownInterest || selectedRequest.isIgnored}
              className={`flex-1 bg-[#F8DEDE] text-[#B94444] py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040] ${
                (selectedRequest.hasShownInterest || selectedRequest.isIgnored) && "opacity-50 cursor-not-allowed"
              }`}
            >
              <FaCheckCircle /> {selectedRequest.hasShownInterest ? "Interested" : "Interest"}
            </button>
            <button
              onClick={() =>
                setShowConfirm &&
                setShowConfirm({
                  requestId: selectedRequest._id,
                  providerId: null,
                })
              }
              disabled={selectedRequest.hasShownInterest || selectedRequest.isIgnored}
              className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040] ${
                selectedRequest.hasShownInterest || selectedRequest.isIgnored
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#D8D6F8] text-[#59549F]"
              }`}
            >
              <FaTimesCircle /> {selectedRequest.isIgnored ? "Ignored" : "Ignore"}
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && 
        showConfirm.requestId === selectedRequest._id && (
          (!selectedRequest.professionalData && showConfirm.providerId === null) || 
          (selectedRequest.professionalData && showConfirm.providerId === (selectedRequest.professionalData._id || selectedRequest.professionalData))
        ) && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 border w-64 z-50">
            <p className="text-sm text-gray-700 mb-3">
              Are you sure you want to ignore this {selectedRequest.professionalData ? 'professional' : 'request'}?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (selectedRequest.professionalData) {
                    handleIgnore && handleIgnore(selectedRequest._id, selectedRequest.professionalData._id || selectedRequest.professionalData);
                  } else {
                    handleIgnore && handleIgnore(selectedRequest._id);
                  }
                }}
                className="flex-1 bg-[#F8DEDE] text-[#B94444] px-3 py-2 rounded-full text-sm shadow-[inset_0_0_12px_#00000040]"
              >
                Yes
              </button>
              <button
                onClick={() =>
                  setShowConfirm &&
                  setShowConfirm({
                    requestId: null,
                    providerId: null,
                  })
                }
                className="flex-1 bg-white text-[#001032] px-3 py-2 rounded-full text-sm shadow-[inset_0_0_12px_#00000040] border"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default RightReceived;