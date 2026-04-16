import React, { useState, useEffect } from "react";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaLinkedin } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import { serverUrl } from "@/App";
import axios from "axios";
import instaIcon from "/instagram.jpeg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const RightAllTab = ({
  selectedRequest,
  setSelectedRequest,
  setRaisedRequests,
  setMobileView,
  handleInterest,
  handleIgnore,
  handleAccept,
  showConfirm,
  setShowConfirm,
  interestSurvey,
  setInterestSurvey,
}) => {
  const [professionalProfile, setProfessionalProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [showFullSkills, setShowFullSkills] = useState(false);
  const [showFullServices, setShowFullServices] = useState(false);
  const [expandedExp, setExpandedExp] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
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

          const profile = res.data.find(p => {
             const pUserId = (p.userId?._id || p.userId)?.toString();
             const targetUserId = (professionalUserId._id || professionalUserId)?.toString();
             return pUserId === targetUserId;
           });
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

  const handleCancelClick = () => {
    if (!selectedRequest) return;
    if (selectedRequest.interestedBy?.length > 0) {
      toast.error("Cannot cancel request that has interested professionals.");
      return;
    }
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = async () => {
    setShowCancelConfirm(false);
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${serverUrl}/requests/${selectedRequest._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Request cancelled successfully");
      
      if (setRaisedRequests) {
        setRaisedRequests(prev => prev.filter(r => r._id !== selectedRequest._id));
      }
      handleClose();
    } catch (error) {
      console.error("Error cancelling request:", error);
      toast.error(error.response?.data?.message || "Failed to cancel request");
    } finally {
      setIsDeleting(false);
    }
  };

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

  // Show Professional Profile View
  if (selectedRequest.viewType === 'profile' && selectedRequest.professionalData) {
    const professional = selectedRequest.professionalData;
    const profile = professionalProfile || {};

    const professionalId = professional._id || professional;
    const interestInfo = selectedRequest.interestDetails?.find(id => 
      String(id.user?._id || id.user) === String(professionalId)
    );

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
      <div className="w-full h-full flex flex-col lg:p-4 p-2 bg-white rounded-md relative overflow-hidden">
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

        {/* Profile Content */}
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
                  {professional.name?.charAt(0) || 'P'}
                </div>
              )}
            </div>

            <div className="mt-4">
              <h2 className="text-gray-900 text-lg font-semibold">
                {profile.name || 
                 professional.name || 
                 (professional.firstName || professional.lastName ? `${professional.firstName || ""} ${professional.lastName || ""}`.trim() : "") ||
                 (profile?.userId?.firstName || profile?.userId?.lastName ? `${profile.userId.firstName || ""} ${profile.userId.lastName || ""}`.trim() : "") ||
                 professional.email || 
                 'Professional'}
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
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[#001032] font-medium">{selectedRequest.service}</p>
                <p className="text-xs text-gray-600 mt-1">{selectedRequest.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Budget: <span className="text-[#001032]">{selectedRequest.budget || 'N/A'}</span></p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  selectedRequest.priority === 'High' ? 'bg-red-100 text-red-700' :
                  selectedRequest.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {selectedRequest.priority || 'Low'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Show Deal button if accepted, otherwise Accept/Ignore */}
        <div className="flex flex-col gap-3 pt-4 border-t shrink-0 relative bg-white">
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
                disabled={professional?.isIgnored || selectedRequest.isIgnored}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040] ${(professional?.isIgnored || selectedRequest.isIgnored) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#D8D6F8] text-[#59549F]"}`}
              >
                <FaCheckCircle /> Accept
              </button>
              <button
                onClick={() =>
                  setShowConfirm &&
                  setShowConfirm({
                    requestId: selectedRequest._id,
                    providerId: professional._id,
                    origin: 'detail',
                  })
                }
                disabled={professional?.isIgnored || selectedRequest.isIgnored}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040] ${(professional?.isIgnored || selectedRequest.isIgnored) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#F8DEDE] text-[#B94444]"}`}
              >
                <FaTimesCircle /> {(professional?.isIgnored || selectedRequest.isIgnored) ? "Ignored" : "Ignore"}
              </button>
            </>
          )}

          {/* Confirmation Tooltip */}
          {showConfirm && 
            showConfirm.requestId === selectedRequest._id && 
            String(showConfirm.providerId) === String(professional._id) && 
            showConfirm.origin === 'detail' && (
              <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.15)] rounded-2xl p-4 border w-64 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#F8DEDE] rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaTimesCircle className="text-[#B94444] text-xl" />
                  </div>
                  <h4 className="text-sm font-bold text-[#001032] mb-1">Confirm Action</h4>
                  <p className="text-xs text-gray-500 mb-4 px-2">
                    Are you sure you want to ignore this professional?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleIgnore && handleIgnore(selectedRequest._id, professional._id)}
                      className="flex-1 bg-[#F8DEDE] text-[#B94444] py-2 rounded-full text-xs font-bold shadow-[inset_0_0_12px_#00000040] hover:bg-[#b94444] hover:text-white transition-all active:scale-95"
                    >
                      Yes, Ignore
                    </button>
                    <button
                      onClick={() =>
                        setShowConfirm &&
                        setShowConfirm({
                          requestId: null,
                          providerId: null,
                          origin: null,
                        })
                      }
                      className="flex-1 bg-gray-50 text-[#001032] py-2 rounded-full text-xs font-bold hover:bg-gray-100 transition-all border shadow-sm active:scale-95"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b rotate-45"></div>
              </div>
            )}
        </div>
      </div>
    );
  }

  const professional = selectedRequest.professionalData;
  const interestInfo = professional ? selectedRequest.interestDetails?.find(id => 
    String(id.user?._id || id.user) === String(professional._id || professional)
  ) : null;

  // Fallback to normal Request Details View
  return (
    <div className="w-full h-full flex flex-col lg:p-4 p-2 bg-white rounded-md relative overflow-hidden">
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

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
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

          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Service Type
            </h4>
            <p className="text-sm text-[#001032]">{selectedRequest.service}</p>
          </div>

          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">
              Description
            </h4>
            <p className="text-sm text-[#001032] leading-relaxed">
              {selectedRequest.description}
            </p>
          </div>

          {/* Application Details (Survey Answers) - Primary View */}
          {interestInfo && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-[11px] font-bold text-gray-500 uppercase mb-2">Availability</h4>
                <p className="text-sm text-[#001032] font-semibold">{interestInfo.startTime || 'Standard'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
                <h4 className="text-[11px] font-bold text-gray-500 uppercase mb-2">Relevance</h4>
                <p className="text-sm text-[#001032] font-semibold">{interestInfo.relevance || 'N/A'}</p>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Status</h4>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                (professional?.isIgnored || selectedRequest.isIgnored) ? "bg-gray-100 text-gray-500" :
                selectedRequest.hasShownInterest
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {(professional?.isIgnored || selectedRequest.isIgnored) ? "Ignored" : selectedRequest.hasShownInterest ? "Interested" : "Pending"}
            </span>
          </div>

          {/* Budget & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">
                Expected Budget
              </h4>
              <p className="text-sm text-[#001032]">
                {selectedRequest.budget || "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 shadow-[inset_0_0_12px_#00000040]">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">
                Timeline
              </h4>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                selectedRequest.priority?.includes('Urgent') ? 'bg-red-100 text-red-700' :
                selectedRequest.priority?.includes('Short term') ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {selectedRequest.priority || "Flexible"}
              </span>
            </div>
          </div>

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
      <div className="flex flex-col gap-3 pt-4 border-t shrink-0 relative bg-white">
        {selectedRequest.professionalData ? (() => {
          const professional = selectedRequest.professionalData;
          const isAccepted = selectedRequest.acceptedProvider && 
            (String(selectedRequest.acceptedProvider._id || selectedRequest.acceptedProvider) === 
             String(professional._id || professional));
          
          return (
            <>
              <button
                onClick={() => setSelectedRequest && setSelectedRequest({ ...selectedRequest, viewType: 'profile' })}
                className="w-full bg-[#D8D6F8] text-[#59549F] py-2.5 rounded-full text-sm font-medium transition-colors shadow-[inset_0_0_12px_#00000040]"
              >
                View Profile
              </button>
              
              <div className="flex gap-3 w-full">
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
                      disabled={professional?.isIgnored || selectedRequest.isIgnored}
                      className={`flex-1 text-center py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040] ${(professional?.isIgnored || selectedRequest.isIgnored) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#D8D6F8] text-[#59549F]"}`}
                    >
                      <FaCheckCircle /> Accept
                    </button>
                    <button
                      onClick={() => {
                        if (isAccepted || professional?.isIgnored || selectedRequest.isIgnored) return;
                        setShowConfirm &&
                        setShowConfirm({
                          requestId: selectedRequest._id,
                          providerId: professional._id,
                          origin: 'detail',
                        });
                      }}
                      disabled={isAccepted || professional?.isIgnored || selectedRequest.isIgnored}
                      className={`flex-1 text-center py-2.5 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-[inset_0_0_12px_#00000040] ${isAccepted || professional?.isIgnored || selectedRequest.isIgnored ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#F8DEDE] text-[#B94444]"}`}
                    >
                      <FaTimesCircle /> {(professional?.isIgnored || selectedRequest.isIgnored) ? "Ignored" : "Ignore"}
                    </button>
                  </>
                )}
              </div>
            </>
          );
        })() : selectedRequest.requestType === "forwarded" ? (
            <div className="flex gap-3 flex-1">
              <button
                onClick={() => {
                  if (selectedRequest.hasShownInterest || selectedRequest.isIgnored) return;
                  setInterestSurvey && setInterestSurvey({
                    requestId: selectedRequest._id,
                    startTime: "Available immediately",
                    relevance: "Highly relevant"
                  });
                }}
                disabled={
                  selectedRequest.hasShownInterest ||
                  selectedRequest.isIgnored
                }
                className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                  selectedRequest.hasShownInterest ||
                  selectedRequest.isIgnored
                    ? "bg-[#F8DEDE] text-[#B94444] cursor-not-allowed opacity-50"
                    : "bg-[#F8DEDE] text-[#B94444]"
                }`}
              >
                <FaCheckCircle />{" "}
                {selectedRequest.hasShownInterest
                  ? "Interested"
                  : "Interest"}
              </button>
              <button
                onClick={() => {
                  if (selectedRequest.hasShownInterest || selectedRequest.isIgnored) return;
                  setShowConfirm &&
                  setShowConfirm({
                    requestId: selectedRequest._id,
                    providerId: null,
                    origin: 'detail',
                  });
                }}
                disabled={
                  selectedRequest.hasShownInterest ||
                  selectedRequest.isIgnored
                }
                className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 shadow-[inset_0_0_12px_#00000040] ${
                  selectedRequest.hasShownInterest ||
                  selectedRequest.isIgnored
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#D8D6F8] text-[#59549F]"
                }`}
              >
                <FaTimesCircle />{" "}
                {selectedRequest.isIgnored ? "Ignored" : "Ignore"}
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <button 
                onClick={handleCancelClick}
                disabled={(selectedRequest.interestedBy?.length > 0) || isDeleting}
                className={`w-full border-2 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-[inset_0_0_12px_#00000040] ${
                  (selectedRequest.interestedBy?.length > 0) || isDeleting
                    ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                    : "border-[#59549F] text-[#59549F] hover:bg-[#59549F] hover:text-white"
                }`}
              >
                {isDeleting ? "Cancelling..." : "Cancel Request"}
              </button>
            </div>
          )}
       {showConfirm && 
        showConfirm.requestId === selectedRequest._id && 
        showConfirm.origin === 'detail' && (
          (!selectedRequest.professionalData && showConfirm.providerId === null) || 
          (selectedRequest.professionalData && 
           String(showConfirm.providerId) === String(selectedRequest.professionalData._id || selectedRequest.professionalData))
        ) && (
          <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.15)] rounded-2xl p-4 border w-64 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#F8DEDE] rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTimesCircle className="text-[#B94444] text-xl" />
              </div>
              <h4 className="text-sm font-bold text-[#001032] mb-1">Confirm Action</h4>
              <p className="text-xs text-gray-500 mb-4 px-2">
                Are you sure you want to ignore this {selectedRequest.professionalData ? 'professional' : 'request'}?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (selectedRequest.professionalData) {
                      const profId = selectedRequest.professionalData._id || selectedRequest.professionalData;
                      handleIgnore && handleIgnore(selectedRequest._id, profId);
                    } else {
                      handleIgnore && handleIgnore(selectedRequest._id);
                    }
                  }}
                  className="flex-1 bg-[#F8DEDE] text-[#B94444] py-2 rounded-full text-xs font-bold shadow-[inset_0_0_12px_#00000040] hover:bg-[#b94444] hover:text-white transition-all active:scale-95"
                >
                  Yes, Ignore
                </button>
                <button
                  onClick={() =>
                    setShowConfirm &&
                    setShowConfirm({
                      requestId: null,
                      providerId: null,
                      origin: null,
                    })
                  }
                  className="flex-1 bg-gray-50 text-[#001032] py-2 rounded-full text-xs font-bold hover:bg-gray-100 transition-all border shadow-sm active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b rotate-45"></div>
          </div>
        )}

      {/* ✅ Interest Survey Survey Popover */}
      {interestSurvey && interestSurvey.requestId === selectedRequest._id && (
        <div className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.15)] rounded-2xl p-4 border w-72 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#001032] border-b pb-2">Interest Details</h4>
            
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">When can you start?</label>
              <select 
                value={interestSurvey.startTime}
                onChange={(e) => setInterestSurvey({...interestSurvey, startTime: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-[#59549F]"
              >
                <option>Available immediately</option>
                <option>Available this week</option>
                <option>Flexible</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">How relevant is your expertise?</label>
              <select 
                value={interestSurvey.relevance}
                onChange={(e) => setInterestSurvey({...interestSurvey, relevance: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-[#59549F]"
              >
                <option>Highly relevant</option>
                <option>Somewhat relevant</option>
                <option>Exploring</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  handleInterest && handleInterest(selectedRequest._id, interestSurvey.startTime, interestSurvey.relevance);
                  setInterestSurvey && setInterestSurvey({ requestId: null, startTime: "", relevance: "" });
                }}
                className="flex-1 bg-[#59549F] text-white py-2 rounded-full text-xs font-bold shadow-md hover:bg-[#48438a] transition-all active:scale-95"
              >
                Confirm Interest
              </button>
              <button
                onClick={() => setInterestSurvey && setInterestSurvey({ requestId: null, startTime: "", relevance: "" })}
                className="bg-gray-100 text-[#001032] px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r border-b rotate-45"></div>
        </div>
      )}
      </div>

      {/* Custom Confirmation Popup (Cancel) */}
      {showCancelConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
          <div className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] rounded-2xl p-6 border w-[85%] max-w-sm text-center transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-[#59549F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#59549F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#001032] mb-2">Cancel Request</h3>
            <p className="text-sm text-gray-600 mb-6 px-2">
              Are you sure you want to cancel this request? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-[#59549F] text-white py-2.5 rounded-full text-sm font-semibold hover:bg-white hover:text-[#59549F] border-[#59549F] border shadow-lg shadow-gray-300 transition-all active:scale-95"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all active:scale-95"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightAllTab;
