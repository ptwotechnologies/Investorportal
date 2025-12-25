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

const ProfileSec = () => {
  const [profile, setProfile] = useState(null);
  const [editSections, setEditSections] = useState({
    header: false,
    aboutAndSkills: false,
    services: false,
    experience: false,
    socialMedia: false,
  });
  const [portfolioFiles, setPortfolioFiles] = useState(
    profile?.portfolio || []
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isCover, setIsCover] = useState(false);

  const [title, setTitle] = useState("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
const [zoom, setZoom] = useState(1);
const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
const [imageToCrop, setImageToCrop] = useState(null);
const [isCropModalOpen, setIsCropModalOpen] = useState(false);


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
                className="absolute right-2 top-2 bg-white rounded-full p-1 cursor-pointer"
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
  setImageToCrop(imageUrl);      // Cropper ko URL pass karo
  setIsCropModalOpen(true);
  setIsCover(true);
}}


            />
          </div>

          <div className="border-t-2  border-[#EEECEC] " />
          <div>
            <div className="flex justify-start gap-12 items-center ">
              <div className="lg:w-28 lg:h-28 w-22 h-22 rounded-full border-2 relative bottom-12 bg-white lg:left-9 left-4">
                {/* Profile Image */}
                <img
                  src={
                    profile?.profilePhoto
                      ? `${serverUrl}${profile.profilePhoto}`
                      : ""
                  }
                  className="lg:w-28 lg:h-28 w-22 h-22 rounded-full object-cover cursor-pointer"
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
  setImageToCrop(imageUrl);      // Cropper ko URL pass karo
  setIsCropModalOpen(true);
  setIsCover(false);
}}


                />

                {/* Edit Icon */}
                <IoIosCamera
                  size={35}
                  className="absolute bottom-1 left-17 lg:left-20 bg-white rounded-full p-1 cursor-pointer"
                  onClick={() =>
                    document.getElementById("profilePhotoInput").click()
                  }
                />
              </div>
              <div className="lg:mb-10">
                <h1 className=" font-medium text-[#001032] text-xl hidden lg:block ">
                  {profile?.role}{" "}
                </h1>
              </div>
            </div>

            <div className="flex  lg:px-5  lg:p-2  justify-between lg:pl-13 pl-4 relative bottom-6 lg:bottom-3  lg:mb-3 pb-1 lg:pb-0">
  <div>
    {editSections.header ? (
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={profile?.name || ""}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
          className="border-2 p-1 rounded-md"
          placeholder="Name"
        />
        <textarea
          value={profile?.bio || ""}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
          className="border-2 p-1 rounded-md "
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
        <h1 className="font-medium mb-1 text-md lg:text-xl">
          {profile?.name}
        </h1>
        <p className="lg:w-[70%] w-[70%] text-sm">{profile?.bio}</p>
        <p className="text-sm">{profile?.address}</p>
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
        setEditSections((prev) => ({ ...prev, header: false }))
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
            <p className="text-sm dynamic-text lg:px-5">{profile?.about}</p>
          )}
        </div>

        <div className="flex items-center justify-between  lg:mx-9 mx-4 p-2 lg:px-5 lg:my-6 my-4 border-2 border-[#D9D9D9] rounded-xl font-medium text-[#001032]">
          <h1 className=" w-[40%] lg:w-[10%] text-md mt-1 lg:text-md lg:mt-0 ">
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
            <p className="text-sm leading-5  flex items-center lg:leading-7 dynamic-text lg:w-[90%]">
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
        <div className="lg:pl-9 px-4 lg:py-2 py-1 leading-8 lg:leading-11 lg:tracking-wider tracking-wide mb-6">
          {editSections.services ? (
            <textarea
              value={profile?.services}
              onChange={(e) =>
                setProfile({ ...profile, services: e.target.value })
              }
              className="border-2 rounded-md p-2 w-full"
            />
          ) : (
            <p className="text-sm font-medium leading-6 lg:leading-7 lg:pr-3 dynamic-text">
              {profile?.services}
            </p>
          )}
        </div>
        {editSections.services && (
  <div className="flex justify-end px-4 lg:px-0 mb-4 lg:pl-9">
    <button
      onClick={() => {
        updateProfileData(profile);
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
        <div className="  lg:pl-10 pl-3">
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
              <p className="text-sm font-medium">{exp.duration}</p>
              <p className="text-sm font-medium">{exp.location}</p>
              <p className="flex text-sm lg:pt-8 pt-4 font-medium pr-4 dynamic-text">
                <LuDot size={25} />
                {exp.description}
              </p>
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

        {/* Desktop view */}
        <div className="hidden lg:block">
          <div className="flex flex-wrap lg:pl-9 pl-4 gap-4 mb-4">
            {/* Upload card */}
            <div className="w-50 h-50 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <input
                type="file"
                id="portfolioUploadDesktop"
                accept=".pdf,.jpg,.png"
                className="hidden"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  // Preview ke liye temporary add kar do
                  setPortfolioFiles((prev) => [
                    ...prev,
                    { fileUrl: URL.createObjectURL(e.target.files[0]) },
                  ]);
                }}
              />
              <p
                onClick={() =>
                  document.getElementById("portfolioUploadDesktop").click()
                }
                className="text-gray-400 text-xl font-semibold"
              >
                + Upload
              </p>
            </div>

            {/* Existing portfolio files */}
            {portfolioFiles.map((item, idx) => (
              <div
                key={idx}
                className="w-50 h-50 border-2 border-[#D9D9D9] rounded-md overflow-hidden cursor-pointer"
              >
                <a
                  href={item?.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item?.fileUrl}
                    alt="Portfolio"
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pl-4 mb-4">
            {/* Existing files */}
            {portfolioFiles.map((item, idx) => (
              <div
                key={idx}
                className="w-[40%] h-40 border-2 border-[#D9D9D9] rounded-md shrink-0 snap-center cursor-pointer"
              >
                <a
                  href={item?.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item?.fileUrl}
                    alt="Portfolio"
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            ))}

            {/* Upload card for mobile */}
            <div
              className="w-[40%] h-40 border-2 border-dashed rounded-md shrink-0 snap-center flex items-center justify-center cursor-pointer hover:bg-gray-100"
              onClick={() =>
                document.getElementById("portfolioUploadMobile").click()
              }
            >
              <input
                type="file"
                id="portfolioUploadMobile"
                accept=".pdf,.jpg,.png"
                className="hidden"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                  setPortfolioFiles((prev) => [
                    ...prev,
                    { fileUrl: URL.createObjectURL(e.target.files[0]) },
                  ]);
                }}
              />
              <p className="text-gray-400 text-xl font-semibold">+ Upload</p>
            </div>
          </div>
        </div>

        {/* Upload button below both views */}
        {selectedFile && (
          <div className="flex justify-end px-4 mb-4">
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Upload
            </button>
          </div>
        )}
      </div>

      <div
        id="social media"
        className="lg:border-2 border border-[#D9D9D9] rounded-xl bg-white lg:px-5 lg:m-2  lg:p-2 mb-4"
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
          <input
            placeholder="LinkedIn Profile URL"
            disabled={!editSections.socialMedia}
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
            className={`border-2 rounded-md p-2 transition
      ${
        editSections.socialMedia
          ? "border-[#D9D9D9] bg-white text-black"
          : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
          />

          <input
            placeholder="Instagram Profile URL"
            disabled={!editSections.socialMedia}
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
            className={`border-2 rounded-md p-2 transition
      ${
        editSections.socialMedia
          ? "border-[#D9D9D9] bg-white text-black"
          : "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
          />
        </div>
        {editSections.socialMedia && (
  <div className="flex justify-end px-4 mb-4 lg:px-0">
    <button
      onClick={() => {
        updateProfileData(profile);
        setEditSections((prev) => ({ ...prev, socialMedia: false }));
      }}
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
          aspect={isCover ? 16/9 : 1} // cover photo ya profile photo
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
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
      const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
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

    </div>
  );
};

export default ProfileSec;
