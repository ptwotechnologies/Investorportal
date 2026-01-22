import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import profileLogo from "/profile.png";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import { serverUrl } from "@/App";
import axios from "axios";
import { IoIosCamera } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./CropModel";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { statesData } from "./StateCity";
import { IoDiamondOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import instaIcon from "/instagram.jpeg";

const ProfileSec = () => {
  const MAX_PORTFOLIO_IMAGES = 20;

  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    state: "",
    city: "",
    coverImage: "",
    profilePhoto: "",
    socialMedia: {
      // ✅ ADD THIS
      linkedin: "",
      instagram: "",
    },
  });
  const [editSections, setEditSections] = useState({
    header: false,
    aboutAndSkills: false,
    services: false,
    experience: false,
    socialMedia: false,
  });

  const [experienceEdit, setExperienceEdit] = useState({});
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [isExpDescExpanded, setIsExpDescExpanded] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);

  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: {
      startDate: "",
      endDate: "",
      present: false,
    },
    location: "",
    description: [""],
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isCover, setIsCover] = useState(false);

  const [title, setTitle] = useState("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  // Normalize services for display: backend may store as array or string
  const servicesText = profile?.services
    ? Array.isArray(profile.services)
      ? profile.services.join(", ")
      : profile.services
    : "";
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [contactForm, setContactForm] = useState({});

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${serverUrl}/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile({
        ...res.data,
        experience: Array.isArray(res.data.experience)
          ? res.data.experience
          : res.data.experience
            ? [res.data.experience]
            : [
                {
                  title: "",
                  company: "",
                  duration: "",
                  location: "",
                  description: [""],
                },
              ],
      });
      setPortfolioFiles(res.data.portfolio || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const normalizeExperience = (experienceArr) =>
    experienceArr.map((exp) => ({
      ...exp,
      description: Array.isArray(exp.description)
        ? exp.description
        : exp.description
          ? [exp.description]
          : [""],
    }));

  const updateProfileData = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${serverUrl}/profile/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile({
        ...res.data.profile,
        experience: Array.isArray(res.data.profile.experience)
          ? res.data.profile.experience
          : res.data.profile.experience
            ? [res.data.profile.experience]
            : [
                {
                  title: "",
                  company: "",
                  duration: "",
                  location: "",
                  description: [""],
                },
              ],
      });

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    if (portfolioFiles.length >= MAX_PORTFOLIO_IMAGES) {
      alert(`Cannot upload more than ${MAX_PORTFOLIO_IMAGES} images.`);
      setSelectedFile(null);
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(`${serverUrl}/profile/portfolio`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSelectedFile(null);
      await fetchProfile(); // refresh UI
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    }
  };

  const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${serverUrl}/profile/upload/profile-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setProfile((prev) => ({
        ...prev,
        profilePhoto: `${serverUrl}${res.data.profilePhoto}`, // <-- backend URL
      }));
    } catch (err) {
      console.error("Profile photo upload failed", err);
    }
  };

  const uploadCoverPhoto = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${serverUrl}/profile/upload/cover-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setProfile((prev) => ({
        ...prev,
        coverImage: res.data.coverImage,
      }));
    } catch (err) {
      console.error("Cover photo upload failed", err);
    }
  };

  const deleteProfilePhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${serverUrl}/profile/`,
        { profilePhoto: null },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setProfile((prev) => ({ ...prev, profilePhoto: null }));
    } catch (err) {
      console.error(err);
      alert("Profile photo delete failed");
    }
  };

  const deleteCoverPhoto = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${serverUrl}/profile/`,
        { coverImage: null },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setProfile((prev) => ({ ...prev, coverImage: null }));
    } catch (err) {
      console.error(err);
      alert("Cover photo delete failed");
    }
  };

  const exp = profile?.experience?.[0] || {
    title: "",
    company: "",
    duration: "",
    location: "",
    description: [""],
  };

  const getPortfolioUrl = (fileUrl) => {
    if (!fileUrl) return "";
    // If the URL is absolute, return as-is
    if (fileUrl.startsWith("http")) return fileUrl;

    // Normalize Windows backslashes to forward slashes and ensure a leading slash
    let normalized = fileUrl.replace(/\\/g, "/");
    if (!normalized.startsWith("/")) normalized = `/${normalized}`;

    return `${serverUrl}${normalized}`;
  };

  useEffect(() => {
    if (showContactInfo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showContactInfo]);

  const handleDeletePortfolio = async (portfolioId) => {
    try {
      await axios.delete(`${serverUrl}/profile/portfolio/${portfolioId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ UI se bhi remove karo
      setPortfolioFiles((prev) =>
        prev.filter((item) => item._id !== portfolioId),
      );
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (portfolioFiles.length >= MAX_PORTFOLIO_IMAGES) {
      alert(`You can upload maximum ${MAX_PORTFOLIO_IMAGES} images.`);
      return;
    }

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file)); // optional preview
  };

  // Email mask: first 3 characters + *** + domain
  const maskEmail = (email) => {
    if (!email) return "";
    const [user, domain] = email.split("@");
    if (user.length <= 3) return "***@" + domain;
    return user.slice(0, 3) + "***@" + domain;
  };

  // Phone mask: last 4 digits visible, baaki *
  const maskPhone = (phone) => {
    if (!phone) return "";
    const last4 = phone.slice(-4);
    return "*".repeat(phone.length - 4) + last4;
  };

  const safeDescription = Array.isArray(exp.description)
    ? exp.description
    : exp.description
      ? [exp.description]
      : [""];

  useEffect(() => {
    if (showExpModal) {
      // modal open → body scroll disable
      document.body.style.overflow = "hidden";
    } else {
      // modal close → body scroll enable
      document.body.style.overflow = "auto";
    }

    // cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showExpModal]);

  const handleSaveNewExperience = async () => {
    // Blank check
    const isFilled =
      newExperience.title.trim() !== "" ||
      newExperience.company.trim() !== "" ||
      newExperience.duration.trim() !== "" ||
      newExperience.location.trim() !== "" ||
      newExperience.description.some((desc) => desc.trim() !== "");

    if (!isFilled) {
      setShowExpModal(false); // blank → close modal
      return;
    }

    const updatedProfile = {
      ...profile,
      experience: [...profile.experience, newExperience],
    };

    setProfile(updatedProfile); // UI update

    try {
      await updateProfileData(updatedProfile); // ✅ backend update
    } catch (err) {
      console.error("Failed to save experience:", err);
    }

    setShowExpModal(false); // close modal
  };

  const handleSaveSocialMedia = async () => {
    const updatedProfile = {
      ...profile,
      socialMedia: profile.socialMedia,
    };

    setProfile(updatedProfile); // UI safe

    try {
      await updateProfileData(updatedProfile); // ✅ SAME FUNCTION
    } catch (err) {
      console.error("Social media save failed", err);
    }

    setEditSections((prev) => ({
      ...prev,
      socialMedia: false,
    }));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && !profile.name) {
      setProfile((prev) => ({
        ...prev,
        name: `${user.firstName} ${user.lastName}`,
      }));
    }
  }, [profile.name]);

  return (
    <div>
      <div className="hidden lg:block">
        <div
          id="topbar"
          className="flex justify-between items-center  border-2 border-[#D9D9D9] rounded-xl bg-white px-5 m-1 mx-2 p-2"
        >
          <div>
            <p className="font-semibold text-[#001032]">
              Welcome, <span>{profile?.companyName || profile?.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <img
              src={
                profile?.profilePhoto
                  ? `${serverUrl}${profile.profilePhoto}`
                  : "/default-profile.png" // koi default blank image ya avatar
              }
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-[#001032]"
            />
            <p className="text-[#001426] font-semibold">
              Switch to professional
            </p>
          </div>
        </div>
      </div>

      <div
        id="profile"
        className=" lg:border-2 border-[#D9D9D9] lg:rounded-b-xl bg-white  lg:m-2  "
      >
        <section aria-label="Profile header">
          <div
            className="lg:h-50 h-30 bg-card relative px-0 cursor-pointer"
            style={{
              backgroundImage: profile?.coverImage
                ? profile.coverImage.startsWith("blob:")
                  ? `url(${profile.coverImage})`
                  : `url(${serverUrl}${profile.coverImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              setModalImage(
                profile?.coverImage ? `${serverUrl}${profile.coverImage}` : "",
              );
              setIsCover(true); // cover photo
              setIsImageModalOpen(true);
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            {/* Camera Icon */}
            <div className="flex justify-between">
              <IoIosCamera
                size={30}
                className="absolute right-2 top-2 bg-white rounded-full p-1 cursor-pointer z-10"
                onClick={() =>
                  document.getElementById("coverPhotoInput").click()
                }
              />
            </div>
            {/* Hidden Input */}
            <input
              type="file"
              accept="image/*"
              id="coverPhotoInput"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const imageUrl = URL.createObjectURL(file);
                setCoverImageFile(file);
                setImageToCrop(imageUrl); // Cropper ko URL pass karo
                setIsCropModalOpen(true);
                setIsCover(true);
              }}
            />
          </div>

          <div className="border-t-2  border-[#EEECEC] " />
          <div>
            <div className="flex justify-start gap-12 items-center ">
              <div className="lg:w-28 lg:h-14 w-22 h-18 rounded-full relative bottom-12  lg:bottom-16 lg:left-9 left-4">
                {/* Profile Image */}
                <img
                  src={
                    profile?.profilePhoto
                      ? `${serverUrl}${profile.profilePhoto}`
                      : ""
                  }
                  className="lg:w-28 lg:h-28 w-22 h-22 bg-gray-300 border-3 rounded-full object-cover cursor-pointer"
                  onClick={() => {
                    setModalImage(
                      profile?.profilePhoto
                        ? `${serverUrl}${profile.profilePhoto}`
                        : "",
                    );
                    setIsCover(false); // profile photo
                    setIsImageModalOpen(true);
                  }}
                />

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profilePhotoInput"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const imageUrl = URL.createObjectURL(file); // convert to URL
                    setProfileImageFile(file);
                    setImageToCrop(imageUrl); // Cropper ko URL pass karo
                    setIsCropModalOpen(true);
                    setIsCover(false);
                  }}
                />

                {/* Edit Icon */}
                <IoIosCamera
                  size={35}
                  className="absolute bottom-1 border-2 lg:top-16 left-17 lg:left-22 bg-white rounded-full p-1 cursor-pointer"
                  onClick={() =>
                    document.getElementById("profilePhotoInput").click()
                  }
                />
              </div>
              <div className="lg:mb-10">
                <h1 className=" font-medium text-[#001032] text-xl hidden lg:block "></h1>
              </div>
            </div>

            <div className="flex  lg:px-5  lg:p-2  justify-between lg:pl-13 pl-4 relative bottom-6 lg:bottom-3  lg:mb-3 pb-1 lg:pb-0">
              <div className="max-w-full overflow-hidden">
                {editSections.header ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      <input
                        type="text"
                        maxLength={40}
                        value={profile?.name || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="border-2 p-1 rounded-md text-sm"
                        placeholder="Name"
                      />
                    </div>
                    <textarea
                      maxLength={120}
                      value={profile?.bio || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      className="border-2 p-1 rounded-md text-sm "
                      placeholder="Bio"
                    />
                    <div className="flex gap-2">
                      {/* STATE */}
                      <input
                        list="stateList"
                        placeholder="Select State"
                        value={profile.state}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            state: e.target.value,
                            city: "",
                          })
                        }
                        className="border-2 p-1 rounded-md w-1/2 text-sm"
                      />

                      <datalist id="stateList">
                        {Object.keys(statesData).map((state) => (
                          <option key={state} value={state} />
                        ))}
                      </datalist>

                      {/* CITY */}
                      <input
                        list="cityList"
                        placeholder="Select City"
                        value={profile.city}
                        onChange={(e) =>
                          setProfile({ ...profile, city: e.target.value })
                        }
                        className="border-2 p-1 rounded-md w-1/2 text-sm "
                        disabled={!profile.state}
                      />

                      <datalist id="cityList">
                        {profile.state &&
                          statesData[profile.state]?.map((city) => (
                            <option key={city} value={city} />
                          ))}
                      </datalist>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <h1
                        className="font-medium mb-0.5 lg:mb-0 text-xl 
                       max-w-full"
                      >
                        {profile?.name}
                      </h1>
                      <MdOutlineVerifiedUser
                        size={20}
                        className="text-green-700 "
                      />
                    </div>
                    <p
                      className="text-md my-2 lg:my-0 
                        overflow-hidden 
                      "
                    >
                      {profile?.bio}
                    </p>
                    <p className="text-md text-gray-700 flex items-center gap-2 my-1 lg:my-0">
                      {profile.city && profile.state
                        ? `${profile?.city}, ${profile?.state}`
                        : "Location not added"}
                      <button
                        onClick={() => setShowContactInfo(true)}
                        className="text-[#001032] font-medium text-sm underline"
                      >
                        Contact info
                      </button>
                    </p>

                    <button className="text-[#001032] text-sm font-medium">
                      1 Connection
                    </button>
                  </>
                )}
              </div>

              <div className="p-2 lg:p-0">
                <div className="flex items-center relative bottom-12 ">
                  <MdEdit
                    size={20}
                    className="cursor-pointer"
                    onClick={() =>
                      setEditSections((prev) => ({
                        ...prev,
                        header: !prev.header,
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Save button outside the flex container */}
            {editSections.header && (
              <div className="flex justify-end px-2 lg:pl-13 mb-4">
                <button
                  onClick={() => {
                    updateProfileData(profile);
                    setEditSections((prev) => ({ ...prev, header: false }));
                  }}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md h-10 mb-2"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <div
        id="about"
        className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 "
      >
        <div className="flex justify-between items-center mt-2 mb-1">
          <h1 className="text-[#001032] lg:px-9  px-4 font-semibold text-md lg:text-xl">
            About
          </h1>
          <MdEdit
            size={20}
            className="mr-3 lg:mr-0 cursor-pointer"
            onClick={() =>
              setEditSections((prev) => ({
                ...prev,
                aboutAndSkills: !prev.aboutAndSkills,
              }))
            }
          />
        </div>
        <div className="px-4 py-2 leading- text-sm lg:tracking-wider tracking-wide pr-4 lg:pr-0 h-auto">
          {editSections.aboutAndSkills ? (
            <textarea
              maxLength={500}
              value={profile?.about}
              onChange={(e) =>
                setProfile({ ...profile, about: e.target.value })
              }
              className="border-2 rounded-md p-2 w-full"
            />
          ) : (
            <div className="lg:px-5">
              <p
                className={`text-sm dynamic-text transition-all duration-300 
      ${!isAboutExpanded ? "lg:line-clamp-3 line-clamp-4" : ""}
    `}
              >
                {profile?.about}
              </p>

              {/* See more / See less */}
              {profile?.about && profile.about.length > 120 && (
                <button
                  onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                  className="text-[#001032] text-sm font-medium"
                >
                  {isAboutExpanded ? "See less" : "See more"}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col  gap-1  lg:mx-9 mx-4 p-2 lg:px-5 lg:my-6 my-4 border-2 border-[#D9D9D9] rounded-xl  text-[#001032]">
          <div className="flex items-center gap-2 ">
            <IoDiamondOutline size={22} />
            <h1 className=" w-[40%] lg:w-[10%]  text-md mt-1 lg:text-xl font-semibold lg:mt-0 ">
              Top Skills
            </h1>
          </div>
          {editSections.aboutAndSkills ? (
            <input
              type="text"
              maxLength={150}
              value={profile?.topSkills}
              onChange={(e) =>
                setProfile({ ...profile, topSkills: e.target.value })
              }
              className="border-2 rounded-md p-2 w-full"
            />
          ) : (
            <p className="lg:text-sm text-xs leading-4  flex items-center lg:leading-7 lg:w-[90%] pl-8">
              {profile?.topSkills}
            </p>
          )}
        </div>

        {editSections.aboutAndSkills && (
          <div className="flex justify-end px-4 lg:px-0 mb-4 ">
            <button
              onClick={() => {
                updateProfileData(profile);
                setEditSections((prev) => ({ ...prev, aboutAndSkills: false }));
              }}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div
        id="services"
        className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2 my-2 lg:p-2 "
      >
        <div className="flex justify-between items-center mt-3 mb-1">
          <h1 className="text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl">
            Services
          </h1>
          <MdEdit
            size={20}
            className="mr-3 lg:mr-0 cursor-pointer"
            onClick={() =>
              setEditSections((prev) => ({
                ...prev,
                services: !prev.services,
              }))
            }
          />
        </div>
        <div className="lg:pl-9 px-4 lg:py-2 py-1 mb-6 relative">
          {editSections.services ? (
            <textarea
              maxLength={400}
              value={servicesText}
              onChange={(e) =>
                setProfile({ ...profile, services: e.target.value })
              }
              className="border-2 rounded-md p-2 w-full"
            />
          ) : (
            <div className="relative">
              <p
                className={`text-sm font-medium leading-6 lg:leading-7 lg:pr-3 overflow-hidden transition-all duration-300
    ${!isServicesExpanded ? "line-clamp-3 lg:line-clamp-1" : "line-clamp-none"}
  `}
              >
                {servicesText}
              </p>

              {servicesText && servicesText.length > 120 && (
                <button
                  onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  className="text-[#001032] text-sm font-medium cursor-pointer bg-white px-1"
                >
                  {isServicesExpanded ? "See less" : "See more"}
                </button>
              )}
            </div>
          )}
        </div>

        {editSections.services && (
          <div className="flex justify-end px-4 lg:px-0 mb-4 lg:pl-9">
            <button
              onClick={() => {
                // Convert services to array if user edited as string
                const payload = {
                  ...profile,
                  services:
                    typeof profile.services === "string"
                      ? [profile.services]
                      : profile.services,
                };

                updateProfileData(payload);
                setEditSections((prev) => ({ ...prev, services: false }));
              }}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div
        id="experience"
        className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2  my-2"
      >
        <div className="flex justify-between items-center lg:my-6 mt-3 mb-2">
          <h1 className="text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl">
            Experience
          </h1>
          <div className="flex items-center">
            {/* Add Experience Button */}
            <FaPlus
              className="mr-3 cursor-pointer text-xl"
              onClick={() => {
                // agar modal already open hai → kuch mat karo
                if (showExpModal) return;

                // blank form ke saath modal open karo
                setNewExperience({
                  title: "",
                  company: "",
                  duration: {
                    startDate: "",
                    endDate: "",
                    present: false,
                  },
                  location: "",
                  description: [""],
                });

                setShowExpModal(true);
              }}
            />
          </div>
        </div>
        <div className="lg:pl-10 pl-4 pb-5 mt-6">
          {profile.experience &&
            profile.experience.length > 0 &&
            // Sort experiences: Present first, then descending by endDate
            [...profile.experience]
              .sort((a, b) => {
                if (a.duration.present && !b.duration.present) return -1;
                if (!a.duration.present && b.duration.present) return 1;
                const aDate = a.duration.present
                  ? new Date()
                  : new Date(a.duration.endDate);
                const bDate = b.duration.present
                  ? new Date()
                  : new Date(b.duration.endDate);
                return bDate - aDate;
              })
              .slice(0, showAllExperience ? undefined : 3)
              .map((exp, i) => {
                const safeDescription = Array.isArray(exp.description)
                  ? exp.description
                  : exp.description
                    ? [exp.description]
                    : [""];

                return (
                  <div key={i} className="mb-4 border-b pb-3">
                    <div className="flex justify-between items-start">
                      {experienceEdit[i] ? (
                        <div className="w-full">
                          {/* Title */}
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const newExperiences = [...profile.experience];
                              newExperiences[i].title = e.target.value;
                              setProfile({
                                ...profile,
                                experience: newExperiences,
                              });
                            }}
                            className="border-2 p-1 rounded-md mr-3 mb-3 text-sm w-full"
                            placeholder="Title"
                          />

                          {/* Company */}
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const newExperiences = [...profile.experience];
                              newExperiences[i].company = e.target.value;
                              setProfile({
                                ...profile,
                                experience: newExperiences,
                              });
                            }}
                            className="border-2 p-1 rounded-md mr-3 mb-3 text-sm w-full"
                            placeholder="Company"
                          />

                          {/* Start Date */}
                          <div className="relative mb-2">
                            {!exp.duration.startDate && (
                              <span className="absolute left-3 top-2.5 text-gray-400 text-sm pointer-events-none">
                                Start Date
                              </span>
                            )}
                            <input
                              type="month"
                              value={exp.duration.startDate}
                              onChange={(e) => {
                                const newExperiences = [...profile.experience];
                                newExperiences[i].duration.startDate =
                                  e.target.value;
                                setProfile({
                                  ...profile,
                                  experience: newExperiences,
                                });
                              }}
                              className={`border-2 p-2 rounded-md w-full text-sm ${
                                !exp.duration.startDate
                                  ? "text-transparent"
                                  : "text-black"
                              }`}
                            />
                          </div>

                          {/* End Date */}
                          {!exp.duration.present && (
                            <div className="relative mb-2">
                              {!exp.duration.endDate && (
                                <span className="absolute left-3 top-2.5 text-gray-400 text-sm pointer-events-none">
                                  End Date
                                </span>
                              )}
                              <input
                                type="month"
                                value={exp.duration.endDate}
                                onChange={(e) => {
                                  const newExperiences = [
                                    ...profile.experience,
                                  ];
                                  newExperiences[i].duration.endDate =
                                    e.target.value;
                                  setProfile({
                                    ...profile,
                                    experience: newExperiences,
                                  });
                                }}
                                className={`border-2 p-2 rounded-md w-full text-sm ${
                                  !exp.duration.endDate
                                    ? "text-transparent"
                                    : "text-black"
                                }`}
                              />
                            </div>
                          )}

                          {/* Present Checkbox */}
                          <label className="flex items-center gap-2 text-sm mb-3 ml-2">
                            <input
                              type="checkbox"
                              checked={exp.duration.present}
                              onChange={(e) => {
                                const newExperiences = [...profile.experience];
                                newExperiences[i].duration.present =
                                  e.target.checked;
                                if (e.target.checked)
                                  newExperiences[i].duration.endDate = "";
                                setProfile({
                                  ...profile,
                                  experience: newExperiences,
                                });
                              }}
                            />
                            Currently working here
                          </label>

                          {/* Location */}
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => {
                              const newExperiences = [...profile.experience];
                              newExperiences[i].location = e.target.value;
                              setProfile({
                                ...profile,
                                experience: newExperiences,
                              });
                            }}
                            className="border-2 p-2 rounded-md mr-3 mb-3 text-sm w-full"
                            placeholder="Location"
                          />

                          {/* Descriptions */}
                          {safeDescription.map((desc, index) => (
                            <input
                              key={index}
                              value={desc}
                              maxLength={100}
                              onChange={(e) => {
                                const newExperiences = [...profile.experience];
                                newExperiences[i].description[index] =
                                  e.target.value;
                                setProfile({
                                  ...profile,
                                  experience: newExperiences,
                                });
                              }}
                              className="border-2 p-1 rounded-md dynamic-text text-sm mb-2 block w-full"
                              placeholder={`Description ${index + 1}`}
                            />
                          ))}

                          <button
                            type="button"
                            onClick={() => {
                              const newExperiences = [...profile.experience];
                              newExperiences[i].description.push("");
                              setProfile({
                                ...profile,
                                experience: newExperiences,
                              });
                            }}
                            className="text-blue-500 text-sm font-medium mt-1"
                          >
                            + Add Description
                          </button>
                        </div>
                      ) : (
                        <div className="w-full">
                          <h1 className="font-semibold pt-1 text-md lg:text-xl">
                            {exp.title}
                          </h1>
                          <p className="text-sm font-medium">{exp.company}</p>
                          <p className="text-sm">
                            {exp.duration?.startDate} –{" "}
                            {exp.duration?.present
                              ? "Present"
                              : exp.duration?.endDate}
                          </p>
                          <p className="text-sm">{exp.location}</p>

                          <div className="relative mt-2">
                            <div
                              className={`text-sm transition-all duration-300 overflow-hidden w-[90%] lg:w-[50%] ${!isExpDescExpanded ? "line-clamp-1" : ""}`}
                            >
                              {(isExpDescExpanded
                                ? safeDescription
                                : safeDescription.slice(0, 1)
                              ).map((desc, index) => (
                                <div key={index} className="flex">
                                  <span className="mr-1">•</span>
                                  <span>{desc}</span>
                                </div>
                              ))}
                            </div>

                            {safeDescription.length > 1 && (
                              <button
                                onClick={() =>
                                  setIsExpDescExpanded(!isExpDescExpanded)
                                }
                                className="text-[#001032] text-sm font-medium mt-1"
                              >
                                {isExpDescExpanded ? "See less" : "See more"}
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Edit icon */}
                      <MdEdit
                        size={20}
                        className="mr-3 cursor-pointer mx-4"
                        onClick={() =>
                          setExperienceEdit((prev) => ({
                            ...prev,
                            [i]: !prev[i],
                          }))
                        }
                      />
                    </div>
                  </div>
                );
              })}

          {/* View More / View Less */}
          {profile.experience && profile.experience.length > 3 && (
            <button
              onClick={() => setShowAllExperience(!showAllExperience)}
              className="text-blue-500 text-sm font-medium mt-2"
            >
              {showAllExperience
                ? "View Less"
                : `View ${profile.experience.length - 3} more`}
            </button>
          )}
        </div>

        {Object.values(experienceEdit).some((v) => v) && (
          <div className="flex justify-end px-4 mb-4 lg:px-0">
            <button
              onClick={async () => {
                // Remove blank experiences
                const filteredExp = profile.experience.filter((exp) => {
                  return (
                    exp.title.trim() !== "" ||
                    exp.company.trim() !== "" ||
                    exp.duration.trim() !== "" ||
                    exp.location.trim() !== "" ||
                    (Array.isArray(exp.description) &&
                      exp.description.some((desc) => desc.trim() !== ""))
                  );
                });

                const updatedProfile = { ...profile, experience: filteredExp };

                // Update state
                setProfile(updatedProfile);

                try {
                  // Save to backend
                  await updateProfileData(updatedProfile);
                } catch (err) {
                  console.error("Failed to save experiences:", err);
                }

                // Close edit mode
                setExperienceEdit({});
              }}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div
        id="portfolio"
        className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2 lg:p-2 my-2"
      >
        <div className="flex justify-between items-center my-3">
          <h1 className="text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl">
            Portfolio
          </h1>
          <div
            className="mr-2 p-2  rounded-md shrink-0 snap-center flex items-center justify-center cursor-pointer hover:bg-gray-100"
            onClick={() =>
              document.getElementById("portfolioUploadMobile").click()
            }
          >
            <input
              type="file"
              id="portfolioUploadMobile"
              accept="image/*"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <p className=" text-xl font-semibold">
              <FaPlus />
            </p>
          </div>
        </div>

        {/* ===== Desktop View ===== */}
        <div className="hidden lg:block">
          <div className="flex flex-wrap lg:pl-9 pl-4 gap-4 mb-4">
            {/* Upload Card */}

            {/* Existing Images */}
            {portfolioFiles.map((item, idx) => {
              if (!item?.fileUrl) return null;

              return (
                <div
                  key={idx}
                  className="relative group w-48 h-48 border-2 border-[#D9D9D9] rounded-md overflow-hidden"
                >
                  {/* ❌ Delete icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleDeletePortfolio(item._id);
                    }}
                    className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-1
        opacity-0 group-hover:opacity-100 transition"
                  >
                    <FiX size={18} />
                  </button>

                  {/* Image */}
                  <a
                    href={getPortfolioUrl(item.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={getPortfolioUrl(item.fileUrl)}
                      alt="Portfolio"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </a>
                </div>
              );
            })}
            {/* <div
              className="w-48 h-48 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100"
              onClick={() =>
                document.getElementById("portfolioUploadDesktop").click()
              }
            >
              <input
                type="file"
                id="portfolioUploadDesktop"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <p className="text-gray-400 text-xl font-semibold">+ Upload</p>
            </div> */}
          </div>
        </div>

        {/* ===== Mobile View ===== */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pl-4 mb-4">
            {portfolioFiles.map((item, idx) => (
              <div
                key={idx}
                className="relative w-[40%] h-40 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center"
              >
                {/* ❌ Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeletePortfolio(item._id);
                  }}
                  className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-1"
                >
                  <FiX size={16} />
                </button>

                <a
                  href={getPortfolioUrl(item.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={getPortfolioUrl(item.fileUrl)}
                    alt="Portfolio"
                    className="w-full h-full object-cover rounded-md"
                  />
                </a>
              </div>
            ))}

            {/* Upload Card Mobile */}
          </div>
        </div>

        {/* Upload Button */}
        {selectedFile && (
          <div className="flex justify-end px-4 mb-4">
            <button
              onClick={handleUpload}
              disabled={portfolioFiles.length >= MAX_PORTFOLIO_IMAGES}
              className={`bg-blue-500 text-white px-4 py-1 rounded-md ${
                portfolioFiles.length >= MAX_PORTFOLIO_IMAGES
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Upload
            </button>
          </div>
        )}
      </div>

      <div
        id="social-media"
        className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2 lg:p-2 mb-4"
      >
        <div className="flex justify-between items-center my-3">
          <h1 className="text-[#001032] lg:px-9 px-4 font-semibold text-md lg:text-xl">
            Social Media
          </h1>

          <MdEdit
            size={20}
            className="mr-3 lg:mr-0 cursor-pointer"
            onClick={() =>
              setEditSections((prev) => ({
                ...prev,
                socialMedia: !prev.socialMedia,
              }))
            }
          />
        </div>
        <div className="lg:pl-9 pl-4 py-2 mb-3 flex flex-col gap-2 lg:pr-30 pr-5">
          {editSections.socialMedia ? (
            /* 🟢 EDIT MODE → inputs enabled */
            <>
              <input
                placeholder="LinkedIn Profile URL"
                value={profile?.socialMedia?.linkedin || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialMedia: {
                      ...profile?.socialMedia,
                      linkedin: e.target.value,
                    },
                  })
                }
                className="border-2 rounded-md p-2"
              />

              <input
                placeholder="Instagram Profile URL"
                value={profile?.socialMedia?.instagram || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialMedia: {
                      ...profile?.socialMedia,
                      instagram: e.target.value,
                    },
                  })
                }
                className="border-2 rounded-md p-2"
              />
            </>
          ) : profile?.socialMedia?.linkedin ||
            profile?.socialMedia?.instagram ? (
            /* 🔵 VIEW MODE (data exists) → icons */
            <>
              {profile?.socialMedia?.linkedin && (
                <a
                  href={profile.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600"
                >
                  <FaLinkedin size={20} /> LinkedIn
                </a>
              )}

              {profile?.socialMedia?.instagram && (
                <a
                  href={profile.socialMedia.instagram}
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
            /* ⚪ VIEW MODE (no data yet) → disabled inputs */
            <>
              <input
                placeholder="LinkedIn Profile URL"
                disabled
                className="border-2 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
              <input
                placeholder="Instagram Profile URL"
                disabled
                className="border-2 rounded-md p-2 bg-gray-100 cursor-not-allowed"
              />
            </>
          )}
        </div>

        {/* Save button only in edit mode */}
        {editSections.socialMedia && (
          <div className="flex justify-end px-4 mb-4 lg:px-0">
            <button
              onClick={handleSaveSocialMedia}
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex flex-col justify-center items-center z-50 ">
          <img
            src={modalImage}
            className="max-h-[80%] max-w-[80%] object-contain mb-4"
          />
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                isCover ? deleteCoverPhoto() : deleteProfilePhoto();
                setIsImageModalOpen(false);
              }}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => {
                document
                  .getElementById(
                    isCover ? "coverPhotoInput" : "profilePhotoInput",
                  )
                  .click();
                setIsImageModalOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={() => setIsImageModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isCropModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50 p-4">
          <div className="bg-white p-4 rounded-lg w-full max-w-lg">
            <div className="relative w-full h-96 bg-gray-200">
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={isCover ? 16 / 9 : 1} // cover photo ya profile photo
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(croppedArea, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
              />
            </div>

            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full my-4"
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setIsCropModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={async () => {
                  try {
                    const croppedImage = await getCroppedImg(
                      imageToCrop,
                      croppedAreaPixels,
                    );
                    if (isCover) {
                      await uploadCoverPhoto(croppedImage);
                    } else {
                      await uploadProfilePhoto(croppedImage);
                    }
                    setIsCropModalOpen(false);
                    // Show the updated image immediately
                    fetchProfile(); // agar tumhare state me update nahi ho raha
                  } catch (err) {
                    console.error("Crop save failed:", err);
                    alert("Failed to save cropped image");
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showContactInfo && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <button
                className="text-black font-bold"
                onClick={() => setShowContactInfo(false)}
              >
                ✕
              </button>
            </div>
            <hr className="border-t w-full" />

            <div className="flex justify-between items-center  my-3">
              <h2 className="text-xl ">Contact Info</h2>
              <MdEdit
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  setIsContactEdit(true);
                  setContactForm({
                    email: profile?.email || "",
                    phone: profile?.phone || "",
                    address: profile?.address || "",
                    linkedin: profile?.socialMedia?.linkedin || "",
                    instagram: profile?.socialMedia?.instagram || "",
                  });
                }}
              />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-6">
                <MdEmail size={20} className="mt-1" />
                <div>
                  <h1 className="text-lg  ">Email</h1>
                  {isContactEdit ? (
                    <input
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-blue-600">
                      {profile?.email ? maskEmail(profile.email) : "Not added"}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div>
                  <FaPhoneAlt size={20} className="mt-1" />
                </div>
                <div>
                  <h1 className="text-lg  ">Phone</h1>
                  {isContactEdit ? (
                    <input
                      value={contactForm.phone}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          phone: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-blue-600">
                      {profile?.phone ? maskPhone(profile.phone) : "Not added"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isContactEdit && (
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsContactEdit(false)}
                  className="px-4 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await updateProfileData({
                      address: contactForm.address,
                      socialMedia: {
                        linkedin: contactForm.linkedin,
                        instagram: contactForm.instagram,
                      },
                    });

                    setProfile((prev) => ({
                      ...prev,
                      address: contactForm.address,
                      phone: contactForm.phone,
                      socialMedia: {
                        ...prev.socialMedia,
                        linkedin: contactForm.linkedin,
                        instagram: contactForm.instagram,
                      },
                    }));

                    setIsContactEdit(false);
                  }}
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showExpModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[95%] max-w-lg p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-[#001032] mb-4">
              Add Experience
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={newExperience.title}
              onChange={(e) =>
                setNewExperience({ ...newExperience, title: e.target.value })
              }
              className="border-2 p-2 rounded-md w-full mb-3"
            />

            <input
              type="text"
              placeholder="Company"
              value={newExperience.company}
              onChange={(e) =>
                setNewExperience({ ...newExperience, company: e.target.value })
              }
              className="border-2 p-2 rounded-md w-full mb-3"
            />

            {/* Start Date */}
            <div className="relative mb-3">
              {!newExperience.duration.startDate && (
                <span className="absolute left-3 top-2.5 text-gray-400 text-sm pointer-events-none">
                  Start Date
                </span>
              )}
              <input
                type="month"
                value={newExperience.duration.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    duration: {
                      ...newExperience.duration,
                      startDate: e.target.value,
                    },
                  })
                }
                className={`border-2 p-2 rounded-md w-full 
    ${!newExperience.duration.startDate ? "text-transparent" : "text-black"}
  `}
              />
            </div>

            {/* End Date */}
            {!newExperience.duration.present && (
              <div className="relative mb-3">
                {!newExperience.duration.endDate && (
                  <span className="absolute left-3 top-2.5 text-gray-400 text-sm pointer-events-none">
                    End Date
                  </span>
                )}
                <input
                  type="month"
                  value={newExperience.duration.endDate}
                  onChange={(e) =>
                    setNewExperience({
                      ...newExperience,
                      duration: {
                        ...newExperience.duration,
                        endDate: e.target.value,
                      },
                    })
                  }
                  className={`border-2 p-2 rounded-md w-full 
        ${!newExperience.duration.endDate ? "text-transparent" : "text-black"}
      `}
                />
              </div>
            )}

            {/* Present Checkbox */}
            <label className="flex items-center gap-2 text-sm mb-4 ml-2">
              <input
                type="checkbox"
                checked={newExperience.duration.present}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    duration: {
                      ...newExperience.duration,
                      present: e.target.checked,
                      endDate: e.target.checked
                        ? ""
                        : newExperience.duration.endDate,
                    },
                  })
                }
              />
              Currently working here
            </label>

            <input
              type="text"
              placeholder="Location"
              value={newExperience.location}
              onChange={(e) =>
                setNewExperience({ ...newExperience, location: e.target.value })
              }
              className="border-2 p-2 rounded-md w-full mb-3"
            />

            {newExperience.description.map((desc, index) => (
              <input
                key={index}
                value={desc}
                placeholder={`Description ${index + 1}`}
                onChange={(e) => {
                  const updatedDesc = [...newExperience.description];
                  updatedDesc[index] = e.target.value;
                  setNewExperience({
                    ...newExperience,
                    description: updatedDesc,
                  });
                }}
                className="border-2 p-2 rounded-md w-full mb-2"
              />
            ))}

            <button
              onClick={() =>
                setNewExperience({
                  ...newExperience,
                  description: [...newExperience.description, ""],
                })
              }
              className="text-blue-500 text-sm mb-4"
            >
              + Add Description
            </button>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowExpModal(false)}
                className="px-4 py-1 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveNewExperience}
                className="bg-blue-500 text-white px-4 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSec;
