import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { TfiList } from "react-icons/tfi";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";

const RequestRaisedSec = () => {
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
    <div className="md:flex bg-black lg:bg-gray-100 pl-4 pr-4 pb-4">
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
        <div className="flex gap-4 items-stretch ">
          {/* Left Card */}
          <div className="flex flex-col justify-between w-full md:w-[60%] items-center  ">
            <div className="border px-6 py-3 bg-white flex flex-col gap-6 border-gray-300 shadow-md rounded-lg w-full">
              <div className="flex border-2 shadow-md border-gray-300 items-center px-4 justify-between rounded-2xl flex-1 min-w-[150px]">
                <div className="flex items-center gap-2">
                  <p className="px-2 border-r-2 border-gray-500">Raised</p>
                  <p className="text-white bg-gray-900 p-2 rounded-lg m-2">
                    Received
                  </p>
                </div>
                <div className="flex items-center gap-2 ">
                  <TfiList size={24} className="text-gray-500 bg-white" />
                </div>
              </div>

              {/* Grid Section */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 py-4 lg:mb-16 lg:h-[53vh] h-[55vh] overflow-y-auto scrollbar-hide">
                {visibleOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setSelectedRequest(option.id)}
                  >
                    <div className="shrink-0 p-3 border-2 border-gray-200 rounded-full transition-colors">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-900">
                        {selectedRequest === option.id && (
                          <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 leading-tight border-2 border-gray-300 rounded-xl px-4 py-3 flex-1 hover:border-gray-400 transition-colors text-center">
                      {option.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border p-6 border-gray-300 shadow-md rounded-lg w-full mt-4 bg-white">
              <div className="flex border-2 shadow-md border-gray-300 items-center px-4 justify-between rounded-2xl flex-1 min-w-[150px]">
                <input
                  type="text"
                  placeholder="Description"
                  className="py-4 outline-none w-full"
                />
                <div className="flex items-center gap-2 flex-1 justify-end">
                  <HiMiniLink size={24} className="text-gray-500 bg-white" />
                  <BsSendFill size={24} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Right Card (exact UI, untouched CSS) */}
          <div className="hidden lg:flex w-[40%] h-[90vh] ">
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
  );
};

export default RequestRaisedSec;
