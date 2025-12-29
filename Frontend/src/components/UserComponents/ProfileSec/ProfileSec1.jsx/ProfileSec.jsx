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

const ProfileSec = () => {
  const [profile, setProfile] = useState(null);
  const [editSections, setEditSections] = useState({
    header: false,
    aboutAndSkills: false,
    services: false,
    experience: false,
    socialMedia: false,
  });
  const [portfolioFiles, setPortfolioFiles] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
const [isAboutExpanded, setIsAboutExpanded] = useState(false);
const [isServicesExpanded, setIsServicesExpanded] = useState(false);
const [isExpDescExpanded, setIsExpDescExpanded] = useState(false);

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
      ? profile.services.join(', ')
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
        experience: res.data.experience ?? {
          title: "",
          company: "",
          duration: "",
          location: "",
          description: "",
        },
      });
      setPortfolioFiles(res.data.portfolio || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfileData = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${serverUrl}/profile/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile({
        ...res.data.profile,
        experience: res.data.profile.experience || {
          title: "",
          company: "",
          duration: "",
          location: "",
          description: "",
        },
        topSkills: res.data.profile.topSkills || "",
        services: res.data.profile.services || "",
        socialMedia: res.data.profile.socialMedia || {},
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

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post(`${serverUrl}/profile/portfolio`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Backend se return hui file info ko portfolioFiles me add karo
      setPortfolioFiles((prev) => [...prev, res.data]);
      setSelectedFile(null); // file select clear
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
        }
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
        }
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
        }
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
        }
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
    description: "",
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

  


  return (
    <div>
      <div className="hidden lg:block">
        <div
          id="topbar"
          className="flex justify-between items-center  border-2 border-[#D9D9D9] rounded-xl bg-white px-5 m-1 mx-2 p-2"
        >
          <div>
            <p className="font-semibold text-[#001032]">
              Welcome, Startup India Pvt. Ltd.
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <CgProfile className="text-gray-500 " size={25} />
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
                profile?.coverImage ? `${serverUrl}${profile.coverImage}` : ""
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
                        : ""
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
              <div>
                {editSections.header ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      <input
                        type="text"
                        value={profile?.name || ""}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="border-2 p-1 rounded-md"
                        placeholder="Name"
                      />
                    </div>
                    <textarea
                      value={profile?.bio || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      className="border-2 p-1 rounded-md  "
                      placeholder="Bio"
                    />
                    <input
                      type="text"
                      value={profile?.address || ""}
                      onChange={(e) =>
                        setProfile({ ...profile, address: e.target.value })
                      }
                      className="border-2 p-1 rounded-md"
                      placeholder="Address"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <h1 className="font-medium mb-0.5 text-xl">
                        {profile?.name}
                      </h1>
                      <MdOutlineVerifiedUser
                        size={20}
                        className="text-green-700 "
                      />
                    </div>
                    <p className=" text-md">{profile?.bio}</p>
                    <p className="text-md text-gray-700 flex items-center gap-2">
                      {profile?.address}
                      <button
                        onClick={() => setShowContactInfo(true)}
                        className="text-blue-600 font-medium text-sm hover:underline"
                      >
                        Contact info
                      </button>
                    </p>
                  </>
                )}
              </div>

              <div className="p-2 lg:p-0">
                <div className="flex items-center ">
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
              <div className="flex justify-end px-4 lg:pl-13 mb-4">
                <button
                  onClick={() => {
                    updateProfileData(profile);
                    setEditSections((prev) => ({ ...prev, header: false }));
                  }}
                  className="bg-blue-500 text-white px-4 py-1 rounded-md h-10"
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
        <div className="px-4 py-2 leading-11 lg:tracking-wider tracking-wide pr-4 lg:pr-0 h-auto">
          {editSections.aboutAndSkills ? (
            <textarea
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
      className="text-blue-600 text-sm font-medium"
    >
      {isAboutExpanded ? "See less" : "See more"}
    </button>
  )}
</div>

          )}
        </div>

        <div className="flex items-center justify-between gap-1  lg:mx-9 mx-4 p-2 lg:px-5 lg:my-6 my-4 border-2 border-[#D9D9D9] rounded-xl  text-[#001032]">
          <h1 className=" w-[40%] lg:w-[10%] lg:text-md text-sm mt-1 lg:text-md lg:mt-0 ">
            Top Skills
          </h1>
          {editSections.aboutAndSkills ? (
            <input
              type="text"
              value={profile?.topSkills}
              onChange={(e) =>
                setProfile({ ...profile, topSkills: e.target.value })
              }
              className="border-2 rounded-md p-2 w-full"
            />
          ) : (
            <p className="lg:text-sm text-xs leading-4  flex items-center lg:leading-7 lg:w-[90%]">
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
    className="text-blue-600 text-sm font-medium cursor-pointer bg-white px-1"
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
          <MdEdit
            size={20}
            className="mr-3 lg:mr-0 cursor-pointer"
            onClick={() =>
              setEditSections((prev) => ({
                ...prev,
                experience: !prev.experience,
              }))
            }
          />
        </div>
        <div className="  lg:pl-10 pl-3 pb-5">
          {editSections.experience ? (
            <div className="">
              <input
                type="text"
                value={exp.title}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    experience: [{ ...exp, title: e.target.value }],
                  })
                }
                className="border-2 p-1 rounded-md mr-3"
                placeholder="Title"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    experience: [{ ...exp, company: e.target.value }],
                  })
                }
                className="border-2 p-1 rounded-md mr-3"
                placeholder="Company"
              />
              <input
                type="text"
                value={exp.duration}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    experience: [{ ...exp, duration: e.target.value }],
                  })
                }
                className="border-2 p-1 rounded-md mr-3"
                placeholder="Duration"
              />
              <input
                type="text"
                value={exp.location}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    experience: [{ ...exp, location: e.target.value }],
                  })
                }
                className="border-2 p-1 rounded-md mr-3"
                placeholder="Location"
              />
              <input
                value={exp.description}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    experience: [{ ...exp, description: e.target.value }],
                  })
                }
                className="border-2 p-1  rounded-md dynamic-text"
                placeholder="Description"
              />
            </div>
          ) : (
            <>
              <h1 className="font-semibold pt-1 text-md lg:text-xl">
                {exp.title}
              </h1>
              <p className="text-sm lg:pt-4 pt-2 font-medium">{exp.company}</p>
              <p className="text-sm ">{exp.duration}</p>
              <p className="text-sm ">{exp.location}</p>
              <div className="relative mt-2">
  <p
    className={`text-sm  transition-all duration-300 overflow-hidden w-[90%] lg:w-[50%]
      ${!isExpDescExpanded ? "line-clamp-1" : "line-clamp-none"}
    `}
  >
    {exp.description}
  </p>

  {exp.description && exp.description.length > 50 && (
    <button
      onClick={() => setIsExpDescExpanded(!isExpDescExpanded)}
      className="text-blue-600 text-sm font-medium mt-1"
    >
      {isExpDescExpanded ? "See less" : "See more"}
    </button>
  )}
</div>

            </>
          )}
        </div>
        {editSections.experience && (
          <div className="flex justify-end px-4 mb-4 lg:px-0">
            <button
              onClick={() => {
                updateProfileData(profile);
                setEditSections((prev) => ({ ...prev, experience: false }));
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
  </div>

  {/* ===== Desktop View ===== */}
  <div className="hidden lg:block">
    <div className="flex flex-wrap lg:pl-9 pl-4 gap-4 mb-4">
      
      {/* Upload Card */}
      <div
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
      </div>

      {/* Existing Images */}
      {portfolioFiles.map((item, idx) => {
        if (!item?.fileUrl) return null;

        return (
          <div
            key={idx}
            className="w-48 h-48 border-2 border-[#D9D9D9] rounded-md overflow-hidden"
          >
            <a
              href={getPortfolioUrl(item.fileUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={getPortfolioUrl(item.fileUrl)}
                alt="Portfolio"
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </a>
          </div>
        );
      })}
    </div>
  </div>

  {/* ===== Mobile View ===== */}
  <div className="lg:hidden">
    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pl-4 mb-4">
      
      {portfolioFiles.map((item, idx) => (
        <div
          key={idx}
          className="w-[40%] h-40 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center"
        >
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
      <div
        className="w-[40%] h-40 border-2 border-dashed rounded-md shrink-0 snap-center flex items-center justify-center cursor-pointer hover:bg-gray-100"
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
        <p className="text-gray-400 text-xl font-semibold">+ Upload</p>
      </div>
    </div>
  </div>

  {/* Upload Button */}
  {selectedFile && (
    <div className="flex justify-end px-4 mb-4">
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-1 rounded-md"
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
    {/* Only show inputs when edit mode is active */}
    {editSections.socialMedia ? (
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
    ) : (
      // Show icons only in view mode (after save)
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
            <FaInstagram size={18} /> Instagram
          </a>
        )}
      </>
    )}
  </div>

  {/* Save button only in edit mode */}
  {editSections.socialMedia && (
    <div className="flex justify-end px-4 mb-4 lg:px-0">
      <button
        onClick={() => setEditSections((prev) => ({ ...prev, socialMedia: false }))}
        className="bg-blue-500 text-white px-4 py-1 rounded-md"
      >
        Save
      </button>
    </div>
  )}
</div>


      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
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
                    isCover ? "coverPhotoInput" : "profilePhotoInput"
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
                      croppedAreaPixels
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
                      {profile?.email || "Not added"}
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
                      {profile?.phone || "Not added"}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div>
                  <MdLocationOn size={20} className="mt-1" />
                </div>
                <div>
                  <h1 className="text-lg  ">Address</h1>
                  {isContactEdit ? (
                    <input
                      value={contactForm.address}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          address: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-blue-600">
                      {profile?.address || "Not added"}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div>
                  <FaLinkedin size={20} className="mt-1" />
                </div>
                <p>
                  <h1 className="text-lg  ">LinkedIn</h1>{" "}
                  {isContactEdit ? (
                    <input
                      value={contactForm.linkedin}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          linkedin: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : profile?.socialMedia?.linkedin ? (
                    <a
                      href={profile.socialMedia.linkedin}
                      target="_blank"
                      className="text-blue-600"
                    >
                      View Profile
                    </a>
                  ) : (
                    "Not added"
                  )}
                </p>
              </div>

              <div className="flex items-start gap-6">
                <div>
                  <AiFillInstagram size={20} className="mt-1" />
                </div>
                <p>
                  <h1 className="text-lg  ">Instagram</h1>{" "}
                  {isContactEdit ? (
                    <input
                      value={contactForm.instagram}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          instagram: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : profile?.socialMedia?.instagram ? (
                    <a
                      href={profile.socialMedia.instagram}
                      target="_blank"
                      className="text-blue-600"
                    >
                      View Profile
                    </a>
                  ) : (
                    "Not added"
                  )}
                </p>
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
    </div>
  );
};

export default ProfileSec;
