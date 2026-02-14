import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiMiniLink } from "react-icons/hi2";
import { BsSendFill } from "react-icons/bs";
import { TfiList } from "react-icons/tfi";
import { FiEdit2 } from "react-icons/fi";

const RequestSec1 = () => {
  // State to track selected tab: "received" or "raised"
  const [selectedTab, setSelectedTab] = useState("received");

  // === Data for "Received" (left part) ===
  const receivedRightPart = [
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
    {
      data: "An experienced entrepreneur and business professional who consistently delivers high-quality and result-focused. An experienced entrepreneur and business professional who consistently.",
    },
  ];

  const receivedRightMobilePart = [
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
    {
      data: "An experienced entrepreneur and business professional.",
    },
  ];

  // === Data for "Raised" (left part) ===
  const raisedRequestOptions = [
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

  // To handle selected item in Raised tab
  const [selectedRequest, setSelectedRequest] = useState(null);

  // For responsive slice of raised requests
  const getVisibleOptions = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return raisedRequestOptions.slice(0, 7);
    }
    return raisedRequestOptions;
  };

  const [visibleOptions, setVisibleOptions] = useState(getVisibleOptions());

  React.useEffect(() => {
    const handleResize = () => setVisibleOptions(getVisibleOptions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Left part JSX for Received tab
  const LeftPartReceived = () => (
    <>
      <div className="lg:border lg:px-6 px-3 py-3 bg-white lg:border-gray-300 lg:shadow-md rounded-lg w-full z-10">
        <div className="flex border-2 shadow-md border-gray-300 items-center lg:px-4 px-2 justify-between rounded-2xl min-w-[150px]">
          <div className="flex items-center gap-2">
            <p
              onClick={() => setSelectedTab("raised")}
              className="cursor-pointer px-2  "
            >
              Raised
            </p>
             <div className="bg-[#00000033] h-8 w-0.5 "></div>
            <p
              onClick={() => setSelectedTab("received")}
              className="text-white bg-gray-900 p-2 rounded-lg m-2 cursor-pointer"
            >
              Received
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TfiList size={24} className="text-gray-500 bg-white" />
          </div>
        </div>
      </div>

      {/* Scrollable chat messages */}
      <div className="flex-1 overflow-y-auto w-full lg:px-6 px-3 py-4 space-y-4 scrollbar-hide lg:border lg:border-gray-300 lg:rounded-lg lg:mt-2 mb-35 lg:mb-44 shadow-md bg-white">
        {/* Desktop right part */}
        {receivedRightPart.map((item, index) => (
          <div
            key={index}
            className={`border-2 p-2 flex items-center gap-10  border-gray-300 rounded-lg w-[90%] ${
              index % 2 !== 0 ? "flex-row-reverse ml-auto" : "flex-row"
            } hidden lg:flex`}
          >
            <div className="shrink-0 w-18 h-18 rounded-full border-2 border-gray-300 shadow-md flex items-center justify-center"></div>
            <p className="flex-1 text-xs text-gray-700">{item.data}</p>
          </div>
        ))}

        {/* Mobile right part */}
        {receivedRightMobilePart.map((item, index) => (
          <div
            key={index}
            className={`border-2 p-2 flex items-center gap-5 border-gray-300 rounded-lg w-[90%] ${
              index % 2 !== 0 ? "flex-row-reverse ml-auto" : "flex-row"
            } flex lg:hidden`}
          >
            <div className="shrink-0 w-15 h-15 rounded-full border-2 border-gray-300 shadow-md flex items-center justify-center"></div>
            <p className="flex-1 text-sm text-gray-700">{item.data}</p>
          </div>
        ))}
      </div>
    </>
  );

  // Left part JSX for Raised tab
  const LeftPartRaised = () => (
    <>
      <div className="border px-2 py-5 bg-white flex flex-col gap-6 border-gray-300 shadow-md rounded-lg w-full">
        <div className="flex border-2 shadow-md border-gray-300 items-center px-4 justify-between rounded-2xl flex-1 min-w-[150px]">
          <div className="flex items-center gap-1">
            <p
              onClick={() => setSelectedTab("raised")}
              className="p-2 px-3 text-md  bg-gray-900 rounded-lg m-2 text-white cursor-pointer"
            >
              Raised
            </p>
            <div className="bg-[#00000033] h-8 w-0.5 "></div>
            <p
              onClick={() => setSelectedTab("received")}
              className="p-2 rounded-lg m-2 cursor-pointer"
            >
              Received
            </p>
          </div>
          <div className="flex items-center gap-2 ">
            <TfiList size={24} className="text-gray-500 bg-white" />
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 py-4 lg:mb-16 lg:h-[53vh] h-[65vh] overflow-y-auto scrollbar-hide">
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
    </>
  );

  // Right Card JSX — same for both tabs
  const RightCard = () => (
    <div className="bg-white border border-gray-300 shadow-md rounded-2xl overflow-hidden flex flex-col justify-between w-full h-full">
      {/* Header image section */}
      <div className="relative h-40 border-2 border-gray-300"></div>

      {/* Profile photo overlap */}
      <div className="relative px-4 -mt-12">
        <div className="w-28 h-28 rounded-full border-2 border-gray-300 shadow-md bg-white"></div>

        <div className="mt-6 px-4">
          <h2 className="text-gray-900 text-lg font-semibold">Akshay Dogra</h2>
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
      <div className="mt-10">
        <div className="bg-white border-t-2 border-gray-300 rounded-xl shadow-sm p-6 px-8">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-800">About</h3>
            <button className="p-1 rounded-md hover:bg-gray-100 transition">
              <FiEdit2 className="text-gray-800" />
            </button>
          </div>

          <p className="text-[13px] text-gray-600 mt-2 leading-6">
            An experienced entrepreneur and business professional who
            consistently delivers high-quality and result-focused marketing
            campaign, customer experience and design valuable content for
            go-to-market, launch, start-up, brand building, event and
            community engagement. Dedicated results and omni channel product
            marketing, brand and community development.
            <span className="text-gray-800 font-medium"> See more...</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:flex bg-gray-100 lg:pl-4 lg:pr-4 lg:pb-4">
      <div className="bg-gray-100 h-[99vh] lg:h-[85vh] w-full mx-auto pt-4">
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

        <div className="flex gap-4 items-stretch">
          {/* Left part */}
          <div className="flex flex-col justify-between w-full md:w-[60%] items-center h-screen overflow-hidden relative">
            {selectedTab === "received" ? <LeftPartReceived /> : <LeftPartRaised />}

            {/* Fixed input box */}
            <div className="lg:border lg:p-5  lg:border-gray-300 lg:shadow-md rounded-lg lg:w-[46%] w-[98%] mt-4 bg-white fixed lg:bottom-2 bottom-2  z-20">
              <div className="flex border-2 shadow-md border-gray-300 items-center px-4 py-2  justify-between rounded-xl flex-1 min-w-[150px]">
                <input
                  type="text"
                  placeholder="Enter the Text"
                  className="py-2 outline-none w-full"
                />
                <div className="flex items-center gap-2 flex-1">
                  <HiMiniLink size={24} className="text-gray-500 bg-white" />
                  <BsSendFill size={24} className="text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="hidden lg:flex w-[40%] h-[90vh]">
            <RightCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestSec1;
