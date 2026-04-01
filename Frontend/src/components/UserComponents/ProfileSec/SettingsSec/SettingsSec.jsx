import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { TfiList } from "react-icons/tfi";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";
import axios from "axios";
import { serverUrl } from "@/App";

const SettingsSec = () => {
  const token = localStorage.getItem("token");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    about: "",
    address: "",
    profilePhoto: "",
    coverImage: "",
  });

  const [editingField, setEditingField] = useState(null);

  const requestOptions = [
    { id: 1, label: "Connect with Admin" },
    { id: 2, label: "Require Advisory Service" },
    { id: 3, label: "Require Legal Service" },
    { id: 4, label: "Require CXO Service" },
    { id: 5, label: "Require Compliance Service" },
    { id: 6, label: "Require HR Service" },
    { id: 7, label: "Require Development Service" },
    { id: 8, label: "Require Finance Service" },
    { id: 9, label: "Require Design Service" },
    { id: 10, label: "Require Funding Solutions" },
    { id: 11, label: "Require Marketing Service" },
    { id: 12, label: "Connect with Investors" },
    { id: 13, label: "Require Consultation Service" },
    { id: 14, label: "Connect with Incubators" },
  ];

  // Slice logic: show 7 cards only on small screens
  const getVisibleOptions = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return requestOptions.slice(0, 7);
    }
    return requestOptions;
  };

  const [visibleOptions, setVisibleOptions] = useState(getVisibleOptions());
  const [isLoading, setIsLoading] = useState(true);

  // Update on resize dynamically
  React.useEffect(() => {
    const handleResize = () => setVisibleOptions(getVisibleOptions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${serverUrl}/profile/settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(res.data);
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (field) => {
    try {
      await axios.put(
        `${serverUrl}/profile/settings`,
        { [field]: formData[field] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingField(null);
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${serverUrl}${path.startsWith("/") ? path : `/${path}`}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#001032]"></div>
      </div>
    );
  }

  return (
    <div className="md:flex  lg:bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-4">
      <div className=" bg-gray-100 h-[85vh]  w-full  mx-auto  pt-2">
        {/* Header */}
        <div className="hidden md:flex bg-white border border-gray-400 shadow-md rounded-lg px-10 mb-3 justify-between items-center">
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

        {/* ✅ Equal height fix added here */}
        <div className="flex gap-4 items-stretch">
          {/* Left Card */}
          <div className="flex flex-col justify-between w-full md:w-[60%] items-center h-screen lg:h-[90vh]">
            <div className="border px-6 py-3 flex flex-col gap-6 bg-white border-gray-300 shadow-md rounded-lg w-full h-full">
              {/* Left content starts here */}

              <div className="flex flex-col lg:gap-4 gap-3 text-sm text-gray-800 w-full">
                <h1 className="lg:hidden text-xl font-medium my-4">Settings</h1>

                {/* ================= NAME ================= */}
                <div className="flex items-center justify-between pb-2 lg:mt-4">
                  <label className="font-semibold">Name</label>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">{formData.name || "—"}</span>
                  </div>
                </div>

                {/* ================= PASSWORD ================= */}
                <div className="flex items-center justify-between pb-2">
                  <label className="font-semibold">Password</label>

                  <div className="flex items-center gap-3">
                    {editingField === "password" ? (
                    <>
                      <input
                        type="password"
                        placeholder="New password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                          setHasChanged(true);
                        }}
                        className="border rounded px-2 py-1 text-sm w-32 md:w-auto"
                      />
                       <button
                          className="bg-white text-sm border border-[#001032] px-3 py-1 rounded-sm"
                          onClick={() => handleSave("password")}
                        >
                          Save
                        </button>
                    </>
                    ) : (
                      <span>************</span>
                    )}

                    <FiEdit2
                      className="cursor-pointer"
                      onClick={() => setEditingField("password")}
                    />
                  </div>
                </div>

                {/* ================= EMAIL ================= */}
                <div className="flex items-center justify-between pb-2">
                  <label className="font-semibold">Email</label>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">{formData.email || "—"}</span>
                   
                  </div>
                </div>

                {/* ================= PHONE ================= */}
                <div className="flex items-center justify-between pb-2">
                  <label className="font-semibold">Phone</label>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">
                      {formData.phone
                        ? `+91 ${formData.phone.slice(0, 2)}****${formData.phone.slice(-2)}`
                        : "—"}
                    </span>
                  </div>
                </div>

                {/* ================= SAVE / CANCEL ================= */}
              
              </div>

              {/* Left content ends here */}
            </div>
          </div>

          {/* ✅ Right Card (exact UI, untouched CSS) */}
          <div className="hidden lg:flex w-[40%] h-[90vh] ">
            <div className="bg-white border border-gray-300 shadow-md rounded-2xl overflow-hidden flex flex-col justify-between w-full h-full">
              {/* Header image section */}
              <div
                className="relative h-40 border-2 border-gray-300 bg-gray-100"
                style={{
                  backgroundImage: formData.coverImage
                    ? `url(${getImageUrl(formData.coverImage)})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Profile photo overlap */}
              <div className="relative px-4 -mt-12">
                <div className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-md bg-white overflow-hidden">
                  <img
                    src={
                      formData.profilePhoto
                        ? getImageUrl(formData.profilePhoto)
                        : "/default-avatar.png"
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-6 px-4">
                  <h2 className="text-gray-900 text-lg font-semibold">
                    {formData.name || "—"}
                  </h2>
                  <p className="text-sm text-gray-800  leading-tight">
                    {formData.bio || "Location not added"}
                  </p>
                  <p className="text-sm text-gray-700 font-medium mt-1">
                    {formData.address || "Location not added"}
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div className=" mt-10 ">
                <div className="bg-white border-t-2 border-gray-300 rounded-xl shadow-sm p-6 px-8">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      About
                    </h3>
                    <button className="p-1 rounded-md hover:bg-gray-100 transition"></button>
                  </div>

                  <p className="text-[13px] text-gray-600 mt-2 leading-6">
                    {formData.about || "No description added yet"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ✅ End Right Card */}
        </div>
      </div>
    </div>
  );
};

export default SettingsSec;
