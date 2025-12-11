import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { TfiList } from "react-icons/tfi";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";


const SettingsSec = () => {

     const [selectedRequest, setSelectedRequest] = useState(null);
 
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

  // Update on resize dynamically
  React.useEffect(() => {
    const handleResize = () => setVisibleOptions(getVisibleOptions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
     <div className="md:flex  lg:bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-4">
          <div className=" bg-gray-100 h-[85vh]  w-full  mx-auto  pt-4">
            {/* Header */}
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
    
            {/* ✅ Equal height fix added here */}
            <div className="flex gap-4 items-stretch">
              {/* Left Card */}
               <div className="flex flex-col justify-between w-full md:w-[60%] items-center lg:h-[88vh]">
            <div className="border px-6 py-3 flex flex-col gap-6 bg-white border-gray-300 shadow-md rounded-lg w-full h-full">
              {/* Left content starts here */}
              
              <div className="flex flex-col lg:gap-4 gap-3 text-sm text-gray-800 w-full">
                <h1 className="lg:hidden text-xl font-medium my-4">Settings</h1>
                {/* Name */}
                <div className="flex items-center justify-between pb-2 lg:mt-4">
                  <label className="font-semibold">Name</label>
                  <div className="flex items-center gap-3">
                    <span>Akshay Dogra</span>
                    <FiEdit2 className="text-gray-600 cursor-pointer" />
                  </div>
                </div>

                {/* Password */}
                <div className="flex items-center justify-between pb-2">
                  <label className="font-semibold">Password</label>
                  <div className="flex items-center gap-3">
                    <span>***************</span>
                    <FiEdit2 className="text-gray-600 cursor-pointer" />
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between pb-2">
                  <label className="font-semibold">Email</label>
                  <div className="flex items-center gap-3">
                    <span>abc@gmail.com</span>
                    <FiEdit2 className="text-gray-600 cursor-pointer" />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between pb-2">
                  <label className="font-semibold">Phone</label>
                  <div className="flex items-center gap-3">
                    <span>+91 87****84</span>
                    <FiEdit2 className="text-gray-600 cursor-pointer" />
                  </div>
                </div>

                {/* Save / Cancel Modal */}
                <div className="md:hidden flex justify-center mt-30">
                  <button className="px-6 w-full py-2 bg-[#001426] text-white rounded-md transition font-medium">
                    Save
                  </button>
                </div>
                <div className="hidden md:flex justify-center my-20 mb-40">
                  <div className="bg-white border-2 border-gray-400 rounded-lg shadow-md pt-10 pb-4 flex flex-col items-center text-center">
                    <p className="text-sm text-gray-800 mb-12 px-10">
                      Do you want to save or cancel?
                    </p>
                    <div className="flex gap-4 w-full px-4">
                      <button className="px-6 w-1/2 py-2 border-2 border-gray-500 rounded-md hover:bg-gray-50 transition font-medium">
                        Save
                      </button>
                      <button className="w-1/2 px-6 py-2 bg-[#001426] text-white rounded-md hover:bg-[#101e37] transition font-medium">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Left content ends here */}
            </div>
          </div>
    
              {/* ✅ Right Card (exact UI, untouched CSS) */}
              <div className="hidden lg:flex w-[40%] h-[88vh] ">
                <div className="bg-white border border-gray-300 shadow-md rounded-2xl overflow-hidden flex flex-col justify-between w-full h-full">
                  {/* Header image section */}
                  <div className="relative h-40 border-2 border-gray-300"></div>
    
                  {/* Profile photo overlap */}
                  <div className="relative px-4 -mt-12">
                    <div className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-md bg-white"></div>
    
                    <div className="mt-6 px-4">
                      <h2 className="text-gray-900 text-lg font-semibold">
                        Akshay Dogra
                      </h2>
                      <p className="text-sm text-gray-800 mt-2 leading-tight">
                        Grow Your Business by Partnering with <br />
                        <span>India’s Fastest-Growing Startup </span>
                      </p>
                      <p>Ecosystem</p>
                      <p className="text-sm text-gray-700 font-medium mt-3">
                        New Delhi, Delhi, India
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
                        <button className="p-1 rounded-md hover:bg-gray-100 transition">
                          <FiEdit2 className="text-gray-800" />
                        </button>
                      </div>
    
                      <p className="text-[13px] text-gray-600 mt-2 leading-6">
                        An experienced entrepreneur and business professional who
                        consistently delivers high-quality and result-focused
                        marketing campaign, customer experience and design valuable
                        content for go-to-market, launch, start-up, brand building,
                        event and community engagement. Dedicated results and omni
                        channel product marketing, brand and community development.
                        <span className="text-gray-800 font-medium">
                          {" "}
                          See more...
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ✅ End Right Card */}
            </div>
          </div>
        </div>
  )
}

export default SettingsSec
